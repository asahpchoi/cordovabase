import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRidersComponent } from './add-riders.component';

describe('AddRidersComponent', () => {
  let component: AddRidersComponent;
  let fixture: ComponentFixture<AddRidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
