import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {

  constructor( public popCtrl: PopoverController, public nav: NavParams )
  {
    
  }

  ngOnInit()
  {

  }

  async Call()
  {
    this.popCtrl.dismiss( 1 );
  }

  async Cancel()
  {
    this.popCtrl.dismiss( 0 );
  }

}
