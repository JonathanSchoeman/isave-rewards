import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CouponwicodepaymentsuccessPage } from './couponwicodepaymentsuccess.page';

describe('CouponwicodepaymentsuccessPage', () => {
  let component: CouponwicodepaymentsuccessPage;
  let fixture: ComponentFixture<CouponwicodepaymentsuccessPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponwicodepaymentsuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CouponwicodepaymentsuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
