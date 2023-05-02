import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FastfoodclaimsubmittedComponent } from './fastfoodclaimsubmitted.component';

describe('FastfoodclaimsubmittedComponent', () => {
  let component: FastfoodclaimsubmittedComponent;
  let fixture: ComponentFixture<FastfoodclaimsubmittedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FastfoodclaimsubmittedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FastfoodclaimsubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
