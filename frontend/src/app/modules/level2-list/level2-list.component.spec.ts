import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2ListComponent } from './level2-list.component';

describe('Level2ListComponent', () => {
  let component: Level2ListComponent;
  let fixture: ComponentFixture<Level2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
