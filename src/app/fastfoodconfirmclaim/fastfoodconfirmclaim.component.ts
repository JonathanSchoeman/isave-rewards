import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfoodconfirmclaim',
  templateUrl: './fastfoodconfirmclaim.component.html',
  styleUrls: ['./fastfoodconfirmclaim.component.scss'],
})
export class FastfoodconfirmclaimComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
    
  }

  ngOnInit()
  {

  }

  Confirm()
  {
    this.auth.ClaimInformationConfirmed = true;

    this.popCtrl.dismiss();
  }

  Edit()
  {
    this.auth.ClaimInformationConfirmed = false;

    this.popCtrl.dismiss();
  }
}
