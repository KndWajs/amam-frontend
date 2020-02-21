import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuParametersComponent } from './create-menu-parameters.component';

describe('CreateMenuParametersComponent', () => {
  let component: CreateMenuParametersComponent;
  let fixture: ComponentFixture<CreateMenuParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMenuParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMenuParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
