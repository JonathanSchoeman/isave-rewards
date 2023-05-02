import { Component, OnInit, ViewEncapsulation,  } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponcodes',
  templateUrl: './couponcodes.component.html',
  styleUrls: ['./couponcodes.component.scss'],
})
export class CouponcodesComponent implements OnInit
{
  ShowNext: boolean = false;
  ShowDone: boolean = false;
  ShowPrevious: boolean = false;

  Coupon: any;

  constructor( public auth: UserService, public popCtrl: PopoverController )
  {

  }

  ngOnInit()
  {
    this.Display();
  }

  Display()
  {
    this.Coupon = this.auth.CouponDeal[ this.auth.CouponIndex ];

    if ( this.auth.CouponIndex == 0 && this.auth.CouponDeal.length == 1 )
    {
      this.ShowDone = true;

      this.ShowNext = this.ShowPrevious = false;
    }
    else if ( this.auth.CouponIndex == 0 && this.auth.CouponDeal.length > 1 )
    {
      this.ShowNext = true;

      this.ShowDone = this.ShowPrevious = false;
    }
    else if ( this.auth.CouponIndex > 0 && this.auth.CouponDeal.length > 1 && this.auth.CouponIndex != ( this.auth.CouponDeal.length - 1 ) )
    {
      this.ShowDone = false;

      this.ShowNext = this.ShowPrevious = true;
    }
    else if ( this.auth.CouponIndex == ( this.auth.CouponDeal.length - 1 ) )
    {
      this.ShowNext = false;

      this.ShowDone = this.ShowPrevious = true;
    }
    else if ( this.auth.CouponIndex != ( this.auth.CouponDeal.length - 1 ) )
    {
      this.ShowNext = false;

      this.ShowDone = this.ShowPrevious = true;
    }
  }

  async Next()
  {
    this.auth.CouponIndex += 1;

    this.Display();
  }

  async Previous()
  {
    this.auth.CouponIndex -= 1;

    this.Display();
  }

  async Done()
  {
    this.popCtrl.dismiss();
  }

}
