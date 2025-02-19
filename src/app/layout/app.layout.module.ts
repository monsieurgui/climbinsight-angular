import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './config/app.config.component';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";

@NgModule({
    declarations: [
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppSidebarComponent,
        AppLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        MenuModule,
        RouterModule,
        AvatarModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
