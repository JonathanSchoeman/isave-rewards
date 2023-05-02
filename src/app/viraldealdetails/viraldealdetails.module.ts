import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViraldealdetailsPageRoutingModule } from './viraldealdetails-routing.module';

import { ViraldealdetailsPage } from './viraldealdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViraldealdetailsPageRoutingModule
  ],
  declarations: [ViraldealdetailsPage]
})
export class ViraldealdetailsPageModule {}
