import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponhistory',
  templateUrl: './couponhistory.page.html',
  styleUrls: ['./couponhistory.page.scss'],
})
export class CouponhistoryPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Coupons: any = [];
  CouponStatus: number = -1;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    await this.List();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async List()
  {
    await this.auth.LoadCoupons();

    /*if ( this.auth.Coupons != undefined && this.auth.Coupons.length > 0 && this.auth.CouponDeals != undefined && this.auth.CouponDeals.length > 0 )
    {
      for ( var m = 0; m < this.auth.Coupons.length; m++ )
      {
        for ( var i = 0; i < this.auth.CouponDeals.length; i++ )
        {
          for ( var x = 0; x < this.auth.CouponDeals[ i ].Vendors.length; x++ )
          {
            var vouchers = this.auth.CouponDeals[ i ].Vendors[ x ].Vouchers;

            var z = vouchers.findIndex( n => n.Guid.toLowerCase() == this.auth.Coupons[ m ].VoucherGuid.toLowerCase() );

            if ( z >= 0 ) 
            {
              this.auth.Coupons[ m ].CouponDeal = this.auth.CouponDeals[ i ].Vendors[ x ].Vouchers[ z ];
            }
          }
        }
      }
    }*/

    this.Coupons = this.auth.Coupons;
  }

  async loadData( event:any )
  {
    await this.List();

    event.target.complete();
  }

  async Refresh( refresher: any )
  {
    this.Coupons = this.auth.Coupons = [];

    await this.List();
    
    refresher.target.complete();
  }

  GoToCoupon( dRReference:number )
  {
    var i = this.auth.Coupons.findIndex( (n: { DRReference: number; }) => n.DRReference == dRReference );

    this.auth.Coupon = this.auth.Coupons[ i ];

    if ( this.auth.Coupon.HasWiCode )
    {
      this.navCtrl.navigateForward( "couponhistorywicodedetails" );
    }
    else
    {
      this.navCtrl.navigateForward( "couponhistorydetails" );
    }
  }
}
