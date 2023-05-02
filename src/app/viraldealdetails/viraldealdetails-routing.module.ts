import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViraldealdetailsPage } from './viraldealdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ViraldealdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViraldealdetailsPageRoutingModule {}
