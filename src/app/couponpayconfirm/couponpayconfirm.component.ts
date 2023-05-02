import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponpayconfirm',
  templateUrl: './couponpayconfirm.component.html',
  styleUrls: ['./couponpayconfirm.component.scss'],
})
export class CouponpayconfirmComponent implements OnInit
{
  CartCount: number = 0;
  CartSaving: number = 0;

  constructor( public auth: UserService, public popCtrl: PopoverController )
  {

  }

  ngOnInit()
  {
    if ( this.auth.CouponShoppingCart == undefined || this.auth.CouponShoppingCart.length <= 0 ) return;

    this.CartCount = this.CartSaving = 0;

    for ( var i = 0; i < this.auth.CouponShoppingCart.length; i++ )
    {
      this.CartCount += this.auth.CouponShoppingCart[ i ].CouponsInCart;
      this.CartSaving += this.auth.CouponShoppingCart[ i ].CouponsInCart * this.auth.CouponShoppingCart[ i ].DiscountSingle;
    }
  }

  async Redeem()
  {
    this.auth.Proceed = true;

    this.popCtrl.dismiss();
  }

  async Cancel()
  {
    this.auth.Proceed = false;

    this.popCtrl.dismiss();
  }

}
