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
                label: 'Compétitions',
                items: [
                    { label: 'Créer une compétition', icon: 'pi pi-fw pi-plus', routerLink: ['/competitions/create'] },
                    { label: 'Gérer les compétitions', icon: 'pi pi-fw pi-cog', routerLink: ['/competitions/manage'],
                        items: [
                            { label: 'Modifier une compétition', icon: 'pi pi-fw pi-pencil', routerLink: ['/competitions/edit'] },
                            { label: 'Supprimer une compétition', icon: 'pi pi-fw pi-trash', routerLink: ['/competitions/delete'] },
                            { label: 'Détails d\'une compétition', icon: 'pi pi-fw pi-info-circle', routerLink: ['/competitions/details'] },
                        ]
                     }
                ]
            },
            {
                label: 'Événements',
                items: [
                    { label: 'Créer un événement', icon: 'pi pi-fw pi-plus', routerLink: ['/events/create'] },
                    { label: 'Gérer les événements', icon: 'pi pi-fw pi-cog', routerLink: ['/events/manage'],
                        items: [
                            { label: 'Modifier un événement', icon: 'pi pi-fw pi-pencil', routerLink: ['/events/edit'] },
                            { label: 'Supprimer un événement', icon: 'pi pi-fw pi-calendar-minus', routerLink: ['/events/delete'] },
                        ]
                    },
                ]
            },
            {
                label: 'Salles',
                items: [
                    { label: 'Ajouter une salle', icon: 'pi pi-fw pi-plus', routerLink: ['/gyms/create'] },
                    { label: 'Gérer les salles', icon: 'pi pi-fw pi-cog', routerLink: ['/gyms/manage'],
                        items: [
                            { label: 'Modifier une salle', icon: 'pi pi-fw pi-pencil', routerLink: ['/gyms/edit'] },
                            { label: 'Supprimer une salle', icon: 'pi pi-fw pi-trash', routerLink: ['/gyms/delete'] },
                            { label: 'Détails d\'une salle', icon: 'pi pi-fw pi-info-circle', routerLink: ['/gyms/details'] },
                        ]
                    },
                ]
            },
            {
                label: 'Ligues',
                items: [
                    { label: 'Créer une ligue', icon: 'pi pi-fw pi-plus', routerLink: ['/leagues/create'] },
                    { label: 'Gérer les ligues', icon: 'pi pi-fw pi-cog', routerLink: ['/leagues/manage'],
                        items: [
                            { label: 'Modifier une ligue', icon: 'pi pi-fw pi-pencil', routerLink: ['/leagues/edit'] },
                            { label: 'Supprimer une ligue', icon: 'pi pi-fw pi-trash', routerLink: ['/leagues/delete'] },
                            { label: 'Détails d\'une ligue', icon: 'pi pi-fw pi-info-circle', routerLink: ['/leagues/details'] },
                        ]
                    },
                ]
            },
            {
                label: 'Équipes',
                items: [
                    { label: 'Créer une équipe', icon: 'pi pi-fw pi-plus', routerLink: ['/teams/create'] },
                    { label: 'Gérer les équipes', icon: 'pi pi-fw pi-cog', routerLink: ['/teams/manage'],
                        items: [
                            { label: 'Modifier une équipe', icon: 'pi pi-fw pi-pencil', routerLink: ['/teams/edit'] },
                            { label: 'Supprimer une équipe', icon: 'pi pi-fw pi-trash', routerLink: ['/teams/delete'] },
                        ]
                    }
                ]
            },
            {
                label: 'PrimeNG',
                items: [
                    {
                        label: 'UI Components',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                            { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                        ]
                    },
                    {
                        label: 'Prime Blocks',
                        items: [
                            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                        ]
                    },
                    {
                        label: 'Utilities',
                        items: [
                            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                        ]
                    },
                    {
                        label: 'Pages',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Landing',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/landing']
                            },
                            {
                                label: 'Auth',
                                icon: 'pi pi-fw pi-user',
                                items: [
                                    {
                                        label: 'Login',
                                        icon: 'pi pi-fw pi-sign-in',
                                        routerLink: ['/auth/login']
                                    },
                                    {
                                        label: 'Error',
                                        icon: 'pi pi-fw pi-times-circle',
                                        routerLink: ['/auth/error']
                                    },
                                    {
                                        label: 'Access Denied',
                                        icon: 'pi pi-fw pi-lock',
                                        routerLink: ['/auth/access']
                                    }
                                ]
                            },
                            {
                                label: 'Crud',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/crud']
                            },
                            {
                                label: 'Timeline',
                                icon: 'pi pi-fw pi-calendar',
                                routerLink: ['/pages/timeline']
                            },
                            {
                                label: 'Not Found',
                                icon: 'pi pi-fw pi-exclamation-circle',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Empty',
                                icon: 'pi pi-fw pi-circle-off',
                                routerLink: ['/pages/empty']
                            },
                        ]
                    },
                    {
                        label: 'Hierarchy',
                        items: [
                            {
                                label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                    {
                                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    },
                                ]
                            },
                            {
                                label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                    {
                                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Get Started',
                        items: [
                            {
                                label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                            },
                            {
                                label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
