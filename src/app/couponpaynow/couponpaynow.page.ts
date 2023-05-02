import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { CouponpayconfirmComponent } from '../couponpayconfirm/couponpayconfirm.component';
import { CouponpayconfirmwicodeComponent } from '../couponpayconfirmwicode/couponpayconfirmwicode.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponpaynow',
  templateUrl: './couponpaynow.page.html',
  styleUrls: ['./couponpaynow.page.scss'],
})
export class CouponpaynowPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  CartCount: number = 0;
  CartSaving: number = 0;

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
    this.UpdateCart();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  ionViewDidEnter()
  {
    if ( this.auth.CouponShoppingCart == undefined || this.auth.CouponShoppingCart.length <= 0 ) return;

    this.CartCount = this.CartSaving = 0;

    for ( var i = 0; i < this.auth.CouponShoppingCart.length; i++ )
    {
      this.CartCount += this.auth.CouponShoppingCart[ i ].CouponsInCart;
      this.CartSaving += this.auth.CouponShoppingCart[ i ].CouponsInCart * this.auth.CouponShoppingCart[ i ].DiscountSingle;
    }
  }

  async UpdateCart()
  {
    this.auth.UpdateCouponCart();
  }

  async Redeem()
  {
    await this.auth.PurchaseCouponDeal();

    if ( this.auth.DealResult != undefined && this.auth.DealResult.Code == 1 )
    {
      this.CartCount = this.CartSaving = 0;

      this.auth.Coupon = this.auth.DealResult;

      this.auth.RefreshCoupons = true;

      this.auth.LoadCoupons( false );

      if ( this.auth.CouponDeal.HasWiCode )
      {
        this.navCtrl.navigateForward( "couponwicodepaymentsuccess" );
      }
      else
      {
        this.navCtrl.navigateForward( "couponpaymentsuccess" );
      }
    }
    else if ( this.auth.DealResult != undefined  && this.auth.DealResult.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.DealResult.Message );
    }
  }

  async Confirm()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: CouponpayconfirmComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.Proceed )
      {
        this.Redeem();
      }
    } ); 

    return await pop.present();
  }

  async ConfirmWiCode()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: CouponpayconfirmwicodeComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.Proceed )
      {
        this.Redeem();
      }
      else
      {
        this.navCtrl.back();
      }
    } ); 

    return await pop.present();
  }

  PayNow()
  {
    if ( this.auth.CouponDeal.HasWiCode )
    {
      this.ConfirmWiCode();
    }
    else
    {
      this.Confirm();
    }
  }
}
