import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherdetailsPageRoutingModule } from './voucherdetails-routing.module';

import { VoucherdetailsPage } from './voucherdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherdetailsPageRoutingModule
  ],
  declarations: [VoucherdetailsPage]
})
export class VoucherdetailsPageModule {}
