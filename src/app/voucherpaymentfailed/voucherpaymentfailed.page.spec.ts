import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoucherpaymentfailedPage } from './voucherpaymentfailed.page';

describe('VoucherpaymentfailedPage', () => {
  let component: VoucherpaymentfailedPage;
  let fixture: ComponentFixture<VoucherpaymentfailedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherpaymentfailedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoucherpaymentfailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
