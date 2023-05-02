import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponhistorywicodedetailsPage } from './couponhistorywicodedetails.page';

const routes: Routes = [
  {
    path: '',
    component: CouponhistorywicodedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponhistorywicodedetailsPageRoutingModule {}
