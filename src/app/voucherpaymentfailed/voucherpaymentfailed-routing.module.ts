import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherpaymentfailedPage } from './voucherpaymentfailed.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherpaymentfailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherpaymentfailedPageRoutingModule {}
