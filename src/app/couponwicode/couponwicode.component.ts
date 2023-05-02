import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponwicode',
  templateUrl: './couponwicode.component.html',
  styleUrls: ['./couponwicode.component.scss'],
})
export class CouponwicodeComponent implements OnInit
{
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
    this.Coupon = this.auth.CouponDeal[ 0 ];
  }

  async Done()
  {
    this.popCtrl.dismiss();
  }

}
