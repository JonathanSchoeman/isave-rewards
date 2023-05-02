import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { EntertainmentpayconfirmComponent } from '../entertainmentpayconfirm/entertainmentpayconfirm.component';
import { UserService } from '../services/user.service';
import { VouchernoamountsComponent } from '../vouchernoamounts/vouchernoamounts.component';

@Component({
  selector: 'app-entertainmentpaynow',
  templateUrl: './entertainmentpaynow.page.html',
  styleUrls: ['./entertainmentpaynow.page.scss'],
})
export class EntertainmentpaynowPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Amount: number = 0;
  PaymentMethod: number = 0;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController, public iab: InAppBrowser )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    if ( !this.auth.VoucherDeal.Amounts.length )
    {
      this.NoAmounts();
    }
  }

  async NoAmounts()
  {
    var pC = this.popCtrl;

    setTimeout( async function()
    {
      const p = await pC.create
      ({
        translucent: true,
        backdropDismiss: true,
        component: VouchernoamountsComponent
      });

      return await p.present();

    }, 500 );
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async PurchaseVoucher()
  {
    this.auth.DealPaymentMethod = this.PaymentMethod;

    await this.auth.PurchaseVoucherDeal();

    if ( this.auth.DealResult != undefined && this.auth.DealResult.Code == 1 )
    {
      return;
    }

    if ( this.auth.DealResult != undefined  && this.auth.DealResult.Message != "" )
    {
      this.auth.ShowMessage( "", this.auth.DealResult.Message );
    }

    return false;
  }

  async Process()
  {
    await this.PurchaseVoucher();

    if ( this.auth.DealResult != undefined && this.auth.DealResult.Code == 1 )
    {
      var url = `${this.auth.APIUrl}/Payment/Begin`;

      var body = `TradingPartnerId=${this.auth.VoucherDeal.TradingPartnerId}&CampaignPurchaseId=${this.auth.DealResult.CampaignPurchaseId}&MemberId=${this.auth.CurrentUser.Member.Id}&CampaignId=${this.auth.VoucherDeal.Id}&Quantity=1&Amount=${this.auth.DealAmount}&Discount=${this.auth.VoucherDeal.CampaignTier.DiscountPercentage}&PaymentMethod=${this.auth.DealPaymentMethod}&AccessToken=${this.auth.APIAuthentication.AccessToken}`;

      try
      {
        var fullurl = `${url}?${body}`;
        
        let browser = this.iab.create( fullurl, "_blank", { location: 'no', zoom: 'no' } );

        browser.on( 'loadstop' ).subscribe( event => 
        {
            this.auth.InAppBrowserUrl = event.url;

            //this.auth.UpdateInAppBrowserUrl( event.url );

            if ( event.url.toLowerCase().includes( '/payment/complete'.toLowerCase() ) || event.url.toLowerCase().includes( '/payment/decline'.toLowerCase() ) )
            {
              browser.close();
            }
        } );

        browser.on( 'exit' ).subscribe( event => 
        {
            this.CheckPaymentStatus();
        } );
      }
      catch( error )
      {
        this.auth.ShowError( JSON.stringify( error ) );
      }
    }
  }

  async CheckPaymentStatus()
  {
    await this.auth.CheckVoucherPaymentStatus();

    if ( this.auth.PaymentResult != undefined && this.auth.PaymentResult.Code == 1 )
    {
      this.auth.VoucherDeal = undefined;

      this.auth.DealAmount = this.auth.DealPaymentMethod = 0;

      this.auth.RefreshVouchers = true;

      this.navCtrl.navigateForward( "entertainmentpaymentsuccess" );
    }
    else if ( this.auth.PaymentResult != undefined && this.auth.PaymentResult.Code == 0 )
    {
      this.navCtrl.navigateForward( "entertainmentpaymentfailed" );
    }
  }

  Validate()
  {
    if ( this.Amount == 0 )
    {
      this.auth.ShowError( "Please select an amount." );

      return;
    }
    if ( this.PaymentMethod == 0 )
    {
      this.auth.ShowError( "Please select a Payment Method." );

      return;
    }

    this.auth.DealAmount = this.Amount;
    this.auth.DealPaymentMethod = this.PaymentMethod;

    var disc = 0;

    if ( this.auth.VoucherDeal.CampaignTier.DiscountPercentage > 0 )
    {
      // Calculate discount
      disc = ( this.auth.VoucherDeal.CampaignTier.DiscountPercentage / 100 ) * this.auth.DealAmount;
    }

    this.auth.DealDiscountedAmount = this.auth.DealAmount - disc;

    this.Confirm();
  }

  async Confirm()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: EntertainmentpayconfirmComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.Proceed )
      {
        this.Process();
      }
    } );

    return await pop.present();
  }
}
