import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, IonContent, MenuController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { FastfoodconfirmclaimComponent } from '../fastfoodconfirmclaim/fastfoodconfirmclaim.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfoodclaim',
  templateUrl: './fastfoodclaim.page.html',
  styleUrls: ['./fastfoodclaim.page.scss'],
})
export class FastfoodclaimPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  // Form data
  ReceiptTotal: any;
  MobileNumber: string = "";
  ReceiptDate: any = new Date().toISOString();

  // Uploads
  ReceiptUrls: any = [];
  ReceiptLoaded: boolean = false;
  ReceiptUrl: string = "../assets/imgs/no-preview.png";

  CanShowMore: boolean = false;
  ShowMoreIcon: string = "chevron-down-outline";

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public camera: Camera, public popCtrl: PopoverController, public mCtrl: ModalController, public asCtrl: ActionSheetController ) 
  {
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  ngOnInit() 
  {
    
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async ProcessInvoice()
  {
    // Reset
    this.auth.ClaimInformationConfirmed = false;

    if ( !await this.Valid() )
    {
      return;
    }

    this.ConfirmClaimInformation();
  }

  async ConfirmClaimInformation()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: FastfoodconfirmclaimComponent
    });

    pop.onDidDismiss().then( (r) => 
    {
      if ( this.auth.ClaimInformationConfirmed )
      {
        this.SubmitInvoice();
      }
    });

    return await pop.present();
  }

  async SubmitInvoice()
  {
    this.auth.RefreshHistory = true;
    
    var receipt = this.Construct();

    await this.auth.SubmitInvoice( receipt, "Sending receipt details.." );

    if ( this.auth.InvoiceResult != undefined && this.auth.InvoiceResult.ResponseCode == 1 )
    {
      // Update Receipt snapshot
      /*if ( this.ReceiptLoaded )
      {
        await this.auth.UploadReceipt( this.auth.CheckInResult.DRReference, this.ReceiptUrl, "file", "receipturl.jpg", "image/jpeg", "Uploading receipt snapshot.." );
      }*/

      this.auth.ClaimSubmitted = true;

      this.auth.Claims = [];

      await this.auth.GetSubmittedClaims( "", this.auth.VoucherDeal.TradingPartnerId, true );

      this.navCtrl.navigateBack( "fastfooddetails" ).then( r =>
      {
        this.navCtrl.navigateForward( "fastfoodhistory" );
      } );
    }
    else if ( this.auth.InvoiceResult != undefined  && this.auth.InvoiceResult.Description != "" )
    {
      this.auth.ClaimSubmitted = false;
      
      this.auth.ShowMessage( "Error", this.auth.InvoiceResult.Description );
    }
  }
  
  private Construct()
  {
    var d = `${this.ReceiptDate}`.replace( '+02:00', '' );

    var receipt =`DinnerDate=${d}&TransactionDate=${d}&Amount=${this.ReceiptTotal}&DRReference=${this.auth.CheckInResult.DRReference}&CampaignCode=${this.auth.CheckInResult.CampaignCode}&RestaurantName=${this.auth.CheckInResult.Restaurant.Name}&RestaurantId=${this.auth.CheckInResult.Restaurant.Id}&RestaurantArea=${this.auth.CheckInResult.Restaurant.Suburb}&PaymentReference=${this.auth.CheckInResult.DRReference}&UniqueCustomerKey=${this.auth.CheckInResult.Member.MembershipNo}&IdNumber=${this.auth.CheckInResult.Member.Identification}`;

    if ( this.ReceiptUrls.length > 0 )
    {
      for ( var i = 0; i < this.ReceiptUrls.length; i++ )
      {
        receipt += `&Invoices[${i}].Page=${i + 1}&Invoices[${i}].Base64Image=${this.ReceiptUrls[i]}`;
      }
    }
    else
    {
      receipt += `&Invoices[0].Page=1&Invoices[0].Base64Image=xxx`;
    }

    return receipt;
  }

  async Valid()
  {
    // Required inputs
    if ( typeof( this.ReceiptDate ) == 'undefined' || typeof( this.ReceiptTotal ) == 'undefined' || this.MobileNumber == "" )
    {
      this.auth.ShowError( "Please complete all required '*' inputs" );

      return false;
    }

    if ( this.MobileNumber.toLowerCase().trim() != this.auth.CurrentUser.Cell.toLowerCase().trim() )
    {
      this.auth.ShowError( "The Mobile Number entered do not match your account details. Provide correct details and try again." );

      return false;
    }

    // 6. Receipt loaded?
    if ( this.ReceiptUrls.length <= 0 )
    {
      this.auth.ShowError( "We need at least 1 Receipt Snapshot! Take/Choose one so we can proceed. " );

      return false;
    }

    // 1. Check entered receipt date is greater than Check-in date
    var rdate = new Date( this.ReceiptDate );
    var cdate = new Date( this.auth.CheckInResult.CreatedOn );

    if ( cdate > rdate )
    {
      this.auth.ShowMessage( "Dining Claim", "You are trying to submit a dining claim with a receipt date order than the activation date. Please submit a claim with a valid date." );

      return false;
    }

    // 2. Check receipt date is within 24 hours of check-in date
    var hours = Math.abs( rdate.getTime() - cdate.getTime() ) / 36e5;

    if ( hours > this.auth.CurrentUser.SystemConfig.MaxHoursToSubmitClaim )
    {
      this.auth.ShowMessage( "Dining Claim", "You are trying to submit a dining claim with an invalid date. Please submit a claim with a valid date." );

      return false;
    }

    // 3. Calculate refund total for this month
    await this.auth.GetMonthRefundTotal();

    if ( this.auth.Calculation == undefined || ( this.auth.Calculation != undefined && this.auth.Calculation.ResponseCode != 1 ) )
    {
      this.auth.ShowError( `Failed to get your total monthly approved dining claim submissions because: ${this.auth.Calculation.Description}` );

      return false;
    }

    if ( this.auth.Calculation.Number >= this.auth.CurrentUser.SystemConfig.MaxClaimTotalPerMonth )
    {
      this.auth.ShowMessage( "Dining Claim", `You have reached your maximum of ${this.auth.CurrentUser.SystemConfig.MaxClaimTotalPerMonth} approved dining claim submissions for the month.` );

      return false;
    }

    // 3. Calculate refund total for this month
    /*await this.auth.GetMonthRefundSum();

    if ( this.auth.Calculation == undefined || ( this.auth.Calculation != undefined && this.auth.Calculation.ResponseCode != 1 ) )
    {
      this.auth.ShowError( `Failed to get your total monthly approved dining claim submissions because: ${this.auth.Calculation.Description}` );

      return false;
    }

    if ( this.auth.Calculation.Number >= this.auth.CurrentUser.SystemConfig.MaxClaimSumPerMonth )
    {
      this.auth.ShowMessage( "Dining Claim", `You have reached your maximum of R${this.auth.CurrentUser.SystemConfig.MaxClaimSumPerMonth} approved dining claim submissions for the month.` );

      return false;
    }

    // 4. Calculate refund total for today
    await this.auth.GetDayRefundTotal();

    if ( this.auth.Calculation == undefined || ( this.auth.Calculation != undefined && this.auth.Calculation.ResponseCode != 1 ) )
    {
      this.auth.ShowError( `Failed to get your total daily claim submissions because: ${this.auth.Calculation.Description}` );

      return false;
    }

    if ( this.auth.Calculation.Number >= this.auth.CurrentUser.SystemConfig.MaxClaimTotalPerDay )
    {
      this.auth.ShowMessage( "Dining Claim", `You have reached your maximum of ${this.auth.CurrentUser.SystemConfig.MaxClaimTotalPerDay} dining claim submissions for the day.` );

      return false;
    }*/

    return true;
  }

  UploadDocument( source: any )
  {
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: source
    };
    
    this.camera.getPicture( options ).then( ( imageData ) =>
    {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL): 

      this.ReceiptUrl = 'data:image/jpeg;base64,' + imageData;
      this.ReceiptLoaded = true;

      this.ReceiptUrls.push( 'data:image/jpeg;base64,' + imageData );
    }, ( err ) =>
    {
      this.ReceiptLoaded = false;

     this.auth.ShowError( JSON.stringify( err ) );
    });
  }

  async PresentPhotoOptions()
  {
    const acc = await this.asCtrl.create
    ({
      buttons: [{
        text: 'Take Photo',
        icon: 'camera',
        handler: () =>
        {
          acc.dismiss();

          this.UploadDocument( 1 );
        }
      },{
        text: 'Choose Photo',
        icon: 'images',
        handler: () =>
        {
          acc.dismiss();

          this.UploadDocument( 0 );
        }
      },{ 
        icon: 'close',
        text: 'Cancel', 
        role: 'cancel' 
      }]
    });

    await acc.present();
  }

  Back()
  {
    this.navCtrl.back();
  }

  DeletePhoto( i: number )
  {
    this.ReceiptUrls.splice( i, 1 );
  }
}
