import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoupondetailsPage } from './coupondetails.page';

const routes: Routes = [
  {
    path: '',
    component: CoupondetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoupondetailsPageRoutingModule {}
