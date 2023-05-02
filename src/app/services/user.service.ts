import { Storage } from '@ionic/storage';
import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, NavController, Platform, PopoverController, ToastController } from '@ionic/angular';

import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { ContactusComponent } from '../contactus/contactus.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { SendsmsComponent } from '../sendsms/sendsms.component';

@Injectable({ providedIn: 'root' })
export class UserService
{
  ContentPage: any;

  DeviceUser: any;
  CurrentUser: any;
  
  UpdatedUser: any;
  
  Rules: any;
  Banks: any;
  Provinces: any;
  ClientTiers: any;
  BankAccountTypes: any;

  
  Claim: any;
  Claims: any;
  CheckIns: any;
  Restaurant: any;
  Calculation: any;
  Restaurants: any;
  Notification: any;
  Notifications: any;
  CheckInResult: any;
  InvoiceResult: any;

  CampaignId: any;

  Coupon: any;
  CouponDeal: any;
  Coupons: any = [];
  CouponDeals: any = [];
  CouponIndex: number = 0;
  CouponTemp: any = [];
  OtherCoupons: any = [];
  LoadingOtherCoupons: boolean = false;

  Travel: any;
  TravelDeal: any;
  Travels : any = [];
  TravelDeals: any = [];
  
  Voucher: any;
  VoucherDeal: any;
  Vouchers : any = [];
  InAppBrowserUrl: string = "";

  AllVoucherDeals: any = [];
  VoucherDeals: any = [];
  SoccerDeals: any = [];
  SpaDeals: any = [];
  EducationDeals: any = [];
  EntertainmentDeals: any = [];
  FastFoodDeals: any = [];
  OnlineShoppingDeals: any = [];
  CosmeticsDeals: any = [];
  AssistanceDeals: any = [];
  CarHireDeals: any = [];

  DealAmount: number = 0;
  DealPaymentMethod: number = 0;
  DealDiscountedAmount: number = 0;

  DealResult: any;
  PaymentResult: any;

  CouponShoppingCart: any = [];

  APIAuthentication: any = null;
  APIAuthenticationHeader: any = null;

  ClientId: number = 20;
  APIKey: any = "z0ZlR8VE0DqvbOlHN7Yxs";
  //APIUrl: any = "http://dr.loc/";
  //APIUrl: any = "https://www.testdirectrewards.co.za/";
  APIUrl: any = "https://www.directrewarding.co.za/";

  Time: any = [];

  InvoiceStatus: any;

  AppName: any;
  AppVersion: any;
  AppVersionCode: any;

  IsIOS: boolean = false;
  IsHuawei: boolean = false;
  IsAndroid: boolean = false;
  DeviceUUId: string = "";
  PlatformName: string = "";

  ShowScroll: boolean = false;
  AllDealsLoaded: boolean = false;
  StickyCategory: boolean = false;

  GoToMap: boolean = false;
  GoToClaim: boolean = false;
  ClaimSubmitted: boolean = false;
  ActivateDiscount: boolean = false;
  BankDetailsUpdated: boolean = false;
  UpdatingBankDetails: boolean = false;
  BankDetailsConfirmed: boolean = false;
  RemoveCheckInConfirmed: boolean = false;
  ActivateDiscountConfirmed: boolean = false;
  ClaimInformationConfirmed: boolean = false;

  // Force Refresh
  RefreshChats: boolean = false;
  RefreshClaims: boolean = false;
  RefreshCoupons: boolean = false;
  RefreshVouchers: boolean = false;
  RefreshHistory: boolean = false;
  RefreshRestaurants: boolean = false;
  RefreshNotifications: boolean = false;

  // Pin
  ResetPin: boolean = false;
  ForgotPin: boolean = false;
  PinCreated: boolean = false;
  PinCreationSkipped: boolean = false;

  // Paging
  Skip: number = 0;
  Take: number = 10;


  // 
  ExitApp: boolean = false;
  Proceed: boolean = false;
  Updating: boolean = false;
  GoToForm: boolean = false;
  ShowLogin: boolean = false;
  Registering: boolean = false;
  ResetingPin: boolean = false;
  PleaseSendOTP: boolean = false;
  DeletingAccount: boolean = false;

  TicketId: any;

  SelfieUrl: string = "../../assets/imgs/user-profile.png";
  MarketingBannerUrl: string = "../../assets/imgs/marketing-sample.jpg";

  MonthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  private storage: Storage | null = null;

  constructor( public http: HttpClient, public _storage: Storage, public loadingCtrl: LoadingController, public transfer: FileTransfer, public appVersion: AppVersion, public alertCtrl: AlertController, public navCtrl: NavController, public popCtrl: PopoverController, public callNumber: CallNumber, public toastCtrl: ToastController, public oneSignal: OneSignal, public iab: InAppBrowser, public device: Device, public platform: Platform, public sms: SMS ) 
  { 
    this.InvoiceStatus = [
      { "key": "Declined", "value": "0" },
      { "key": "Paid", "value": "1" },
      { "key": "Submitted", "value": "2" }];

      this.Banks = [
        { "key": "ABSA", "value": "1", "code": "632005" },
        { "key": "First National Bank", "value": "2", "code": "250655" },
        { "key": "Capitec Bank", "value": "3", "code": "470010" }];

    this.BankAccountTypes = [
      { "key": "Savings", "value": "1" },
      { "key": "Current/Cheque", "value": "2" },
      { "key": "Transmission", "value": "3" }];

      this.Provinces = [
        { "key": "Eastern Cape", "value": "0" },
        { "key": "Free State", "value": "1" },
        { "key": "Gauteng", "value": "2" },
        { "key": "KwaZulu-Natal", "value": "3" },
        { "key": "Limpopo", "value": "4" },
        { "key": "Mpumalanga", "value": "5" },
        { "key": "Northern Cape", "value": "6" },
        { "key": "North West", "value": "7" },
        { "key": "Western Cape", "value": "8" }];

    for ( var i = 0; i < 24; i++ )
    {
      var hr = ( i < 10 ) ? "0" + i : i;
      var am = ( i < 12 ) ? "am" : "pm";

      this.Time.push( { key: `${hr}:00 ${am}`, value: `${hr}:00` } );
    }

    this.SetDefaults();
  }

  OnScroll( e: any )
  {
    //this.ShowScroll = false; //( e.detail.scrollTop >= 100 );
    //this.StickyCategory = ( e.detail.scrollTop >= 110 );
  }

  ScrollToTop() 
  {
    this.ContentPage.scrollToTop( 1000 );
  }

