import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  { path: '', redirectTo: '/invoice', pathMatch: 'full' },
  { path: 'invoice', component: InvoiceComponent, data: { title: 'Home' } },
  {
    path: 'invoice/:id',
    component: InvoiceDetailsComponent,
    data: { title: 'Edit Invoice' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
