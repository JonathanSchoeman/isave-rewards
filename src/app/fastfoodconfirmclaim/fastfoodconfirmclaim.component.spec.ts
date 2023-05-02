import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FastfoodconfirmclaimComponent } from './fastfoodconfirmclaim.component';

describe('FastfoodconfirmclaimComponent', () => {
  let component: FastfoodconfirmclaimComponent;
  let fixture: ComponentFixture<FastfoodconfirmclaimComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FastfoodconfirmclaimComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FastfoodconfirmclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
