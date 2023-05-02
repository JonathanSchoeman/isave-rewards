import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherpaymentfailedPageRoutingModule } from './voucherpaymentfailed-routing.module';

import { VoucherpaymentfailedPage } from './voucherpaymentfailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherpaymentfailedPageRoutingModule
  ],
  declarations: [VoucherpaymentfailedPage]
})
export class VoucherpaymentfailedPageModule {}
