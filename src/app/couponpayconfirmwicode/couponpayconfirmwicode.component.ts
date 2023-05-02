import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponpayconfirmwicode',
  templateUrl: './couponpayconfirmwicode.component.html',
  styleUrls: ['./couponpayconfirmwicode.component.scss'],
})
export class CouponpayconfirmwicodeComponent implements OnInit
{

  constructor( public auth: UserService, public popCtrl: PopoverController )
  {

  }

  ngOnInit()
  {
  }

  async Continue()
  {
    this.auth.Proceed = true;

    this.popCtrl.dismiss();
  }

  async Edit()
  {
    this.auth.Proceed = false;

    this.popCtrl.dismiss();
  }

}
