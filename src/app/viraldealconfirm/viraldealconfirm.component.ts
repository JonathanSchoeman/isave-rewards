import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-viraldealconfirm',
  templateUrl: './viraldealconfirm.component.html',
  styleUrls: ['./viraldealconfirm.component.scss'],
})
export class ViraldealconfirmComponent implements OnInit
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
    this.auth.GoToForm = false;

    this.popCtrl.dismiss();
  }

  async GoToForm()
  {
    this.auth.GoToForm = true;
    this.auth.Proceed = false;

    this.popCtrl.dismiss();
  }

  async Cancel()
  {
    this.auth.Proceed = false;

    this.popCtrl.dismiss();
  }
}
