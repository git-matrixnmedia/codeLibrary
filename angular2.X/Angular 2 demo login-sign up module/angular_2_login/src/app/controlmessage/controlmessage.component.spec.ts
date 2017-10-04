import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlmessageComponent } from './controlmessage.component';

describe('ControlmessageComponent', () => {
  let component: ControlmessageComponent;
  let fixture: ComponentFixture<ControlmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
