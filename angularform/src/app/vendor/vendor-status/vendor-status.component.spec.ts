import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorStatusComponent } from './vendor-status.component';

describe('VendorStatusComponent', () => {
  let component: VendorStatusComponent;
  let fixture: ComponentFixture<VendorStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
