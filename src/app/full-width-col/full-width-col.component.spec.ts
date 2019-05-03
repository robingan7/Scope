import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { fullWidthCellRenderer } from './full-width-col.component';

describe('FullWidthColComponent', () => {
  let component: fullWidthCellRenderer;
  let fixture: ComponentFixture<fullWidthCellRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [fullWidthCellRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(fullWidthCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
