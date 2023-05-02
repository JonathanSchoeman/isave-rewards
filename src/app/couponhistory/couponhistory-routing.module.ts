import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponhistoryPage } from './couponhistory.page';

const routes: Routes = [
  {
    path: '',
    component: CouponhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponhistoryPageRoutingModule {}
