import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainmentdetailsPage } from './entertainmentdetails.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmentdetailsPageRoutingModule {}
