import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherhistorydetailsPageRoutingModule } from './voucherhistorydetails-routing.module';

import { VoucherhistorydetailsPage } from './voucherhistorydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherhistorydetailsPageRoutingModule
  ],
  declarations: [VoucherhistorydetailsPage]
})
export class VoucherhistorydetailsPageModule {}
