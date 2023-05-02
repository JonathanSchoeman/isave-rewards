import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainmentpaysuccessPage } from './entertainmentpaysuccess.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentpaysuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmentpaysuccessPageRoutingModule {}
