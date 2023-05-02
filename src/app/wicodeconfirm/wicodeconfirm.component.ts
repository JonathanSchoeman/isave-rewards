import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wicodeconfirm',
  templateUrl: './wicodeconfirm.component.html',
  styleUrls: ['./wicodeconfirm.component.scss'],
})
export class WicodeconfirmComponent implements OnInit
{

  constructor( public auth: UserService, public popCtrl: PopoverController )
  {

  }

  ngOnInit()
  {
  }

  async Confirm()
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
