import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastfoodhistoryPageRoutingModule } from './fastfoodhistory-routing.module';

import { FastfoodhistoryPage } from './fastfoodhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastfoodhistoryPageRoutingModule
  ],
  declarations: [FastfoodhistoryPage]
})
export class FastfoodhistoryPageModule {}
