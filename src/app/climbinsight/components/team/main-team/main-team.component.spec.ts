import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTeamComponent } from './main-team.component';

describe('MainTeamComponent', () => {
  let component: MainTeamComponent;
  let fixture: ComponentFixture<MainTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
