import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nourl',
  templateUrl: './nourl.component.html',
  styleUrls: ['./nourl.component.scss'],
})
export class NourlComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {

  }

  ngOnInit()
  {
  }

  async Ok()
  {
    this.popCtrl.dismiss();
  }
}
