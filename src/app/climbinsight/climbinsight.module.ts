import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        // Remove DashboardComponent from here
    ],
    imports: [
        DashboardModule,  // Add this import instead
        CommonModule,
        ButtonModule,
        TimelineModule,
        CardModule,
        RouterModule.forChild([
            { path: '', component: DashboardComponent }
        ])
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClimbinsightModule { } 