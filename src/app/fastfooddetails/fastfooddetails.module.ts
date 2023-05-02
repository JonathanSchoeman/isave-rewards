import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastfooddetailsPageRoutingModule } from './fastfooddetails-routing.module';

import { FastfooddetailsPage } from './fastfooddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastfooddetailsPageRoutingModule
  ],
  declarations: [FastfooddetailsPage]
})
export class FastfooddetailsPageModule {}
