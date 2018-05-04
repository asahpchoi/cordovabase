import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsampleComponent } from './dialogsample.component';

describe('DialogsampleComponent', () => {
  let component: DialogsampleComponent;
  let fixture: ComponentFixture<DialogsampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogsampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
