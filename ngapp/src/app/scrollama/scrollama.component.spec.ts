import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollamaComponent } from './scrollama.component';

describe('ScrollamaComponent', () => {
  let component: ScrollamaComponent;
  let fixture: ComponentFixture<ScrollamaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
