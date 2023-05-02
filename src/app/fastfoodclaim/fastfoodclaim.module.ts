import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastfoodclaimPageRoutingModule } from './fastfoodclaim-routing.module';

import { FastfoodclaimPage } from './fastfoodclaim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastfoodclaimPageRoutingModule
  ],
  declarations: [FastfoodclaimPage]
})
export class FastfoodclaimPageModule {}
