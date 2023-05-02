import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponpaynowPage } from './couponpaynow.page';

const routes: Routes = [
  {
    path: '',
    component: CouponpaynowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponpaynowPageRoutingModule {}
