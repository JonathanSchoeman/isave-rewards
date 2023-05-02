import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, AlertController, IonContent } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Skip: number = 0;
  Query: string = "";
  Claims: any = [];

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public alertCtrl: AlertController, public auth: UserService ) 
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

    var claims = await this.auth.GetSubmittedClaims( this.Query );

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

  async loadData( event:any )
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
    this.Claims = this.auth.Claims = [];

    await this.GetSubmittedClaims();
    
    refresher.target.complete();
  }

  async GoToClaim( id: number )
  {
    var i = this.auth.Claims.findIndex( (c: { Id: number; }) => c.Id == id );

    this.auth.Claim = this.auth.Claims[ i ];

    this.navCtrl.navigateForward( "claimdetail" );
  }

  async ShowMessage( title:string, message:string ) 
  {
    let alert = await this.alertCtrl.create(
    {
      header: title,
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async GoToPage( page:string )
  {
    if ( page == 'home' )
    {
      this.navCtrl.navigateRoot( page );
    }
    else
    {
      this.navCtrl.navigateForward( page );
    }
  }

}
