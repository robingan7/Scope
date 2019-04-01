import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutloginComponent } from './scoutlogin.component';

describe('ScoutloginComponent', () => {
  let component: ScoutloginComponent;
  let fixture: ComponentFixture<ScoutloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
