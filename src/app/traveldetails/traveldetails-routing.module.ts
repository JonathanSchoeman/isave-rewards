import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraveldetailsPage } from './traveldetails.page';

const routes: Routes = [
  {
    path: '',
    component: TraveldetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraveldetailsPageRoutingModule {}
