import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSearchShoppingElementComponent } from './quick-search-shopping-element.component';

describe('QuickSearchShoppingElementComponent', () => {
  let component: QuickSearchShoppingElementComponent;
  let fixture: ComponentFixture<QuickSearchShoppingElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSearchShoppingElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchShoppingElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
