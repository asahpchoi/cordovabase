import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlinputComponent } from './ulinput.component';

describe('UlinputComponent', () => {
  let component: UlinputComponent;
  let fixture: ComponentFixture<UlinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
