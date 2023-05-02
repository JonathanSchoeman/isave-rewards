import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { ContactusComponent } from '../contactus/contactus.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-assistmedetails',
  templateUrl: './assistmedetails.page.html',
  styleUrls: ['./assistmedetails.page.scss'],
})
export class AssistmedetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController, public iab: InAppBrowser )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async CallNow( contact: string )
  {
    contact = contact.replace( "<p>", "" ).replace( "</p>", "" );

    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: ContactusComponent,
      componentProps: { ContactNumber: contact }
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( r.data == 1 )
      {
        this.auth.callNumber.callNumber( contact, true )
        .then(res => console.log('Launched dialer!', res))
        .catch(err => this.auth.ShowError('Error launching dialer' + JSON.stringify( err )));
      }
    });

    return await pop.present();
  }
}
