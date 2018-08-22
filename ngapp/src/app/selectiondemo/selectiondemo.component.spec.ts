import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiondemoComponent } from './selectiondemo.component';

describe('SelectiondemoComponent', () => {
  let component: SelectiondemoComponent;
  let fixture: ComponentFixture<SelectiondemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiondemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiondemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
