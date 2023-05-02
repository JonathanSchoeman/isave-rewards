import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponissueddetails',
  templateUrl: './couponissueddetails.component.html',
  styleUrls: ['./couponissueddetails.component.scss'],
})
export class CouponissueddetailsComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
    
  }

  ngOnInit()
  {
    
  }

  Next()
  {
    this.auth.Proceed = true;

    this.popCtrl.dismiss();
  }
}
