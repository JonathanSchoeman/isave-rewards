import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-couponcodedetails',
  templateUrl: './couponcodedetails.component.html',
  styleUrls: ['./couponcodedetails.component.scss'],
})
export class CouponcodedetailsComponent implements OnInit {

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
