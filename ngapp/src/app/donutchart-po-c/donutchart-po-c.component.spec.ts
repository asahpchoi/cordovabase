import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutchartPoCComponent } from './donutchart-po-c.component';

describe('DonutchartPoCComponent', () => {
  let component: DonutchartPoCComponent;
  let fixture: ComponentFixture<DonutchartPoCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutchartPoCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutchartPoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
