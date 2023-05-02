import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherhistorydetailsPage } from './voucherhistorydetails.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherhistorydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherhistorydetailsPageRoutingModule {}
