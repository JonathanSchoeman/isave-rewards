import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycontactinfoPage } from './mycontactinfo.page';

const routes: Routes = [
  {
    path: '',
    component: MycontactinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycontactinfoPageRoutingModule {}
