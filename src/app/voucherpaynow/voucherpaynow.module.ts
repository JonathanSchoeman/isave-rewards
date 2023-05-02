import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherpaynowPageRoutingModule } from './voucherpaynow-routing.module';

import { VoucherpaynowPage } from './voucherpaynow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherpaynowPageRoutingModule
  ],
  declarations: [VoucherpaynowPage]
})
export class VoucherpaynowPageModule {}
