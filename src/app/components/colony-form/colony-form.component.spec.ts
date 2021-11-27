import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyFormComponent } from './colony-form.component';

describe('ColonyFormComponent', () => {
  let component: ColonyFormComponent;
  let fixture: ComponentFixture<ColonyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColonyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
