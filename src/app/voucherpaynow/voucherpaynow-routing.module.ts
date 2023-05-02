import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherpaynowPage } from './voucherpaynow.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherpaynowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherpaynowPageRoutingModule {}
