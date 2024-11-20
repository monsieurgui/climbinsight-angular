import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LeagueService } from '../../../services/league.service';
import { League } from '../../../interfaces/league.interface';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-league',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputSwitchModule,
    DividerModule,
    DialogModule
  ],
  templateUrl: './main-league.component.html',
  styleUrl: './main-league.component.scss'
})
export class MainLeagueComponent implements OnInit {
  leagues: League[] = [];
  loading = false;
  error: string | null = null;
  showDeleteDialog = false;
  deleteConfirmStep = 1;
  leagueToDelete: League | null = null;

  constructor(
    private leagueService: LeagueService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadLeagues();
  }

  createLeague(): void {
    this.router.navigate(['/leagues/create']);
  }

  onActiveToggle(event: any, league: League): void {
    event.stopPropagation();
    
    const updatedLeague = { 
      ...league,
      is_active: !league.is_active 
    };

    this.leagueService.updateLeague(league.id, { is_active: updatedLeague.is_active }).subscribe({
      next: (response) => {
        const index = this.leagues.findIndex(l => l.id === league.id);
        if (index !== -1) {
          this.leagues[index] = { ...this.leagues[index], is_active: response.is_active };
        }
      },
      error: (error) => {
        console.error('Error updating league status:', error);
        league.is_active = !league.is_active;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update league status'
        });
      }
    });
  }

  editLeague(id: number): void {
    this.router.navigate([`/leagues/edit/${id}`]);
  }

  confirmDelete(event: Event, league: League): void {
    event.stopPropagation();
    this.leagueToDelete = league;
    this.showDeleteDialog = true;
  }

  private loadLeagues(): void {
    this.loading = true;
    this.error = null;
    
    this.leagueService.getLeagues().subscribe({
      next: (leagues) => {
        this.leagues = leagues.map(league => ({
          ...league,
          is_active: Boolean(league.is_active)
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading leagues:', error);
        this.error = 'Failed to load leagues. Please try again later.';
        this.loading = false;
      }
    });
  }

  viewLeagueDetails(id: number): void {
    this.router.navigate([`/leagues/${id}`]);
  }
}
