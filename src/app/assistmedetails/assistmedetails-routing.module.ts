import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistmedetailsPage } from './assistmedetails.page';

const routes: Routes = [
  {
    path: '',
    component: AssistmedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistmedetailsPageRoutingModule {}
