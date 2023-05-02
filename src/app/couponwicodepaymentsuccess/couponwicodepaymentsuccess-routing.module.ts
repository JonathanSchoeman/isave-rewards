import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponwicodepaymentsuccessPage } from './couponwicodepaymentsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: CouponwicodepaymentsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponwicodepaymentsuccessPageRoutingModule {}
