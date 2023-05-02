import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherformsuccessPageRoutingModule } from './voucherformsuccess-routing.module';

import { VoucherformsuccessPage } from './voucherformsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherformsuccessPageRoutingModule
  ],
  declarations: [VoucherformsuccessPage]
})
export class VoucherformsuccessPageModule {}
