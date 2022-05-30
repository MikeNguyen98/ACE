import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
import { DatePipe, Location } from "@angular/common";
import { FormBuilder, Validators } from "@angular/forms";
import form from "../common/form";
import { Invoice } from "../interface/invoice";
@Component({
  selector: "app-invoice-details",
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.scss"],
})
export class InvoiceDetailsComponent implements OnInit {
  @ViewChild("pdfTable") pdfTable!: ElementRef;
  itemForm = this.fb.group({
    name: ["", Validators.required],
    rate: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
    quantity: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
    invoiceId: null,
  });
  Invoice: Invoice;
  constructor(
    private socketService: SocketService,
    private location: Location,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {}

  back(): void {
    this.location.back();
  }
  updateProfile() {
    this.itemForm.patchValue({});
  }

  ngOnInit(): void {
    const id = window.location.pathname.split("/")[2];
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
      invoiceId: parseInt(window.location.pathname.split("/")[2]),
    });
    console.log(this.itemForm.value)
    this.socketService.addItem(this.itemForm.value);
    this.itemForm.reset();
  }
}