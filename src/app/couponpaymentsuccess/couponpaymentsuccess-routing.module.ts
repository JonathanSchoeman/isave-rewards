import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponpaymentsuccessPage } from './couponpaymentsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: CouponpaymentsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponpaymentsuccessPageRoutingModule {}
