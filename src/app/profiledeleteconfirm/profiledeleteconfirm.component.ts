import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profiledeleteconfirm',
  templateUrl: './profiledeleteconfirm.component.html',
  styleUrls: ['./profiledeleteconfirm.component.scss'],
})
export class ProfiledeleteconfirmComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {

  }

  ngOnInit()
  {
  }

  async Yes()
  {
    this.auth.Proceed = true;

    this.popCtrl.dismiss();
  }

  async No()
  {
    this.auth.Proceed = false;

    this.popCtrl.dismiss();
  }

}
