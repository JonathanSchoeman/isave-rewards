import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FastfoodhistoryPage } from './fastfoodhistory.page';

const routes: Routes = [
  {
    path: '',
    component: FastfoodhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastfoodhistoryPageRoutingModule {}
