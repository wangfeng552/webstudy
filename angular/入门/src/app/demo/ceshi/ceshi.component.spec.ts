import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeshiComponent } from './ceshi.component';

describe('CeshiComponent', () => {
  let component: CeshiComponent;
  let fixture: ComponentFixture<CeshiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeshiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
