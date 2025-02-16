import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClimbinsightRoutingModule } from './climbinsight-routing.module';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

// Components
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile/profile-edit.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileEditComponent
    ],
    imports: [
        CommonModule,
        ClimbinsightRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        
        // PrimeNG
        ButtonModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        InputMaskModule,
        BreadcrumbModule,
        ProgressSpinnerModule,
        TooltipModule
    ]
})
export class ClimbinsightModule { } 