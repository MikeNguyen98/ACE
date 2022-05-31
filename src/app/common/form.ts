import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import { item } from '../interface/item';
import autoTable from 'jspdf-autotable';
const addFooters = (doc: any) => {
  const pageCount = doc.internal.getNumberOfPages();

  doc.setFontSize(10);
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      'ACE Contractors Group Pty. Ltd',
      doc.internal.pageSize.width / 8,
      287,
      {
        align: 'left',
      }
    );
    doc.text('ABN 12 345 678 901', (doc.internal.pageSize.width / 4) * 3, 287, {
      align: 'left',
    });
  }
};
function form(data: item[]) {
  var datePipe = new DatePipe('en-US');
  const date = datePipe.transform(new Date(), 'dd/MM/yyyy h:mm:ss a');
  const doc = new jsPDF();
  var img = new Image();
  img.src = 'assets/test.jpg';
  doc.addImage(img, 'jpg', 170, 8, 30, 30),
    autoTable(doc, {
      body: [
        [
          {
            content: 'Report',
            styles: {
              fontSize: 22,
              valign: 'bottom',
            },
          },
          {
            content: `${date}`,
            styles: {
              fontSize: 14,
              halign: 'center',
              valign: 'bottom',
            },
          },
        ],
      ],
      theme: 'plain',
    });
  doc.line(10, 26, 170, 26);

  autoTable(doc, {
    startY: 45,
    head: [['Item', 'Item rate', 'Quantity', 'Amount']],
    body: [
      ...data.map((e) => [
        e.name,
        `$${e.rate.toFixed(2)}`,
        e.quantity,
        `$${(e.quantity * e.rate).toFixed(2)}`,
      ]),
    ],
    foot: [
      [
        { content: 'Total Amount', colSpan: 3, styles: { halign: 'right' } },
        `$${data
          .reduce((prev, cur) => prev + cur.quantity * cur.rate, 0)
          .toFixed(2)}`,
      ],
    ],
    headStyles: { fillColor: '#fff', textColor: '#000' },
    footStyles: { fillColor: '#fff', textColor: '#000' },
    theme: 'grid',
  });
  autoTable(doc, {
    foot: [
      [
        {
          content: 'ACE Person',
          styles: {
            fontSize: 16,
            fontStyle: 'normal',
          },
        },
      ],
      [
        {
          content: 'Project Manager',
          styles: {
            fontSize: 16,
            fontStyle: 'bold',
          },
        },
      ],
    ],
    rowPageBreak: 'auto',
    theme: 'plain',
    showFoot: "lastPage",
  });
  addFooters(doc);
  doc.output('dataurlnewwindow');
}

export default form;
