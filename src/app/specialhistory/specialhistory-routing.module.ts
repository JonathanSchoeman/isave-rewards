import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialhistoryPage } from './specialhistory.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialhistoryPageRoutingModule {}
