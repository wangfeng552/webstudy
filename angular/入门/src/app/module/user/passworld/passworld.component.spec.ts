import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassworldComponent } from './passworld.component';

describe('PassworldComponent', () => {
  let component: PassworldComponent;
  let fixture: ComponentFixture<PassworldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassworldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
