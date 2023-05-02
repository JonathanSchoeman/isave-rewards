import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastfoodstoresPageRoutingModule } from './fastfoodstores-routing.module';

import { FastfoodstoresPage } from './fastfoodstores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastfoodstoresPageRoutingModule
  ],
  declarations: [FastfoodstoresPage]
})
export class FastfoodstoresPageModule {}
