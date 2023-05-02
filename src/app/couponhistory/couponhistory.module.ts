import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponhistoryPageRoutingModule } from './couponhistory-routing.module';

import { CouponhistoryPage } from './couponhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponhistoryPageRoutingModule
  ],
  declarations: [CouponhistoryPage]
})
export class CouponhistoryPageModule {}
