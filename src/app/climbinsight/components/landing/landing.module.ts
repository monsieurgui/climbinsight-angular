import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        StyleClassModule,
        DividerModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        RippleModule,
        RouterModule
    ],
    declarations: [LandingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingModule { }
