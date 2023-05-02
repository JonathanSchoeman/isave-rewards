import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fastfoodclaimsubmitted',
  templateUrl: './fastfoodclaimsubmitted.component.html',
  styleUrls: ['./fastfoodclaimsubmitted.component.scss'],
})
export class FastfoodclaimsubmittedComponent implements OnInit
{
  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
    
  }

  ngOnInit()
  {

  }

  Ok()
  {
    this.popCtrl.dismiss();
  }
}