  async SetDefaults() 
  {
    const st = await this._storage.create();

    this.storage = st;

    await this.GetUser();
    await this.GetRules();
    await this.SetDeviceUser();
    await this.SetAppDetails();

    this.SelfieUrl = ( this.DeviceUser != undefined && this.DeviceUser.SelfieUrl != undefined && this.DeviceUser.SelfieUrl != "" ) ? this.APIUrl + this.DeviceUser.SelfieUrl : this.SelfieUrl;

    this.MarketingBannerUrl = ( this.Rules.Client.MarketingBannerUrl != undefined && this.Rules.Client.MarketingBannerUrl != "" ) ? this.APIUrl + this.Rules.Client.MarketingBannerUrl : this.MarketingBannerUrl;
  }

  async PushNotificationConfig()
  {
    if ( !this.IsAndroid && !this.IsIOS )
    {
      return;
    }

    try
    {
      if ( this.IsIOS )
      {
        this.oneSignal.startInit( this.Rules.OneSignaIAppId );
      }
      else
      {
        this.oneSignal.startInit( this.Rules.OneSignaIAppId, this.Rules.FirebaseSenderId );
      }

      this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.None );

      this.oneSignal.handleNotificationReceived().subscribe( data =>
      {
        //alert( JSON.stringify( data.payload ) );
      });

      this.oneSignal.handleNotificationOpened().subscribe( data =>
      {
        if ( data.notification.payload )
        {
          this.TicketId = data.notification.payload.additionalData.TicketId;
        }

        this.GoToPage( "chats", false, true );
      });

      this.oneSignal.endInit();

      this.oneSignal.getIds().then( identity =>
      {
        this.UpdateOneSignalToken( identity.userId );
      });
    }
    catch( error: any )
    {
      this.ShowError( JSON.stringify( error ) );
    }
  }

  async SaveDeviceDetails()
  {
    try
    {
      if ( this.DeviceUUId == undefined || this.PlatformName == undefined )
      {
        return;
      }

      var device = `Id=${this.CurrentUser.Id}&DeviceId=${this.DeviceUUId}&DeviceOS=${this.PlatformName}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      await this.http.post<iUserModel>( this.APIUrl + "/api/Account/UpDateDeviceDetails", device, httpOptions ).toPromise();

      this.CurrentUser.DeviceId = this.DeviceUUId;
      this.CurrentUser.DeviceOS = this.PlatformName;
    }
    catch( error: any )
    {
      this.ShowError( JSON.stringify( error ) );
    }
  }
  
  async UpdateOneSignalToken( token: any )
  {
    if ( this.CurrentUser == undefined )
    {
      return;
    }

    //this.ShowMessage( "Device Id", token );

    // API Call here
    try
    {
      var device = `Id=${this.CurrentUser.Id}&OneSignalToken=${token}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      await this.http.post<iUserModel>( this.APIUrl + "/api/Chat/UpdateOneSignalToken", device, httpOptions ).toPromise();

      this.CurrentUser.SignalToken = token;
    }
    catch( error: any )
    {
      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.ShowError( JSON.stringify( err ) );

      return;
    }
  }

  async SetAppDetails()
  {
    this.IsIOS = this.platform.is( "ios" );
    this.IsAndroid = this.platform.is( "android" );
    this.IsHuawei = ( this.device.manufacturer == undefined ) ? false : this.device.manufacturer.toLowerCase().includes( "huawei" );
    
    this.DeviceUUId = this.device.uuid;
    this.PlatformName = this.device.platform;

    this.appVersion.getAppName().then( v =>
    {
      this.AppName = v;
    });

    this.appVersion.getVersionNumber().then( v =>
    {
      this.AppVersion = v;
    });

    this.appVersion.getVersionCode().then( v =>
    {
      this.AppVersionCode = v;
    });
  }

  async ShowLoading( message: string = "" )
  {
    let loading = await this.loadingCtrl.create(
    { 
      spinner: "bubbles",
      message: message
    } );
  
    loading.present();

    return loading;
  }

  async ShowMessage( title:string, message:string ) 
  {
    let alert = await this.alertCtrl.create(
    {
      header: title,
      message: message,
      buttons: [ 'OK' ]
    });

    await alert.present();
  }

  async ShowError( text: string ) 
  {
    let alert = await this.alertCtrl.create(
    {
      header: "Error",
      message: text,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async Login( login: any ) 
  {
    var loading = await this.ShowLoading();

    try
    {
      var url = `${this.APIUrl}/api/Account/Login?email=${login.email}&password=${login.password}&apikey=${this.APIKey}&clientId=${this.ClientId}`;
      this.CurrentUser = await this.http.get<iUserModel>( url ).toPromise();

      this.DeviceUser = this.CurrentUser;
      this.CurrentUser.Password = login.password;

      // Store User Details
      if ( this.storage )
      {
        await this.storage.set( "DeviceUser", this.CurrentUser );
        await this.storage.set( "CurrentUser", this.CurrentUser );
      }

      await this.SetDefaults();
    }
    catch( error: any )
    {
      loading.dismiss();

      this.CurrentUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }

    loading.dismiss();
  }

  async PinIn( pin: string ) 
  {
    var loading = await this.ShowLoading();

    try
    {
      var url = `${this.APIUrl}/api/Account/LoginByPin?pin=${pin}&email=${this.DeviceUser.Email}&apikey=${this.APIKey}&clientId=${this.ClientId}`;
      this.UpdatedUser = await this.http.get<iUserModel>( url ).toPromise();

      if ( this.UpdatedUser != undefined && this.UpdatedUser.Code == 1 )
      {
        this.DeviceUser = this.CurrentUser = this.UpdatedUser;

        // Store User Details
        if ( this.storage )
      {
        await this.storage.set( "DeviceUser", this.CurrentUser );
        await this.storage.set( "CurrentUser", this.CurrentUser );
      }

        await this.SetDefaults();
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }

    loading.dismiss();
  }

  async LoginByMembershipIdAndPin( login: any ) 
  {
    var loading = await this.ShowLoading();

    try
    {
      var url = `${this.APIUrl}/api/Account/LoginByMembershipIdAndPin?MembershipId=${login.MembershipId}&Pin=${login.Pin}&apikey=${this.APIKey}&clientId=${this.ClientId}`;
      
      this.CurrentUser = await this.http.get<iUserModel>( url ).toPromise();

      if ( this.CurrentUser != undefined && this.CurrentUser.Code == 1 )
      {
        this.DeviceUser = this.CurrentUser;

        this.CurrentUser.Password = login.password;

        // Store User Details
        if ( this.storage )
      {
        await this.storage.set( "DeviceUser", this.CurrentUser );
        await this.storage.set( "CurrentUser", this.CurrentUser );
      }

        await this.SetDefaults();

        this.AllDealsLoaded = false;

        await this.LoadCouponDeals( false );
        await this.LoadVoucherDeals( false );
        await this.LoadTravelDeals( false );
        await this.LoadFastFoodDeals( false );
        await this.LoadAssistanceDeals( false );
        //await this.LoadOnlineShoppingDeals( false );

        this.AllDealsLoaded = true;
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.CurrentUser = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async RemovePin()
  {
    this.DeviceUser.Pin = undefined;

    if ( this.storage )
    {
      await this.storage.set( "DeviceUser", this.DeviceUser );
    }
  }

  async PurchaseVoucherDeal( isViral: boolean = false )
  {
    var loading = await this.ShowLoading( "Processing..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/PurchaseVoucher`;

      var body = `TradingPartnerId=${this.VoucherDeal.TradingPartnerId}&MemberId=${this.CurrentUser.Member.Id}&CampaignId=${this.VoucherDeal.Id}&Quantity=1&Amount=${this.DealAmount}&Discount=${this.VoucherDeal.CampaignTier.DiscountPercentage}&PaymentMethod=${this.DealPaymentMethod}&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      this.DealResult = await this.http.post<iDealResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      if ( isViral && this.DealResult != undefined && this.DealResult.Code == 2 )
      {
        // Load history
        this.Vouchers = [];
        
        await this.LoadVouchers( false );
  
        var i = this.Vouchers.findIndex( (n: { CampaignPurchaseId: any; }) => n.CampaignPurchaseId == this.DealResult.CampaignPurchaseId );

        this.Voucher = this.Vouchers[ i ];
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.DealResult = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async CheckVoucherPaymentStatus()
  {
    var loading = await this.ShowLoading( "Finalizing..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/CheckVoucherPaymentStatus?CampaignPurchaseId=${this.DealResult.CampaignPurchaseId}&clientId=${this.ClientId}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.PaymentResult = await this.http.post<iDealResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.PaymentResult = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async UpdateCouponCart()
  {
    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Coupon/UpdateCart`;

      var body = `UserId=${this.CurrentUser.Id}&MemberId=${this.CurrentUser.Member.Id}&CampaignId=${this.CampaignId}&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      // Append coupon details
      for ( var i = 0; i < this.CouponShoppingCart.length; i++ )
      {
        body += `&Coupons[${i}].Guid=${this.CouponShoppingCart[i].Guid}&Coupons[${i}].CouponsInCart=${this.CouponShoppingCart[i].CouponsInCart}&Coupons[${i}].Discount=${this.CouponShoppingCart[i].DiscountSingle}`;
      }

      await this.http.post<iDealResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      return;
    }
  }

  async PurchaseCouponDeal()
  {
    var loading = await this.ShowLoading( "Processing..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Coupon/PurchaseCoupon`;

      var body = `UserId=${this.CurrentUser.Id}&MemberId=${this.CurrentUser.Member.Id}&CampaignId=${this.CampaignId}&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      // Append coupon details
      for ( var i = 0; i < this.CouponShoppingCart.length; i++ )
      {
        body += `&Coupons[${i}].Guid=${this.CouponShoppingCart[i].Guid}&Coupons[${i}].CouponsInCart=${this.CouponShoppingCart[i].CouponsInCart}&Coupons[${i}].Discount=${this.CouponShoppingCart[i].DiscountSingle}`;
      }

      this.DealResult = await this.http.post<iDealResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.DealResult = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async PurchaseTravelDeal()
  {
    var loading = await this.ShowLoading( "Processing..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/PurchaseTravel`;

      var body = `MemberId=${this.CurrentUser.Member.Id}&CampaignId=${this.TravelDeal.Id}&Quantity=1&Amount=${this.DealAmount}&Discount=${this.TravelDeal.VoucherDiscount}&PaymentMethod=${this.DealPaymentMethod}&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      this.DealResult = await this.http.post<iDealResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.DealResult = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async CheckIn()
  {
    var loading = await this.ShowLoading( "Checking in, please wait..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/CheckIn`;

      var body = `UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&CampaignCode=${this.Restaurant.CampaignCode}&RestaurantId=${this.Restaurant.Id}&RestaurantName=${this.Restaurant.Name}&IdNumber=${this.CurrentUser.IdNumber}&Name=${this.CurrentUser.Name}&Surname=${this.CurrentUser.Surname}&EmailAddress=${this.CurrentUser.Email}&MobileNumber=${this.CurrentUser.Cell}&AccessToken=${this.APIAuthentication.AccessToken}&ClientId=${this.ClientId}`;

      this.CheckInResult = await this.http.post<iCheckInResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();
      this.CheckInResult.Restaurant = this.Restaurant;
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.CheckInResult == undefined )
      {
        this.CheckInResult = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.CheckInResult.Code = -1;
      this.CheckInResult.Message = JSON.stringify( err );

      return;
    }

    loading.dismiss();
  }

  SearchCheckIns( query:string = "" )
  {
    var resp = [];

    query = query.toLowerCase();

    for ( let r of this.CheckIns )
    {
      if ( ( r.Restaurant != undefined && r.Restaurant.Name != undefined && r.Restaurant.Name.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.Region != undefined && r.Restaurant.Region.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.Suburb != undefined && r.Restaurant.Suburb.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.AddressLine1 != undefined && r.Restaurant.AddressLine1.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.AddressLine2 != undefined && r.Restaurant.AddressLine2.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.PostalCode != undefined && r.Restaurant.PostalCode.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.Telephone != undefined && r.Restaurant.Telephone.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.BookingTelephone != undefined && r.Restaurant.BookingTelephone.toLowerCase().includes( query ) ) ||
           ( r.DRReference.toLowerCase().includes( query ) ) ||
           ( r.CampaignCode.toLowerCase().includes( query ) ) )
      {
        resp.push( r );
      }
    }

    return resp;
  }

  async GetAvailableCheckIns( query:string = "" )
  {
    if ( this.CheckIns != undefined && this.CheckIns.length > 0 )
    {
      if ( query != "" )
      {
        return this.SearchCheckIns( query );
      }

      return this.CheckIns;
    }

    var loading = await this.ShowLoading( "Fetching activated discounts..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetAvailableCheckIns?UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}&Query=${query}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}&Query=${query}`;

      this.CheckIns = await this.http.post<iCheckInResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      if ( query != "" )
      {
        return this.SearchCheckIns( query );
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.CheckInResult == undefined )
      {
        this.CheckInResult = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.CheckInResult.Code = -1;
      this.CheckInResult.Message = JSON.stringify( err );

      return [];
    }

    loading.dismiss();

    return this.CheckIns;
  }

  SearchClaims( query:string = "" )
  {
    var resp = [];

    query = query.toLowerCase();

    for ( let r of this.Claims )
    {
      if ( ( r.Restaurant != undefined && r.Restaurant.Name != undefined && r.Restaurant.Name.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.Region != undefined && r.Restaurant.Region.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.Suburb != undefined && r.Restaurant.Suburb.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.AddressLine1 != undefined && r.Restaurant.AddressLine1.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.AddressLine2 != undefined && r.Restaurant.AddressLine2.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.PostalCode != undefined && r.Restaurant.PostalCode.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.Telephone != undefined && r.Restaurant.Telephone.toLowerCase().includes( query ) ) ||
           ( r.Restaurant != undefined && r.Restaurant.BookingTelephone != undefined && r.Restaurant.BookingTelephone.toLowerCase().includes( query ) ) ||
           ( r.DRReference.toLowerCase().includes( query ) ) ||
           ( r.CampaignCode.toLowerCase().includes( query ) ) )
      {
        resp.push( r );
      }
    }

    return resp;
  }

  async GetSubmittedClaims( query:string = "", partnerId: number = 0, showLoading: boolean = true )
  {
    if ( this.Claims != undefined && this.Claims.length > 0 )
    {
      if ( query != "" )
      {
        return this.SearchClaims( query );
      }

      return this.Claims;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your claims..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetSubmittedClaims?UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}&Query=${query}&TradingPartnerId=${partnerId}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}&Query=${query}`;

      this.Claims = await this.http.post<iClaimModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      if ( query != "" )
      {
        return this.SearchClaims( query );
      }
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.Claims == undefined )
      {
        this.Claims = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Claims.Code = -1;
      this.Claims.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.Claims;
  }

  async UpdateInAppBrowserUrl( url:string )
  {
    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/UpdateInAppBrowserUrl?Url=${url}&clientId=${this.ClientId}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
    }
  }

  async LoadVoucherDeals( showLoading: boolean = true )
  {
    if ( this.VoucherDeals != undefined && this.VoucherDeals.length > 0 )
    {
      return this.VoucherDeals;
    }

    if ( this.AllDealsLoaded )
    {
      return;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your deals..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetVoucherDeals?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.AllVoucherDeals = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      for ( let v of this.AllVoucherDeals )
      {
        if ( v.Category == "Vouchers" )
        {
          this.VoucherDeals.push( v );
        }
        else if ( v.Category == "Soccer" )
        {
          this.SoccerDeals.push( v );
        }
        else if ( v.Category == "Spa" )
        {
          this.SpaDeals.push( v );
        }
        else if ( v.Category == "Education" )
        {
          this.EducationDeals.push( v );
        }
        else if ( v.Category == "Entertainment" )
        {
          this.EntertainmentDeals.push( v );
        }
        else if ( v.Category == "Online Shopping" )
        {
          this.OnlineShoppingDeals.push( v );
        }
        else if ( v.Category == "Cosmetics" )
        {
          this.CosmeticsDeals.push( v );
        }
        else if ( v.Category == "Car Hire" )
        {
          this.CarHireDeals.push( v );
        }
      }

      this.VoucherDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.SoccerDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.SpaDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.EducationDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.EntertainmentDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.OnlineShoppingDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.CosmeticsDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
      this.CarHireDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      /*if ( this.VoucherDeals == undefined )
      {
        this.VoucherDeals = {};
      }*/

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.VoucherDeals.Code = -1;
      this.VoucherDeals.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.VoucherDeals;
  }

  async LoadVouchers( showLoading: boolean = true )
  {
    if ( this.RefreshVouchers )
    {
      this.Vouchers = [];

      this.RefreshVouchers = false;
    }

    if ( this.Vouchers != undefined && this.Vouchers.length > 0 )
    {
      return this.Vouchers;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your vouchers..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetVouchers?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.Vouchers = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.Vouchers == undefined )
      {
        this.Vouchers = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Vouchers.Code = -1;
      this.Vouchers.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.Vouchers;
  }

  async LoadCouponDeals( showLoading: boolean = true )
  {
    if ( this.AllDealsLoaded && !this.RefreshCoupons )
    {
      return;
    }

    if ( this.RefreshCoupons )
    {
      this.CouponDeals = [];

      this.CouponShoppingCart = [];
      
      this.CampaignId = undefined;

      this.RefreshCoupons = false;
    }

    if ( this.CouponDeals != undefined && this.CouponDeals.length > 0 )
    {
      return this.CouponDeals;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your deals..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Coupon/GetCouponDeals?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&Skip=0&Take=10`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.CouponDeals = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      this.FinalizeCoupons();
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.CouponDeals == undefined )
      {
        this.CouponDeals = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.CouponDeals.Code = -1;
      this.CouponDeals.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.CouponDeals;
  }

  async FinalizeCoupons()
  {
    if ( this.CouponDeals == undefined || ( this.CouponDeals != undefined && this.CouponDeals.length <= 0 ) )
    {
      return;
    }

    this.LoadingOtherCoupons = true;

    for ( let d of this.CouponDeals )
    {
      for ( let v of d.Vendors )
      {
        var coupons = await this.FetchCoupons( v.Id, 10, d.CouponQuantity, v.StartDate, v.EndDate );

        if ( coupons.length <= 0 ) continue;

        this.OtherCoupons[v.Id] = coupons;
      }
    }

    this.LoadingOtherCoupons = false;
  }

  async FetchCoupons( vendorId: number, skip: number = 0, couponQuantity: number = 5, fromDate: any, toDate: any )
  {
    var url = `${this.APIUrl}/api/Coupon/FetchCoupons?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&VendorId=${vendorId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&Skip=${skip}&CouponQuantity=${couponQuantity}&FromDate=${fromDate}&ToDate=${toDate}`;

    var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

    this.CouponTemp = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

    return this.CouponTemp;
  }

  async LoadCoupons( showLoading: boolean = true )
  {
    if ( this.RefreshCoupons )
    {
      this.Coupons = [];

      //this.CouponDeals = [];

      this.CouponShoppingCart = [];
      
      this.CampaignId = undefined;

      //this.RefreshCoupons = false;
    }

    if ( this.Coupons != undefined && this.Coupons.length > 0 )
    {
      return this.Coupons;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your coupons..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Coupon/GetCoupons?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.Coupons = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      if ( this.RefreshCoupons )
      {
        await this.LoadCouponDeals( false );
      }
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.Coupons == undefined )
      {
        this.Coupons = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Coupons.Code = -1;
      this.Coupons.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.Coupons;
  }

  async LoadTravelDeals( showLoading: boolean = true )
  {
    if ( this.TravelDeals != undefined && this.TravelDeals.length > 0 )
    {
      return this.TravelDeals;
    }

    if ( this.AllDealsLoaded )
    {
      return;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your deals..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetTravelDeals?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.TravelDeals = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      for ( let v of this.AllVoucherDeals )
      {
        if ( v.Category == "Travel" )
        {
          this.TravelDeals.push( v );
        }
      }
      
      this.TravelDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.TravelDeals == undefined )
      {
        this.TravelDeals = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.TravelDeals.Code = -1;
      this.TravelDeals.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.TravelDeals;
  }

  async LoadFastFoodDeals( showLoading: boolean = true )
  {
    if ( this.FastFoodDeals != undefined && this.FastFoodDeals.length > 0 )
    {
      return this.FastFoodDeals;
    }

    if ( this.AllDealsLoaded )
    {
      return;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your deals..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetFastFoodDeals?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.FastFoodDeals = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      this.FastFoodDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.FastFoodDeals == undefined )
      {
        this.FastFoodDeals = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.FastFoodDeals.Code = -1;
      this.FastFoodDeals.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.FastFoodDeals;
  }

  async LoadOnlineShoppingDeals( showLoading: boolean = true )
  {
    if ( this.OnlineShoppingDeals != undefined && this.OnlineShoppingDeals.length > 0 )
    {
      return this.OnlineShoppingDeals;
    }

    if ( this.AllDealsLoaded )
    {
      return;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your deals..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetOnlineShoppingDeals?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.OnlineShoppingDeals = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();
      
      this.OnlineShoppingDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.OnlineShoppingDeals == undefined )
      {
        this.OnlineShoppingDeals = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.OnlineShoppingDeals.Code = -1;
      this.OnlineShoppingDeals.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.OnlineShoppingDeals;
  }

  async LoadAssistanceDeals( showLoading: boolean = true )
  {
    if ( this.AssistanceDeals != undefined && this.AssistanceDeals.length > 0 )
    {
      return this.AssistanceDeals;
    }

    if ( this.AllDealsLoaded )
    {
      return;
    }

    var loading;

    if ( showLoading )
    {
      loading = await this.ShowLoading( "Fetching your deals..." );
    }

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetAssistanceDeals?UserId=${this.CurrentUser.Id}&ClientId=${this.ClientId}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}`;

      this.AssistanceDeals = await this.http.post<iDealModel>( url, body, this.APIAuthenticationHeader ).toPromise();

      for ( let v of this.AllVoucherDeals )
      {
        if ( v.Category == "Assistance" )
        {
          this.AssistanceDeals.push( v );
        }
      }
      
      this.AssistanceDeals.sort( ( a: { Sort: number; }, b: { Sort: number; } ) => a.Sort - b.Sort );
    }
    catch( error: any )
    {
      if ( showLoading && loading )
      {
        loading.dismiss();
      }

      if ( this.AssistanceDeals == undefined )
      {
        this.AssistanceDeals = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.AssistanceDeals.Code = -1;
      this.AssistanceDeals.Message = JSON.stringify( err );

      return [];
    }

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    return this.AssistanceDeals;
  }

  async GetMonthRefundSum()
  {
    var loading = await this.ShowLoading();

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetMonthRefundSum?RestaurantId=${this.Restaurant.Id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}&RestaurantId=${this.Restaurant.Id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}`;

      this.Calculation = await this.http.post<iNumberModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.Calculation == undefined )
      {
        this.Calculation = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Calculation.ResponseCode = -1;
      this.Calculation.Description = JSON.stringify( err );
    }

    loading.dismiss();
  }

  async GetDayRefundTotal()
  {
    var loading = await this.ShowLoading();

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetDayRefundTotal?RestaurantId=${this.Restaurant.Id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}&RestaurantId=${this.Restaurant.Id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}`;

      this.Calculation = await this.http.post<iNumberModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.Calculation == undefined )
      {
        this.Calculation = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Calculation.ResponseCode = -1;
      this.Calculation.Description = JSON.stringify( err );
    }

    loading.dismiss();
  }

  async GetMonthRefundTotal()
  {
    var loading = await this.ShowLoading();

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/GetMonthRefundTotal?RestaurantId=${this.Restaurant.Id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}`;

      var body = `AccessToken=${this.APIAuthentication.AccessToken}&RestaurantId=${this.Restaurant.Id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&clientId=${this.ClientId}`;

      this.Calculation = await this.http.post<iNumberModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.Calculation == undefined )
      {
        this.Calculation = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Calculation.ResponseCode = -1;
      this.Calculation.Description = JSON.stringify( err );
    }

    loading.dismiss();
  }

  SearchNotifications( query:string = "" )
  {
    var resp = [];

    query = query.toLowerCase();

    for ( let r of this.Notifications )
    {
      if ( ( r.Message.toLowerCase().includes( query ) ) )
      {
        resp.push( r );
      }
    }

    return resp;
  }

  async GetNotifications( query:string = "" )
  {
    if ( this.Notifications != undefined && this.Notifications.length > 0 )
    {
      if ( query != "" )
      {
        return this.SearchNotifications( query );
      }

      return this.Notifications;
    }

    var loading = await this.ShowLoading( "Fetching notifications..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Account/Notifications?Id=${this.CurrentUser.Id}&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      this.Notifications = await this.http.get<iNotificationModel>( url ).toPromise();

      if ( query != "" )
      {
        return this.SearchNotifications( query );
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.Notifications == undefined )
      {
        this.Notifications = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.Notifications.ResponseCode = -1;
      this.Notifications.Description = JSON.stringify( err );

      return [];
    }

    loading.dismiss();

    return this.Notifications;
  }

  async RemoveCheckIn( id: number )
  {
    var loading = await this.ShowLoading( "Removing discount..." );

    try
    {
      await this.AuthenticateAPI();

      var url = `${this.APIUrl}/api/Member/RemoveCheckIn`;

      var body = `Id=${id}&UniqueCustomerKey=${this.CurrentUser.Member.MembershipNo}&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      this.CheckInResult = await this.http.post<iCheckInResultModel>( url, body, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      if ( this.CheckInResult == undefined )
      {
        this.CheckInResult = {};
      }

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.CheckInResult.Code = -1;
      this.CheckInResult.Message = JSON.stringify( err );

      return;
    }

    loading.dismiss();
  }

  async LogOut() 
  {
    this.CurrentUser = this.VoucherDeal = this.TravelDeal = this.CouponDeal = this.Restaurant = this.DealResult = this.CheckInResult = this.PaymentResult = undefined;
    
    if ( this.storage )
    {
      await this.storage.remove( "CurrentUser" ).then( () =>
      {
      });
    }

    this.CheckIns = this.AllVoucherDeals = this.CouponDeals = this.VoucherDeals = this.TravelDeals = this.SoccerDeals = this.SpaDeals = this.EducationDeals = this.EntertainmentDeals = this.FastFoodDeals = this.OnlineShoppingDeals = this.CosmeticsDeals = this.CarHireDeals = this.AssistanceDeals = this.Restaurants = [];

    this.AllDealsLoaded = false;
  }

  async ForgotPassword( email: string )
  {
    if ( email === undefined ) 
    {
      this.UpdatedUser = { Code: -1, Message: "Email address is required." };

      return;
    }

    var loading = await this.ShowLoading();

    // API Call here
    try
    {
      var url = `${this.APIUrl}/api/Account/ForgotPassword?email=${email}&apikey=${this.APIKey}&clientId=${this.ClientId}`;
      this.UpdatedUser = await this.http.get<iUserModel>(url).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }

    loading.dismiss();
  }

  async SetDeviceUser() 
  {
    if ( this.storage )
    {
      await this.storage.get( "DeviceUser" ).then( ( user: any ) =>
      {
        this.DeviceUser = user;
      });
    }
  }

  async SetCurrentUser( user: any ) 
  {
    this.CurrentUser = user;

    if ( this.storage )
    {
      await this.storage.set( "CurrentUser", user );
    }
  }

  async GetUser() 
  {
    if ( this.storage )
    {
      this.storage.get( "CurrentUser" ).then( ( user: any ) =>
      {
        this.CurrentUser = user;
      });
    }
  }

  async GetRules()
  {
    try
    {
      var url = `${this.APIUrl}/api/Account/GetRules?apikey=${this.APIKey}&clientId=${this.ClientId}`;
      this.Rules = await this.http.get<iSystemRulesModel>( url ).toPromise();

      if ( this.storage )
      {
        await this.storage.set( "Rules", this.Rules );
      }
    }
    catch( error: any )
    {
      return;
    }
  }

  async Register( user: any, message: string = "" ) 
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      user = `${user}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>(this.APIUrl + "/api/Account/VuyoRegister", user, httpOptions).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }

    loading.dismiss();
  }

  async ActivateAccount( userId: number ) 
  {
    // API Call here
    try
    {
      var p = `Id=${userId}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>(this.APIUrl + "/api/Account/ActivateAccount", p, httpOptions).toPromise();
    }
    catch( error: any )
    {
      this.UpdatedUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }
  }

  async SendOTP( membershipId: string, mobileNumber: string, message: string = "" )
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      var p = `MembershipId=${membershipId}&Cell=${mobileNumber}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>(this.APIUrl + "/api/Account/SendOTP", p, httpOptions).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async SubmitInvoice( invoice: string, message: string = "" ) 
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      await this.AuthenticateAPI();

      invoice += `&AccessToken=${this.APIAuthentication.AccessToken}&clientId=${this.ClientId}`;

      this.InvoiceResult = await this.http.post<iInvoiceResultModel>( this.APIUrl + "/api/Member/Invoice", invoice, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.InvoiceResult = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async MarkNotificationAsRead( id:any ) 
  {
    var loading = await this.ShowLoading();

    // API Call here
    try
    {
      await this.AuthenticateAPI();

      var p = `id=${id}&userid=${this.CurrentUser.Id}&clientId=${this.ClientId}&AccessToken=${this.APIAuthentication.AccessToken}`;

      var url = `id=${id}&userid=${this.CurrentUser.Id}&clientId=${this.ClientId}&AccessToken=${this.APIAuthentication.AccessToken}`;

      await this.http.post<iNotificationModel>( this.APIUrl + "/api/Account/MarkNotificationAsRead?" + url, p, this.APIAuthenticationHeader ).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      return;
    }

    loading.dismiss();
  }

  async Update( agent: any, message: string = "" ) 
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      agent = `${agent}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>( this.APIUrl + "/api/Account/VuyoUpdate", agent, httpOptions ).toPromise();

      if ( this.UpdatedUser.Code == 1 )
      {
        this.CurrentUser = this.DeviceUser = this.UpdatedUser;

        // Store User Details
        if ( this.storage )
        {
          await this.storage.set( "DeviceUser", this.DeviceUser );
          await this.storage.set( "CurrentUser", this.CurrentUser );
        }
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }

    loading.dismiss();
  }

  async Delete( message: string )
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      var user = `id=${this.CurrentUser.Id}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>(this.APIUrl + "/api/Account/VuyoDelete", user, httpOptions).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async UpdateBank( bank: any, message: string = "" ) 
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      bank = `${bank}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>( this.APIUrl + "/api/Account/UpdateBank", bank, httpOptions ).toPromise();

      if ( this.UpdatedUser.Code == 1 )
      {
        this.CurrentUser = this.UpdatedUser;
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( error.error.Message ) };

      return;
    }

    loading.dismiss();
  }

  async UpdatePin( pin: string, confirmPin: string )
  {
    var loading = await this.ShowLoading( "Updating pin..." );

    // API Call here
    try
    {
      var p = `id=${this.CurrentUser.Id}&pin=${pin}&confirmpin=${confirmPin}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>( this.APIUrl + "/api/Account/UpdatePin", p, httpOptions ).toPromise();

      if ( this.UpdatedUser.Code == 1 )
      {
        this.DeviceUser = this.UpdatedUser;
        this.CurrentUser = this.UpdatedUser;

        if ( this.storage )
        {
          await this.storage.set( "DeviceUser", this.CurrentUser );
          await this.storage.set( "CurrentUser", this.CurrentUser );
        }
      }
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async UpdatePin1( user: any, message: string = "" ) 
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      user = `${user}&id=${this.UpdatedUser.Id}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>(this.APIUrl + "/api/Account/UpdatePin", user, httpOptions).toPromise();
    }
    catch( error: any )
    {
      loading.dismiss();

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( err ) };

      return;
    }

    loading.dismiss();
  }

  async DontShowWelcomeAgain( chk:boolean )
  {
    // API Call here
    try
    {
      var welcome = `Id=${this.CurrentUser.Id}&DontShowWelcome=${chk}&apikey=${this.APIKey}&clientId=${this.ClientId}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      await this.http.post<iUserModel>( this.APIUrl + "/api/Account/DontShowWelcomeAgain", welcome, httpOptions ).toPromise();
    }
    catch( error: any )
    {
      return;
    }
  }

  async UploadDocument( userId: number, fileurl: any, fileKey: string, fileName: string, mimeType: string, message: string = "" )
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      var p = `userId=${userId}&fileKey=${fileKey}&fileName=${fileName}&apikey=${this.APIKey}&clientId=${this.ClientId}&fileurl=${fileurl}`;

      let httpOptions = 
      {
        headers: new HttpHeaders(
        {
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.UpdatedUser = await this.http.post<iUserModel>( this.APIUrl + "/api/Account/UploadDocument", p, httpOptions ).toPromise();
    }
    catch( error: any )
    {
      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.UpdatedUser = { Code: -1, Message: JSON.stringify( err ) };
    }

    loading.dismiss();
  }

  async UploadDocument1( agentId: number, fileurl: any, fileKey: string, fileName: string, mimeType: string )
  {
    // API Call here
    try
    {
      const fileTransfer: FileTransferObject = this.transfer.create();

      let options: FileUploadOptions =
      {
        fileKey: fileKey,
        fileName: fileName,
        chunkedMode: false,
        mimeType: mimeType,
        headers: {
          agentId: agentId,
          apikey: this.APIKey
        }
      };

      fileTransfer.upload( fileurl, `${this.APIUrl}/api/Account/UploadDocument?agentId=${agentId}&apikey=${this.APIKey}&clientId=${this.ClientId}`, options ).then( ( data ) =>
      {
        

      }, ( err ) =>
      {
        
      });
    }
    catch( error: any )
    {
      
    }
  }

  async UploadReceipt( drreference: string, fileurl: any, fileKey: string, fileName: string, mimeType: string, message: string = "" )
  {
    var loading = await this.ShowLoading( message );

    // API Call here
    try
    {
      const fileTransfer: FileTransferObject = this.transfer.create();

      let options: FileUploadOptions =
      {
        fileKey: fileKey,
        fileName: fileName,
        chunkedMode: false,
        mimeType: mimeType,
        headers: {
          drreference: drreference,
          AccessToken: this.APIAuthentication.AccessToken
        }
      };

      await fileTransfer.upload( fileurl, `${this.APIUrl}/api/Account/UpdateInvoice?DRReference=${drreference}&clientId=${this.ClientId}&AccessToken=${this.APIAuthentication.AccessToken}`, options ).then( ( data ) =>
      {
        this.InvoiceResult.ResponseCode = 1;

      }, ( err ) =>
      {
        this.InvoiceResult.ResponseCode = 1;
        this.InvoiceResult.Description = JSON.stringify( err );
      });
    }
    catch( error: any )
    {
      this.InvoiceResult.ResponseCode = 1;

      var err = ( error.error && error.error.ExceptionMessage ) ? error.error.ExceptionMessage: ( error.error && error.error.Message ) ?  error.error.Message : error;

      this.InvoiceResult.Description = JSON.stringify( err );
    }

    loading.dismiss();
  }

  DataURItoBlob( fileurl:any, mimeType: string )
  {
    const byteString = window.atob( fileurl );
    const arrayBuffer = new ArrayBuffer( byteString.length );
    const int8Array = new Uint8Array( arrayBuffer );

    for ( let i = 0; i < byteString.length; i++ )
    {
      int8Array[ i ] = byteString.charCodeAt( i );
    }

    const blob = new Blob( [ int8Array ], { type: mimeType } );    

    return blob;
  }

  GetISODateString( date: Date = new Date() )
  {
    try
    {
      return `${date.getFullYear()}-${this.Do0Check( date.getMonth() + 1 )}-${this.Do0Check( date.getDate() )}T${this.Do0Check( date.getHours() )}:${this.Do0Check( date.getMinutes() )}`;
    }
    catch
    {
      return new Date().toISOString();
    }
  }

  GetShortDate( date:any, format:string = "" )
  {
    if( date == undefined )
    {
      return '';
    }

    var d = new Date( date );

    if ( format != "" )
    {
      switch ( format )
      {
        case'yyyy/MM/dd':
          return `${d.getFullYear()}/${this.Do0Check( d.getMonth() + 1 )}/${this.Do0Check( d.getDate() )}`;
      }
    }

    return `${this.Do0Check( d.getDate() )}/${this.Do0Check( d.getMonth() + 1 )}/${d.getFullYear()}`;
  }

  GetShortTime( date:any )
  {
    var d = new Date( date );

    return `${this.Do0Check( d.getHours() )}:${this.Do0Check( d.getMinutes() )}`;
  }

  GetFormatTime( time:string )
  {
    return `${time.split( ':' )[ 0 ]}h${time.split( ':' )[ 1 ]}`;
  }

  Do0Check( digit: number )
  {
    return ( digit < 10 ) ? `0${digit}` : digit + "";
  }

  GetTime( time: string )
  {
    return `${time.split( ':' )[ 0 ]}:${time.split( ':' )[ 1 ]}`;
  }

  GetInvoiceStatusDescription( status:any )
  {
    if ( status == undefined )
    {
      return status;
    }

    var i = this.InvoiceStatus.findIndex( (s: { value: any; }) => s.value == status );

    if ( i < 0 )
    {
      return status;
    }

    return this.InvoiceStatus[ i ].key;
  }

  ToDecimal( number: number, decimals: number )
  {
    if ( number == undefined )
    {
      number = 0;
    }

    return number.toFixed( decimals );
  }

  SearchRestaurants( query:string = "" )
  {
    var resp = [];

    query = query.toLowerCase();

    for ( let r of this.Restaurants )
    {
      if ( ( r.Name != undefined && r.Name.toLowerCase().includes( query ) ) ||
           ( r.Region != undefined && r.Region.toLowerCase().includes( query ) ) ||
           ( r.Suburb != undefined && r.Suburb.toLowerCase().includes( query ) ) ||
           ( r.AddressLine1 != undefined && r.AddressLine1.toLowerCase().includes( query ) ) ||
           ( r.AddressLine2 != undefined && r.AddressLine2.toLowerCase().includes( query ) ) ||
           ( r.PostalCode != undefined && r.PostalCode.toLowerCase().includes( query ) ) ||
           ( r.Telephone != undefined && r.Telephone.toLowerCase().includes( query ) ) ||
           ( r.BookingTelephone != undefined && r.BookingTelephone.toLowerCase().includes( query ) ) )
      {
        resp.push( r );
      }
    }

    return resp;
  }

  async GetRestaurants( query: string = "", partnerId: number = 0, showLoading: boolean = true )
  {
    if ( this.Restaurants != undefined && this.Restaurants.length > 0 )
    {
      if ( query != "" )
      {
        return this.SearchRestaurants( query );
      }

      return this.Restaurants;
    }

    var loading;

    if ( showLoading && loading )
    {
      loading = await this.ShowLoading( "Fetching restaurants..." );
    }

    await this.AuthenticateAPI();

    var url = `${this.APIUrl}/api/Restaurant/List`;

    var body = `Query=${query}&AccessToken=${this.APIAuthentication.AccessToken}&CampaignCode=${this.VoucherDeal.CampaignCode}&PartnerId=${partnerId}&clientId=${this.ClientId}`;

    this.Restaurants = await this.http.post<iRestaurantModel>( url, body, this.APIAuthenticationHeader ).toPromise();

    if ( showLoading && loading )
    {
      loading.dismiss();
    }

    if ( query != "" )
    {
      return this.SearchRestaurants( query );
    }

    return this.Restaurants;
  }

  async AuthenticateAPI()
  {
    /*if ( this.APIAuthenticationHeader != null )
    {
      return this.APIAuthenticationHeader;
    }*/

    var url = `${this.APIUrl}/api/Authorisation/Authenticate`;
    
    var body = `APIKey=${this.APIKey}&clientId=${this.ClientId}`;

    let httpOptions = 
    {
      headers: new HttpHeaders
      ({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    this.APIAuthentication = await this.http.post<iAPIAuthentionModel>( url, body, httpOptions ).toPromise();

    if ( this.APIAuthentication.Authorized )
    {
      let httpOptions = 
      {
        headers: new HttpHeaders
        ({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      this.APIAuthenticationHeader = httpOptions;
    }
    else
    {
      this.APIAuthentication = null;

      await this.AuthenticateAPI();
    }
  }

  GetBankName( id:any )
  {
    var i = this.Banks.findIndex( (b: { value: string; }) => b.value == id + "" );

    return this.Banks[ i ].key;
  }

  GetAccountType( id:any )
  {
    var i = this.BankAccountTypes.findIndex( (b: { value: string; }) => b.value == id + "" );

    return this.BankAccountTypes[ i ].key;
  }

  GetProvinceName( province: any )
  {
    var i = this.Provinces.findIndex( (b: { value: string; }) => b.value == province + "" );

    return this.Provinces[ i ].key;
  }

  HideAccountNumber( acc:string )
  {
    if ( acc == undefined || acc == "" )
    {
      return acc;
    }

    var hide = acc.length - 2;

    var arr = acc.split( '' );

    for ( var i = 0; i < hide; i++ )
    {
        arr[ i ] = "*";
    }

    return arr.join( "" );
  }

  async GoToPage( page:string, back: boolean = false, root: boolean = false )
  {
    if ( page == 'home' || page == 'login' || root )
    {
      this.navCtrl.navigateRoot( page );
    }
    else if ( back )
    {
      this.navCtrl.navigateBack( page );
    }
    else
    {
      this.navCtrl.navigateForward( page );
    }
  }

  async OnShowContact( contactNumber: string = "" )
  {
    var number = contactNumber == "" ? this.Rules.ContactNumber : contactNumber;

    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: ContactusComponent,
      componentProps: { ContactNumber: number }
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( r.data == 1 )
      {
        this.callNumber.callNumber( number, true )
        .then( res => console.log( 'Launched dialer!', res ) )
        .catch( err => this.ShowError( 'Error launching dialer' + JSON.stringify( err ) ) );
      }
    } );

    return await pop.present();
  }

  async SendSMS( number: string, message: string )
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: SendsmsComponent,
      componentProps: { ContactNumber: number, Message: message }
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.Proceed )
      {
        //CONFIGURATION
        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              intent: 'INTENT'  // send SMS with the native android SMS messaging
          }
        };

        this.sms.send( number, message, options )
        .then( res => console.log( 'Launched dialer!', res ) )
        .catch( err => this.ShowError( 'Error launching messenger' + JSON.stringify( err ) ) );
      }
    } );

    return await pop.present();
  }

  async Toast( m: string )
  {
    const t = await this.toastCtrl.create(
    {
      message: m,
      duration: 2000,
      position: "middle",
      cssClass: "my-toast",
    });

    t.present();
  }

  OpenSystemLink( url:string, target: string = "_system" )
  {
    this.iab.create( url, target, { location: 'yes' } );
  }

  MakeUserAddress( address: any )
  {
    var addr = "";

    if ( address == undefined )
    {
      return addr;
    }

    if ( address.Addressline1 != undefined )
    {
      addr += `${address.Addressline1},`;
    }
    if ( address.Addressline2 != undefined )
    {
      addr += `${address.Addressline2},`;
    }
    if ( address.Town != undefined )
    {
      addr += `${address.Town},`;
    }
    if ( address.Province != undefined )
    {
      addr += `${this.GetProvinceName( address.Province )}`;
    }

    return addr;
  }

  MakeRestaurantAddress( restaurant: any )
  {
    var addr = "";

    if ( restaurant == undefined )
    {
      return addr;
    }

    if ( restaurant.AddressLine1 != undefined && restaurant.AddressLine1 != "" )
    {
      addr += `${restaurant.AddressLine1}`;
    }
    if ( restaurant.AddressLine2 != undefined && restaurant.AddressLine2 != "" )
    {
      addr += `, ${restaurant.AddressLine2}`;
    }
    if ( restaurant.Suburb != undefined && restaurant.Suburb != "" )
    {
      addr += `, ${restaurant.Suburb}`;
    }
    if ( restaurant.Region != undefined && restaurant.Region != "" )
    {
      addr += `, ${restaurant.Region}`;
    }

    return addr;
  }

  GetRestaurantContact( restaurant: any )
  {
    var contact = ( restaurant.Telephone != undefined && restaurant.Telephone != "" ) ? restaurant.Telephone : restaurant.BookingTelephone;

    return contact;
  }
}


export interface iUserModel
{
  // Control
  Code: any;
  Message: string;

  // Properties
  Id: any;
  Status: any;
  Pin: string;
  Cell: string;
  Name: string;
  Email: string;
  Selfie: string;
  Surname: string;
  Password: string;
  IdNumber: string;
  DisplayName: string;
  
  Bank: any;
  Comments: any;
  Addresses: any;

  DoNotShowWelcome: boolean;
}

export interface iAPIAuthentionModel
{
  // Properties
  Authorized: boolean;
  AccessToken: string;
}

export interface iRestaurantModel
{
  // Control
  Code: any;
  Message: string;

  // Properties
  Id: any;

  Status: any;
  Name: string;
  ImageUrl: string;
  Telephone: string;
  BookingTelephone: string;
  AddressLine1: string;
  AddressLine2: string;
  Suburb: string;
  Region: string;
  Longitude: string;
  Latitude: any;
  PostalCode: any;

  CampaignCode: string;
}

export interface iCheckInResultModel
{
  Id: any;
  Receipt: any;
  CreatedOn: any;
  Restaurant: any;
  ResponseCode: any;
  CheckInDate: string;
  Description: string;
  DRReference: string;
  CampaignCode: string;
  UniqueCustomerKey: string;
}

export interface iSystemRulesModel
{
  LogoffSeconds: any;
  AutoLogoff: any;
  ActivationEmail: any;
}

export interface iClaimModel
{
  InvoiceId: any;
  Restaurant: any;
  ResponseCode: any;
  Description: string;
  DeclineReason: string;
  CampaignPurchase: any;
}

export interface iInvoiceResultModel
{
  Id: any;
  Receipt: any;
  CreatedOn: any;
  Restaurant: any;
  ResponseCode: any;
  CheckInDate: string;
  Description: string;
  DRReference: string;
  CampaignCode: string;
  UniqueCustomerKey: string;
}

export interface iNotificationModel
{
  Id: any;
  Status: any;
  CreatedOn: any;
  Message: string;
  ResponseCode: any;
  Description: string;
}

export interface iNumberModel
{
  Number: any;
  ResponseCode: any;
  Description: string;
}

export interface iDealModel
{
  Id: any;
  Description: string;
  LogoImageUrl: string;
  CampaignName: string;
  CampaignCode: string;
  DealsRedeemed: number;
  DealsRemaining: number;
  CouponQuantity: number;
}

export interface iDealResultModel
{
  Id: any;
  CreatedOn: any;
  ResponseCode: any;
  Description: string;
  DRReference: string;
  CampaignCode: string;
  UniqueCustomerKey: string;
}
