import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherdetailsPage } from './voucherdetails.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherdetailsPageRoutingModule {}
