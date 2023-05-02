import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { ViraldealconfirmComponent } from '../viraldealconfirm/viraldealconfirm.component';

@Component({
  selector: 'app-viraldealdetails',
  templateUrl: './viraldealdetails.page.html',
  styleUrls: ['./viraldealdetails.page.scss'],
})
export class ViraldealdetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Amount: number = 0;

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
    
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async PurchaseVoucher()
  {
    this.auth.DealPaymentMethod = 3;
    this.auth.DealAmount = ( this.Amount > 0 ) ? this.Amount : this.auth.VoucherDeal.Amounts[ 0 ];

    await this.auth.PurchaseVoucherDeal( true );

    if ( this.auth.DealResult != undefined && this.auth.DealResult.Code == 2 )
    {
      this.navCtrl.navigateRoot( "home" ).then( r =>
      {
        this.navCtrl.navigateForward( "voucherhistorydetails" );
      } );
    }
    else if ( this.auth.DealResult != undefined  && this.auth.DealResult.Message != "" )
    {
      this.auth.ShowMessage( "", this.auth.DealResult.Message );
    }
    else
    {
      this.auth.ShowMessage( "", "We could not allocate a voucher at the moment. Please try again later." );
    }
  }

  Validate()
  {
    if ( this.auth.VoucherDeal.Amounts && this.auth.VoucherDeal.Amounts.length > 1 && this.Amount == 0 )
    {
      this.auth.ShowError( "Please select an amount." );

      return false;
    }
    
    return true;
  }

  async Confirm()
  {
    if ( !this.Validate() )
    {
      return;
    }

    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: ViraldealconfirmComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.Proceed )
      {
        this.PurchaseVoucher();
      }
      else if ( this.auth.GoToForm )
      {
        this.GoToForm( this.auth.VoucherDeal.FormUrl );
      }
    } );

    return await pop.present();
  }

  async GoToForm( url: string )
  {
    try
    {
      let browser = this.iab.create( url, "_blank", { location: 'no', zoom: 'no' } );

      browser.on( 'loadstop' ).subscribe( event => 
      {
          this.auth.InAppBrowserUrl = event.url;

          if ( event.url.toLowerCase().includes( '/checkout/order-received/'.toLowerCase() ) )
          {
            browser.close();
          }
      } );

      browser.on( 'exit' ).subscribe( event => 
      {
        this.navCtrl.navigateForward( "voucherformsuccess" );
      } );
    }
    catch( error )
    {
      this.auth.ShowError( JSON.stringify( error ) );
    }
  }
}
