import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainmenthistoryPage } from './entertainmenthistory.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainmenthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmenthistoryPageRoutingModule {}
