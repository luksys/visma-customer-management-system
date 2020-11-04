import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content404Component } from './content-404.component';

describe('Content404Component', () => {
  let component: Content404Component;
  let fixture: ComponentFixture<Content404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
