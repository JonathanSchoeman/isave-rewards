import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;


  constructor( public auth: UserService )
  {
    
  }

  ngOnInit()
  {
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  OpenWhatsApp( contact: string )
  {
    var cell = contact;

    if ( contact.substring( 0, 2 ) === "26" )
    {
      cell = contact;
    }
    else if ( contact.substring( 0, 2 ) === "27" )
    {
      cell = contact;
    }
    else
    {
      cell = `27${contact}`;
    }

    var link = `https://wa.me/${cell.replace(/ /g, '')}?text=Hi, my name is ${this.auth.CurrentUser.DisplayName} from the iSave Rewards App and would like to ask for assistance, would you be able to assist me further please?`;

    console.log(link);

    this.auth.OpenSystemLink( link );
  }
}
