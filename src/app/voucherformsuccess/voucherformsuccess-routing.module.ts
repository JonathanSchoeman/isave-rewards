import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherformsuccessPage } from './voucherformsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherformsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherformsuccessPageRoutingModule {}
