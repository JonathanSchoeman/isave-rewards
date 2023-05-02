import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { FastfoodclaimsubmittedComponent } from '../fastfoodclaimsubmitted/fastfoodclaimsubmitted.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfoodhistory',
  templateUrl: './fastfoodhistory.page.html',
  styleUrls: ['./fastfoodhistory.page.scss'],
})
export class FastfoodhistoryPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Skip: number = 0;
  Query: string = "";
  Claims: any = [];

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController ) 
  {
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    await this.GetSubmittedClaims();

    if ( this.auth.ClaimSubmitted )
    {
      this.auth.ClaimSubmitted = false;

      this.ShowClaimSubmitted();
    }
  }

  async ShowClaimSubmitted()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: true,
      component: FastfoodclaimsubmittedComponent
    });

    return await pop.present();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async GetSubmittedClaims()
  {
    if ( this.auth.RefreshHistory )
    {
      this.auth.RefreshHistory = false;
      this.auth.Claims = this.Claims = [];
    }

    var claims = await this.auth.GetSubmittedClaims( this.Query, this.auth.VoucherDeal.TradingPartnerId, true );

    var useClaims = this.auth.Claims;

    if ( this.Query != "" )
    {
      useClaims = claims;
    }

    if ( claims != undefined && claims.length > this.Claims.length )
    {
      claims = [];

      var c = this.auth.Take;

      for ( var i = this.Skip; i <= useClaims.length; i++ )
      {
        if ( c <= 0 )
        {
          break;
        }

        c--;

        claims.push( useClaims[ i ] );
      }

      this.Skip += claims.length;
  
      this.Claims = this.Claims.concat( claims );
    }
  }

  async LoadData( event:any )
  {
    await this.GetSubmittedClaims();

    event.target.complete();
  }

  async Search()
  {
    this.Skip = 0;
    this.Claims = [];

    await this.GetSubmittedClaims();
  }

  async Refresh( refresher: any )
  {
    this.auth.RefreshHistory = true;
    
    await this.GetSubmittedClaims();
    
    refresher.target.complete();
  }
}
