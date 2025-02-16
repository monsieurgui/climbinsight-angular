import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../climbinsight/services/auth.service';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('profilemenu') profileMenu!: Menu;

    items: MenuItem[] = [
        {
            label: 'View Profile',
            icon: 'pi pi-user',
            command: () => this.router.navigate(['climbinsight/profile'])
        },
        {
            separator: true
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => this.authService.logout()
        }
    ];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) { }

    toggleProfileMenu(event: any) {
        this.profileMenu.toggle(event);
    }
}
