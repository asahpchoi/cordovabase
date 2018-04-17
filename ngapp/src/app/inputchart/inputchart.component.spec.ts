import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputchartComponent } from './inputchart.component';

describe('InputchartComponent', () => {
  let component: InputchartComponent;
  let fixture: ComponentFixture<InputchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
