import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydealsPage } from './mydeals.page';

const routes: Routes = [
  {
    path: '',
    component: MydealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydealsPageRoutingModule {}
