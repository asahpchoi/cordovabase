import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiderComponent } from './add-rider.component';

describe('AddRiderComponent', () => {
  let component: AddRiderComponent;
  let fixture: ComponentFixture<AddRiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
