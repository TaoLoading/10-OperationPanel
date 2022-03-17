import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPluginComponent } from './search-plugin.component';

describe('SearchPluginComponent', () => {
  let component: SearchPluginComponent;
  let fixture: ComponentFixture<SearchPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
