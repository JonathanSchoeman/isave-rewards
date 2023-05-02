import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-entertainmentpayconfirm',
  templateUrl: './entertainmentpayconfirm.component.html',
  styleUrls: ['./entertainmentpayconfirm.component.scss'],
})
export class EntertainmentpayconfirmComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
  }

  async ngOnInit()
  {
  }

  async Continue()
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
