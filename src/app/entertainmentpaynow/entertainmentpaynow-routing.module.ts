import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainmentpaynowPage } from './entertainmentpaynow.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentpaynowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmentpaynowPageRoutingModule {}
