import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePluginComponent } from './create-plugin.component';

describe('CreatePluginComponent', () => {
  let component: CreatePluginComponent;
  let fixture: ComponentFixture<CreatePluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
