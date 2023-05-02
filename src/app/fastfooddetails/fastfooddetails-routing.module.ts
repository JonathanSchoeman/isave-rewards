import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FastfooddetailsPage } from './fastfooddetails.page';

const routes: Routes = [
  {
    path: '',
    component: FastfooddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastfooddetailsPageRoutingModule {}
