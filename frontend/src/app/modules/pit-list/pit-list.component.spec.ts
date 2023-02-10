import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitListComponent } from './pit-list.component';

describe('PitListComponent', () => {
  let component: PitListComponent;
  let fixture: ComponentFixture<PitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
