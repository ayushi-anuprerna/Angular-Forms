import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2 } from './level-2';

describe('Level2', () => {
  let component: Level2;
  let fixture: ComponentFixture<Level2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Level2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
