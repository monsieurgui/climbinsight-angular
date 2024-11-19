import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompetitionComponent } from './main-competition.component';

describe('MainCompetitionComponent', () => {
  let component: MainCompetitionComponent;
  let fixture: ComponentFixture<MainCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
