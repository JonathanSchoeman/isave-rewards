import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vouchernoamounts',
  templateUrl: './vouchernoamounts.component.html',
  styleUrls: ['./vouchernoamounts.component.scss'],
})
export class VouchernoamountsComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
  }

  async ngOnInit()
  {
  }

  async Ok()
  {
    this.popCtrl.dismiss();
  }
}
