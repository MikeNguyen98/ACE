import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { DatePipe, Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import form from '../common/form';
import { Invoice } from '../interface/invoice';
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  itemForm = this.fb.group({
    name: [null, [Validators.required]],
    rate: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[0-9]+\.{0,1}[0-9]*$/),
      ],
    ],
    quantity: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ],
    ],
    InvoiceId: null,
  });
  Invoice: Invoice;
  constructor(
    private socketService: SocketService,
    private location: Location,
    private fb: FormBuilder,
    public datepipe: DatePipe,
  ) {}

  back(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const id = window.location.pathname.split('/')[2];
    this.socketService.findOne(parseInt(id));
    this.socketService
      .getNewInvocie()
      .subscribe((data: any) => (this.Invoice = data));
  }

  public async downloadAsPDF() {
    form(this.Invoice.Items);
  }

  onSubmit() {
    this.itemForm.patchValue({
      InvoiceId: parseInt(window.location.pathname.split('/')[2]),
    });

    console.log(this.itemForm.status);

    if (this.itemForm.status == 'INVALID') {
      console.log(this.itemForm.value);
    } else {
      this.socketService.addItem(this.itemForm.value);
      this.itemForm.reset();
    }
  }
}
