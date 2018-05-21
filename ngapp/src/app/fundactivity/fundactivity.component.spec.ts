import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundactivityComponent } from './fundactivity.component';

describe('FundactivityComponent', () => {
  let component: FundactivityComponent;
  let fixture: ComponentFixture<FundactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
