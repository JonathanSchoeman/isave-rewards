import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { CouponcodedetailsComponent } from '../couponcodedetails/couponcodedetails.component';
import { CouponwicodeComponent } from '../couponwicode/couponwicode.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponwicodepaymentsuccess',
  templateUrl: './couponwicodepaymentsuccess.page.html',
  styleUrls: ['./couponwicodepaymentsuccess.page.scss'],
})
export class CouponwicodepaymentsuccessPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;
  
  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController )
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

  async OpenCoupon()
  {
    this.auth.CouponIndex = 0;
    this.auth.CouponDeal = this.auth.Coupons[ 0 ].Coupons;

    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: CouponwicodeComponent
    });

    return await pop.present();
  }

  async ShowCouponDetails( campaignPurchaseId: number )
  {
    var i = this.auth.Coupon.BasketItems.findIndex( (n: { CampaignPurchaseId: number; }) => n.CampaignPurchaseId == campaignPurchaseId );

    this.auth.CouponDeal = this.auth.Coupon.BasketItems[ i ];

    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: CouponcodedetailsComponent
    });

    return await pop.present();
  }

  Coupons()
  {
    // Remove certain pages from the stack

    this.navCtrl.navigateRoot( "home" ).then( r =>
    {
      this.navCtrl.navigateForward( "couponhistory" );
    } );
  }

  Start()
  {
    // Remove certain pages from the stack

    this.navCtrl.navigateRoot( "home" ).then( r =>
    {
      this.navCtrl.navigateForward( "mydeals" );
    } );
  }

}
