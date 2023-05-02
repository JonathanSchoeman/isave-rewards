import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainmenthistorydetailsPage } from './entertainmenthistorydetails.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainmenthistorydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmenthistorydetailsPageRoutingModule {}
