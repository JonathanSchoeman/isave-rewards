import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycontactinfoPageRoutingModule } from './mycontactinfo-routing.module';

import { MycontactinfoPage } from './mycontactinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycontactinfoPageRoutingModule
  ],
  declarations: [MycontactinfoPage]
})
export class MycontactinfoPageModule {}
