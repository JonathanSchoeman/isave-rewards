import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfoodtnc',
  templateUrl: './fastfoodtnc.component.html',
  styleUrls: ['./fastfoodtnc.component.scss'],
})
export class FastfoodtncComponent implements OnInit
{
  DontShowWelcome: boolean = false;

  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
    
  }

  ngOnInit()
  {

  }

  async Ok()
  {
    this.auth.CurrentUser.DontShowWelcome = this.DontShowWelcome;

    this.auth.DontShowWelcomeAgain( this.DontShowWelcome );

    await this.popCtrl.dismiss();
  }

}
