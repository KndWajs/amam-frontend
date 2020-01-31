import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSearchMealComponent } from './quick-search-meal.component';

describe('QuickSearchMealComponent', () => {
  let component: QuickSearchMealComponent;
  let fixture: ComponentFixture<QuickSearchMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSearchMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
