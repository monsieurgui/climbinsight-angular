import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        TimelineModule,
        CardModule,
        CarouselModule,
        TabViewModule,
        DashboardRoutingModule
    ],
    declarations: [DashboardComponent],
    exports: [DashboardComponent]
})
export class DashboardModule { }
