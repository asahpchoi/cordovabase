import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundhistoryComponent } from './fundhistory.component';

describe('FundhistoryComponent', () => {
  let component: FundhistoryComponent;
  let fixture: ComponentFixture<FundhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
