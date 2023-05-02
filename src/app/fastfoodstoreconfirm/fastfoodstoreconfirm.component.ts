import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfoodstoreconfirm',
  templateUrl: './fastfoodstoreconfirm.component.html',
  styleUrls: ['./fastfoodstoreconfirm.component.scss'],
})
export class FastfoodstoreconfirmComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
    
  }

  ngOnInit()
  {

  }

  async NotNow()
  {
    await this.popCtrl.dismiss();
  }

  async CallNow( number: string )
  {
    await this.popCtrl.dismiss();

    await this.auth.OnShowContact( number );
  }

  async NavigateTo()
  {
    this.auth.GoToMap = true;

    await this.popCtrl.dismiss();
  }

  async StartClaim()
  {
    this.auth.GoToClaim = true;

    await this.popCtrl.dismiss();
  }
}
