import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponhistorydetailsPageRoutingModule } from './couponhistorydetails-routing.module';

import { CouponhistorydetailsPage } from './couponhistorydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponhistorydetailsPageRoutingModule
  ],
  declarations: [CouponhistorydetailsPage]
})
export class CouponhistorydetailsPageModule {}
