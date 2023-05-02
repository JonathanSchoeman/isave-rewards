import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialhistoryPageRoutingModule } from './specialhistory-routing.module';

import { SpecialhistoryPage } from './specialhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialhistoryPageRoutingModule
  ],
  declarations: [SpecialhistoryPage]
})
export class SpecialhistoryPageModule {}
