import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { FastfoodstoreconfirmComponent } from '../fastfoodstoreconfirm/fastfoodstoreconfirm.component';

@Component({
  selector: 'app-fastfoodstores',
  templateUrl: './fastfoodstores.page.html',
  styleUrls: ['./fastfoodstores.page.scss'],
})
export class FastfoodstoresPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Town: string = "";
  Region: string = "";
  Restaurants: any = [];

  Skip: number = 0;
  Query: string = "";

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
    await this.GetRestaurants();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async GetRestaurants()
  {
    var res = await this.auth.GetRestaurants( this.Query, this.auth.VoucherDeal.TradingPartnerId, true );

    var useRestaurants = this.auth.Restaurants;

    if ( this.Query != "" )
    {
      useRestaurants = res;
    }

    if ( res != undefined && res.length > this.Restaurants.length )
    {
      res = [];

      var c = this.auth.Take;

      for ( var i = this.Skip; i <= useRestaurants.length; i++ )
      {
        if ( c <= 0 )
        {
          break;
        }

        c--;

        res.push( useRestaurants[ i ] );
      }

      this.Skip += res.length;
  
      this.Restaurants = this.Restaurants.concat( res );
    }
  }

  async OnSelectRestaurant( id:any )
  {
    var i = this.auth.Restaurants.findIndex( (r: { Id: any; }) => r.Id == id );

    this.auth.Restaurant = this.auth.Restaurants[ i ];

    this.auth.GoToMap = 
    this.auth.GoToClaim = 
    this.auth.RefreshClaims = 
    this.auth.ActivateDiscount = 
    this.auth.ActivateDiscountConfirmed = false;

    const pop = await this.popCtrl.create
    ( {
      translucent: true,
      backdropDismiss: false,
      component: FastfoodstoreconfirmComponent
    } );

    pop.onDidDismiss().then( (r) => 
    {
      if ( this.auth.GoToClaim )
      {
        this.GoToClaim();
      }
      else if ( this.auth.GoToMap )
      {
        this.OnGoToMap();
      }
    } );

    return await pop.present();
  }

  async GoToClaim()
  {
    // Check in
      await this.auth.CheckIn();

    this.navCtrl.navigateForward( "fastfoodclaim" );
  }

  async OnGoToMap()
  {
    // user address
    /*var destination = this.auth.MakeRestaurantAddress( this.auth.Restaurant );
    var start = this.auth.MakeUserAddress( this.auth.CurrentUser.Addresses[ 0 ] );

    console.log( "Start: " + start );
    console.log( "Destination: " + destination );

    let options: LaunchNavigatorOptions = 
    {
      start: start
    };

    this.launcher.navigate( destination, options ).then
    (
      success =>
      {
        //console.log( "Launched navigator" );
      },
      error =>
      {
        this.auth.ShowMessage( "Navigate To", "Error launching your selected Maps Application because: " + JSON.stringify( error ));
      }
    );*/
  }

  async LoadData( event:any )
  {
    await this.GetRestaurants();

    event.target.complete();
  }

  async Search()
  {
    this.Skip = 0;
    this.Restaurants = [];

    await this.GetRestaurants();
  }

  async Refresh( refresher: any )
  {
    this.auth.Restaurants = [];
    
    await this.GetRestaurants();
    
    refresher.target.complete();
  }
}
