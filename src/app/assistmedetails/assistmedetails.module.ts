import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistmedetailsPageRoutingModule } from './assistmedetails-routing.module';

import { AssistmedetailsPage } from './assistmedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistmedetailsPageRoutingModule
  ],
  declarations: [AssistmedetailsPage]
})
export class AssistmedetailsPageModule {}
