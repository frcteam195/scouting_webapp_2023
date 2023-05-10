import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanInputComponent } from './fan-input.component';

describe('FanInputComponent', () => {
  let component: FanInputComponent;
  let fixture: ComponentFixture<FanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
