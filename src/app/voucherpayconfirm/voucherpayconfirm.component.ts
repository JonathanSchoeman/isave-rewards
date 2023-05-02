import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-voucherpayconfirm',
  templateUrl: './voucherpayconfirm.component.html',
  styleUrls: ['./voucherpayconfirm.component.scss'],
})
export class VoucherpayconfirmComponent implements OnInit
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
