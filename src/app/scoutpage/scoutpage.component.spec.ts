import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutpageComponent } from './scoutpage.component';

describe('ScoutpageComponent', () => {
  let component: ScoutpageComponent;
  let fixture: ComponentFixture<ScoutpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
