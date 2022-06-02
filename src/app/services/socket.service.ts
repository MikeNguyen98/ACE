import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { map, Observable } from "rxjs";
import { Invoice } from "../interface/invoice";
import { item } from "../interface/item";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}
  // emit event
  getData() {
    this.socket.emit("findAll");
  }

  findOne(id: number) {
    this.socket.emit("findOne", id);
  }

  addInvoice() {
    this.socket.emit("create", { status: 1 });
  }

  addItem(data: item) {
    this.socket.emit("addItem", data);
  }

  updateInvoice(invoice: Invoice) {
    this.socket.emit("complete", invoice);
  }

  deleteInvoice(id: number) {
    this.socket.emit("deleteInvoice", id);
  }

  // listen event
  onFetchData(): Observable<Invoice[]> {
    return this.socket.fromEvent<Invoice[]>("findAll").pipe(
      map((data: Invoice[]) => {
        return data;
      })
    );
  }
  getNewInvocie(): Observable<Invoice> {
    return this.socket.fromEvent<Invoice>("findOne").pipe(
      map((data: Invoice) => {
        return data;
      })
    );;
  }


}
