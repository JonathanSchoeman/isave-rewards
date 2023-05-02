import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { UserService } from '../app/services/user.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';


import { ExitappconfirmComponent } from './exitappconfirm/exitappconfirm.component';
import { ConfirmotpComponent } from './confirmotp/confirmotp.component';
import { ContactusComponent } from './contactus/contactus.component';
import { VoucherpayconfirmComponent } from './voucherpayconfirm/voucherpayconfirm.component';
import { CouponpayconfirmComponent } from './couponpayconfirm/couponpayconfirm.component';
import { CouponissueddetailsComponent } from './couponissueddetails/couponissueddetails.component';
import { CouponcodesComponent } from './couponcodes/couponcodes.component';
import { CouponcodedetailsComponent } from './couponcodedetails/couponcodedetails.component';
import { WicodeconfirmComponent } from './wicodeconfirm/wicodeconfirm.component';
import { CouponpayconfirmwicodeComponent } from './couponpayconfirmwicode/couponpayconfirmwicode.component';
import { CouponwicodeComponent } from './couponwicode/couponwicode.component';
import { EntertainmentpayconfirmComponent } from './entertainmentpayconfirm/entertainmentpayconfirm.component';
import { FastfoodclaimsubmittedComponent } from './fastfoodclaimsubmitted/fastfoodclaimsubmitted.component';
import { FastfoodconfirmclaimComponent } from './fastfoodconfirmclaim/fastfoodconfirmclaim.component';
import { FastfoodtncComponent } from './fastfoodtnc/fastfoodtnc.component';
import { FastfoodstoreconfirmComponent } from './fastfoodstoreconfirm/fastfoodstoreconfirm.component';
import { ViraldealconfirmComponent } from './viraldealconfirm/viraldealconfirm.component';
import { VouchernoamountsComponent } from './vouchernoamounts/vouchernoamounts.component';
import { NourlComponent } from './nourl/nourl.component';
import { SendsmsComponent } from './sendsms/sendsms.component';
import { ProfiledeleteconfirmComponent } from './profiledeleteconfirm/profiledeleteconfirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ExitappconfirmComponent,
    ConfirmotpComponent,
    ContactusComponent,
    VoucherpayconfirmComponent,
    CouponpayconfirmComponent,
    CouponissueddetailsComponent,
    CouponcodesComponent,
    CouponcodedetailsComponent,
    WicodeconfirmComponent,
    CouponpayconfirmwicodeComponent,
    CouponwicodeComponent,
    EntertainmentpayconfirmComponent,
    FastfoodclaimsubmittedComponent,
    FastfoodconfirmclaimComponent,
    FastfoodtncComponent,
    FastfoodstoreconfirmComponent,
    ViraldealconfirmComponent,
    VouchernoamountsComponent,
    NourlComponent,
    SendsmsComponent,
    ProfiledeleteconfirmComponent
  ],
  entryComponents: [
    ExitappconfirmComponent,
    ConfirmotpComponent,
    ContactusComponent,
    VoucherpayconfirmComponent,
    CouponpayconfirmComponent,
    CouponissueddetailsComponent,
    CouponcodesComponent,
    CouponcodedetailsComponent,
    WicodeconfirmComponent,
    CouponpayconfirmwicodeComponent,
    CouponwicodeComponent,
    EntertainmentpayconfirmComponent,
    FastfoodclaimsubmittedComponent,
    FastfoodconfirmclaimComponent,
    FastfoodtncComponent,
    FastfoodstoreconfirmComponent,
    ViraldealconfirmComponent,
    VouchernoamountsComponent,
    NourlComponent,
    SendsmsComponent,
    ProfiledeleteconfirmComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    UserService,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    AppVersion,
    CallNumber,
    OneSignal,
    InAppBrowser,
    Device,
    SMS,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule
{

}
