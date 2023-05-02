import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoupondetailsPageRoutingModule } from './coupondetails-routing.module';

import { CoupondetailsPage } from './coupondetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoupondetailsPageRoutingModule
  ],
  declarations: [CoupondetailsPage]
})
export class CoupondetailsPageModule {}
