import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherpaymentsuccessPage } from './voucherpaymentsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherpaymentsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherpaymentsuccessPageRoutingModule {}
