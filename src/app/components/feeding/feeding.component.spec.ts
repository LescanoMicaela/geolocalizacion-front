import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingnComponent } from './feeding.component';

describe('AlimentacionComponent', () => {
  let component: FeedingnComponent;
  let fixture: ComponentFixture<FeedingnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedingnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
