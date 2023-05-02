import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.scss'],
})
export class SendsmsComponent implements OnInit
{

  constructor( public auth: UserService, public popCtrl: PopoverController, public nav: NavParams )
  {

  }

  ngOnInit()
  {

  }


  async NotNow()
  {
    this.auth.Proceed = false;
    
    await this.popCtrl.dismiss();
  }

  async Send()
  {
    this.auth.Proceed = true;

    await this.popCtrl.dismiss();
  }
}
