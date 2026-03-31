import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1Component } from './level-1';

describe('Level1', () => {
  let component: Level1Component;
  let fixture: ComponentFixture<Level1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Level1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level1Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
