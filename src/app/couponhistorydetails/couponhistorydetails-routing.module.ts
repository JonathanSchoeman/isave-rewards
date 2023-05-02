import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponhistorydetailsPage } from './couponhistorydetails.page';

const routes: Routes = [
  {
    path: '',
    component: CouponhistorydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponhistorydetailsPageRoutingModule {}
