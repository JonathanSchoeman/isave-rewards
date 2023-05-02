import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { CouponcodedetailsComponent } from '../couponcodedetails/couponcodedetails.component';
import { CouponcodesComponent } from '../couponcodes/couponcodes.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponhistorydetails',
  templateUrl: './couponhistorydetails.page.html',
  styleUrls: ['./couponhistorydetails.page.scss'],
})
export class CouponhistorydetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  ShowCouponCodes: boolean = true;
  ShowBasketItems: boolean = false;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController )
  {
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    if ( this.auth.Coupon == undefined )
    {
      this.navCtrl.navigateBack( "couponhistory" );
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

  async OpenCoupon( dRReference: string, issuedCode: string )
  {
    var i1 = this.auth.Coupons.findIndex( (n: { DRReference: string; }) => n.DRReference == dRReference );

    this.auth.CouponIndex = this.auth.Coupons[ i1 ].Coupons.findIndex( (n: { IssuedCode: string; }) => n.IssuedCode == issuedCode );

    this.auth.CouponDeal = this.auth.Coupons[ i1 ].Coupons;

    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: CouponcodesComponent
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
}
