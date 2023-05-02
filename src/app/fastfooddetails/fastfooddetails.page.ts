import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { FastfoodtncComponent } from '../fastfoodtnc/fastfoodtnc.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfooddetails',
  templateUrl: './fastfooddetails.page.html',
  styleUrls: ['./fastfooddetails.page.scss'],
})
export class FastfooddetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController )
  {
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );

    if ( !this.auth.CurrentUser.DontShowWelcome )
    {
      this.TnC();
    }
  }

  async ngOnInit()
  {
    this.auth.Claims = this.auth.Restaurants = [];

    await this.auth.GetRestaurants( "", this.auth.VoucherDeal.TradingPartnerId, false );
    await this.auth.GetSubmittedClaims( "", this.auth.VoucherDeal.TradingPartnerId, false );
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async TnC()
  {
    var pC = this.popCtrl;

    setTimeout( async function()
    {
      const p = await pC.create
      ({
        translucent: true,
        backdropDismiss: false,
        component: FastfoodtncComponent
      });

      p.onDidDismiss().then( ( r ) => 
      {
        
      });

      return await p.present();

    }, 1000 );
  }

  async Stores()
  {
    this.navCtrl.navigateForward( "fastfoodstores" );
  }

  async Claim()
  {
    this.navCtrl.navigateForward( "fastfoodstores" );
  }

  async History()
  {
    this.navCtrl.navigateForward( "fastfoodhistory" );
  }
}
