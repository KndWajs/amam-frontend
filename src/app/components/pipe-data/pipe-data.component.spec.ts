import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeDataComponent } from './pipe-data.component';

describe('PipeDataComponent', () => {
  let component: PipeDataComponent;
  let fixture: ComponentFixture<PipeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
