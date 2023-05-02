import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherhistoryPageRoutingModule } from './voucherhistory-routing.module';

import { VoucherhistoryPage } from './voucherhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherhistoryPageRoutingModule
  ],
  declarations: [VoucherhistoryPage]
})
export class VoucherhistoryPageModule {}
