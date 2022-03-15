import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charts1Component } from './charts1.component';

describe('Charts1Component', () => {
  let component: Charts1Component;
  let fixture: ComponentFixture<Charts1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charts1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Charts1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
