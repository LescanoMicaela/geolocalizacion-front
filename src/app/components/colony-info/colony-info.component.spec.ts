import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyInfoComponent } from './colony-info.component';

describe('ColonyInfoComponent', () => {
  let component: ColonyInfoComponent;
  let fixture: ComponentFixture<ColonyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColonyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
