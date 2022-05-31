import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Invoice } from "../interface/invoice";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  invoices$: Invoice[];
  constructor(
    private router: Router,
    private socketService: SocketService // private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.socketService.getData();
    this.socketService
      .onFetchData()
      .subscribe((data: any) => (this.invoices$ = data));
  }
  btnClick() {
    this.socketService.addInvoice();
    this.socketService
      .getNewInvocie()
      .subscribe((data: any) =>
        this.router.navigateByUrl(`/invoice/${data.id}`)
      );
  }
  btnEdit(invoice:Invoice) {
    this.router.navigateByUrl(`/invoice/${invoice.id}`)
  }
  handleDelete(invoice: Invoice): void {
    if (invoice.id) {
      this.socketService.deleteInvoice(invoice.id);
    }
  }
}
