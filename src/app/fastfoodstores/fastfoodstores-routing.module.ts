import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FastfoodstoresPage } from './fastfoodstores.page';

const routes: Routes = [
  {
    path: '',
    component: FastfoodstoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastfoodstoresPageRoutingModule {}
