import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoniaFormComponent } from './colonia-form.component';

describe('ColoniaFormComponent', () => {
  let component: ColoniaFormComponent;
  let fixture: ComponentFixture<ColoniaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoniaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoniaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
