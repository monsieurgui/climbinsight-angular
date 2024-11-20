import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            { 
                label: 'Profile',
                items: [
                    { label: 'Voir son profil', icon: 'pi pi-fw pi-user', routerLink: ['/profile/view'] },
                    { label: 'Voir ses résultats', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/profile/results'] },
                    { label: 'Voir son calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/profile/calendar'] },
                    { label: 'Se déconnecter', icon: 'pi pi-fw pi-sign-out', routerLink: ['/logout'] },
                ]
            },
            {
                label: 'Manage',
                items: [
                    { label: 'Leagues', icon: 'pi pi-fw pi-arrow-right', routerLink: ['/leagues'] },
                ]
            }
        ]
    }
}
