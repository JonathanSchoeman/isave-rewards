import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherhistoryPage } from './voucherhistory.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherhistoryPageRoutingModule {}
