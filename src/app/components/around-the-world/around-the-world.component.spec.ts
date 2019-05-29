import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AroundTheWorldComponent } from './around-the-world.component';

describe('AroundTheWorldComponent', () => {
  let component: AroundTheWorldComponent;
  let fixture: ComponentFixture<AroundTheWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AroundTheWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AroundTheWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
