import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonContent } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.page.html',
  styleUrls: ['./termsandconditions.page.scss'],
  
})
export class TermsandconditionsPage implements OnInit
{

  @ViewChild( IonContent, { static: true } ) content?: IonContent;


  ShowTnC: boolean = true;
  ShowPrivacyPolicy: boolean = false;

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

}
