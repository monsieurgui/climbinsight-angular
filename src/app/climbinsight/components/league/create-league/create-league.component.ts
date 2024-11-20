import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { LeagueService } from '../../../services/league.service';
import { EditorModule } from 'primeng/editor';
import { RichTextEditorComponent } from '../../shared/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-create-league',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    InputSwitchModule,
    MultiSelectModule,
    DropdownModule,
    DialogModule,
    EditorModule,
    RichTextEditorComponent
  ],
  templateUrl: './create-league.component.html',
  styleUrl: './create-league.component.scss'
})
export class CreateLeagueComponent implements OnInit {
  leagueForm: FormGroup;
  isEditMode = false;
  loading = false;
  error: string | null = null;
  showConfirmDialog = false;
  formDataToSubmit: any = null;
  
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
    private fb: FormBuilder,
    private leagueService: LeagueService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.leagueForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      status: ['draft', Validators.required],
      categories: [[], Validators.required],
      is_active: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadLeague(Number(id));
    }
  }

  onSubmit(): void {
    if (this.leagueForm.valid) {
      this.formDataToSubmit = this.leagueForm.value;
      this.showConfirmDialog = true;
    }
  }

  confirmSubmit(): void {
    this.loading = true;
    this.error = null;

    const operation = this.isEditMode
      ? this.leagueService.updateLeague(Number(this.route.snapshot.paramMap.get('id')), this.formDataToSubmit)
      : this.leagueService.createLeague(this.formDataToSubmit);

    operation.subscribe({
      next: () => {
        this.error = null;
        this.router.navigate(['/leagues']);
      },
      error: (error) => {
        console.error('Error saving league:', error);
        this.error = 'Failed to save league. Please try again.';
        this.loading = false;
      }
    });
  }

  private loadLeague(id: number): void {
    this.loading = true;
    this.leagueService.getLeague(id).subscribe({
      next: (league) => {
        this.leagueForm.patchValue(league);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading league:', error);
        this.error = 'Failed to load league details.';
        this.loading = false;
      }
    });
  }

  cancelCreate(): void {
    this.error = null;
    this.router.navigate(['/leagues']);
  }
}
