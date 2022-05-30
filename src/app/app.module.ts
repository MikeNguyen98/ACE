import { NgModule } from '@angular/core';
import { BrowserModule,Title } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ModalModule } from "ngx-bootstrap/modal";

const config: SocketIoConfig = {
  url: environment.socketUrl, // socket server url;
  options: {
    transports: ["websocket"],
  },
};
@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    InvoiceDetailsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Title, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
