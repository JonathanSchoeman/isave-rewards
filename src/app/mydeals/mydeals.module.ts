import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydealsPageRoutingModule } from './mydeals-routing.module';

import { MydealsPage } from './mydeals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MydealsPageRoutingModule
  ],
  declarations: [MydealsPage]
})
export class MydealsPageModule {}
