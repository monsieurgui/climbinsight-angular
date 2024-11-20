import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { LeagueService } from '../../../services/league.service';
import { League } from '../../../interfaces/league.interface';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditorModule } from 'primeng/editor';
import { RichTextEditorComponent } from '../../shared/rich-text-editor/rich-text-editor.component';
import { RichTextDisplayComponent } from '../../shared/rich-text-display/rich-text-display.component';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-league-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TabViewModule,
    TagModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    ConfirmDialogModule,
    EditorModule,
    RichTextEditorComponent,
    RichTextDisplayComponent,
    InputSwitchModule
  ],
  providers: [ConfirmationService],
  templateUrl: './league-details.component.html',
  styleUrl: './league-details.component.scss'
})
export class LeagueDetailsComponent implements OnInit {
  league: League | null = null;
  loading = false;
  error: string | null = null;
  activeTabIndex = 0;
  editingField: string | null = null;
  tempEditValue: any = null;

  statusOptions = [
    { label: 'Draft', value: 'draft' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Archived', value: 'archived' }
  ];

  categoryOptions = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Youth', value: 'youth' },
    { label: 'Veterans', value: 'veterans' }
  ];

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadLeague(Number(id));
    }
  }

  private loadLeague(id: number): void {
    this.loading = true;
    this.error = null;

    this.leagueService.getLeague(id).subscribe({
      next: (league) => {
        this.league = league;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading league:', error);
        this.error = 'Failed to load league details.';
        this.loading = false;
      }
    });
  }

  getStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      'draft': 'info',
      'active': 'success',
      'completed': 'warning',
      'archived': 'danger'
    };
    return severityMap[status] || 'info';
  }

  goBack(): void {
    this.router.navigate(['/leagues']);
  }

  startEditing(field: string): void {
    this.editingField = field;
    if (field === 'categories') {
      this.tempEditValue = [...(this.league?.categories || [])];
    } else {
      this.tempEditValue = this.league ? {...this.league}[field] : null;
    }
  }

  cancelEdit(): void {
    this.editingField = null;
    this.tempEditValue = null;
  }

  saveEdit(field: string): void {
    if (!this.league) return;
    
    const updateData = { [field]: this.tempEditValue };
    
    this.leagueService.updateLeague(this.league.id, updateData).subscribe({
      next: (updatedLeague) => {
        this.league = updatedLeague;
        this.editingField = null;
        this.tempEditValue = null;
      },
      error: (error) => {
        console.error('Error updating league:', error);
        this.error = 'Failed to update league details.';
      }
    });
  }

  deleteLeague(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this league?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.league) {
          this.leagueService.deleteLeague(this.league.id).subscribe({
            next: () => {
              this.router.navigate(['/leagues']);
            },
            error: (error) => {
              console.error('Error deleting league:', error);
              this.error = 'Failed to delete league.';
            }
          });
        }
      }
    });
  }

  onActiveToggle(event: any): void {
    if (!this.league) return;
    
    const updatedLeague = { is_active: event.checked };
    
    this.leagueService.updateLeague(this.league.id, updatedLeague).subscribe({
      next: (response) => {
        this.league = response;
      },
      error: (error) => {
        this.league.is_active = !event.checked;
        console.error('Error updating league active status:', error);
        this.error = 'Failed to update league active status.';
      }
    });
  }
}
