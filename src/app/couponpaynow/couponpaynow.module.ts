import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponpaynowPageRoutingModule } from './couponpaynow-routing.module';

import { CouponpaynowPage } from './couponpaynow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponpaynowPageRoutingModule
  ],
  declarations: [CouponpaynowPage]
})
export class CouponpaynowPageModule {}
