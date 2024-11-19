import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

interface Event {
    name: string;
    date: string;
    location: string;
    color: string;
    icon: string;
}

interface Notification {
    title: string;
    time: string;
    icon: string;
    severity: 'info' | 'warning' | 'success' | 'error';
}

interface SystemStatus {
    name: string;
    status: 'operational' | 'degraded' | 'down';
    icon: string;
    iconClass: string;
    bgClass: string;
}

interface ActiveEvent {
    status: string;
    statusText: string;
    statusClass: string;
    name: string;
    location: string;
    timing: string;
    participants: string;
    actions: Array<{
        label: string;
        icon: string;
        styleClass: string;
    }>;
}

interface LeagueCategory {
    name: string;
    rankings: LeagueRanking[];
}

interface LeagueRanking {
    rank: number;
    athlete: string;
    points: number;
    trendIcon: string;
    trendClass: string;
}

interface UpcomingEvent {
    name: string;
    date: string;
    type: string;
    typeClass: string;
    severity: string;
    icon: string;
}

@Component({
    templateUrl: './dashboard.component.html',
    styles: [`
        .notification-item {
            border-radius: 6px;
            padding: 1rem;
            margin-bottom: 0.5rem;
        }
        .notification-item.info {
            background: var(--blue-50);
        }
        .notification-item.warning {
            background: var(--yellow-50);
        }
        .notification-item.success {
            background: var(--green-50);
        }
        .notification-item.error {
            background: var(--red-50);
        }
        .custom-marker {
            display: flex;
            width: 2rem;
            height: 2rem;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            border-radius: 50%;
            z-index: 1;
        }
        :host ::ng-deep .p-timeline-event-content,
        :host ::ng-deep .p-timeline-event-opposite {
            line-height: 1.5;
        }

        :host ::ng-deep .customized-timeline {
            padding-left: 1rem;
            
            .p-timeline-event {
                padding-left: 0;
            }
            
            .p-timeline-event-opposite {
                display: none;
            }
            
            .p-timeline-event-content {
                padding: 0 1rem;
            }

            .p-timeline-event-separator {
                margin-left: 0;
            }

            .custom-marker {
                display: flex;
                width: 2rem;
                height: 2rem;
                align-items: center;
                justify-content: center;
                color: #ffffff;
                border-radius: 50%;
                z-index: 1;
            }
        }

        :host ::ng-deep .p-card {
            .p-card-body {
                padding-left: 1rem;
            }
            
            .p-card-content {
                padding-left: 0;
            }
        }
    `]
})
export class DashboardComponent implements OnInit {
    recentActivity: any[] = [];
    quickActions = [
        { 
            label: 'Create Event', 
            icon: 'pi pi-plus', 
            action: () => console.log('create event') 
        },
        { 
            label: 'Add Athletes', 
            icon: 'pi pi-users', 
            action: () => console.log('add athletes') 
        },
        { 
            label: 'View Reports', 
            icon: 'pi pi-chart-bar', 
            action: () => console.log('view reports') 
        },
        { 
            label: 'Settings', 
            icon: 'pi pi-cog', 
            action: () => console.log('settings') 
        },
        { 
            label: 'Help', 
            icon: 'pi pi-question-circle', 
            action: () => console.log('help') 
        },
        { 
            label: 'Notifications', 
            icon: 'pi pi-bell', 
            action: () => console.log('notifications') 
        }
    ];
    recentNotifications: Notification[] = [];
    systemStatus: SystemStatus[] = [];
    activeEvent: ActiveEvent = {
        status: 'Live',
        statusText: 'In Progress',
        statusClass: 'bg-green-100 text-green-700 border-round',
        name: 'Boulder Competition 2024',
        location: 'Main Gym',
        timing: '2:30 PM - 6:00 PM',
        participants: '45 Athletes',
        actions: [
            { label: 'View', icon: 'pi pi-eye', styleClass: 'p-button-outlined' },
            { label: 'Edit', icon: 'pi pi-pencil', styleClass: 'p-button-outlined p-button-warning' }
        ]
    };
    leagueCategories: LeagueCategory[] = [];
    upcomingEvents: UpcomingEvent[] = [];

    constructor(private router: Router) {
        this.recentActivity = [];
    }

    ngOnInit(): void {
        this.recentNotifications = [
            { 
                title: 'New competition registration open', 
                time: '15 minutes ago',
                icon: 'pi pi-bell',
                severity: 'info'
            },
            { 
                title: 'System maintenance scheduled',
                time: '1 hour ago',
                icon: 'pi pi-exclamation-triangle',
                severity: 'warning'
            },
            { 
                title: 'Results published successfully',
                time: '2 hours ago',
                icon: 'pi pi-check-circle',
                severity: 'success'
            },
            { 
                title: 'Failed to sync results',
                time: '3 hours ago',
                icon: 'pi pi-times-circle',
                severity: 'error'
            }
        ];

        this.recentActivity = [
            {
                title: 'Competition Results Updated',
                time: '30 minutes ago',
                icon: 'pi pi-chart-line',
                category: 'Results',
                categoryClass: 'bg-blue-50 text-blue-600',
                description: 'Finals results for "Boulder Open 2024" have been published'
            },
            {
                title: 'New Athlete Registration',
                time: '1 hour ago',
                icon: 'pi pi-user-plus',
                category: 'Registration',
                categoryClass: 'bg-green-50 text-green-600',
                description: 'Sarah Johnson registered for upcoming competition'
            },
            {
                title: 'Route Setting Complete',
                time: '2 hours ago',
                icon: 'pi pi-check-circle',
                category: 'Setup',
                categoryClass: 'bg-purple-50 text-purple-600',
                description: 'All routes for qualification round have been set and verified'
            },
            {
                title: 'Schedule Updated',
                time: '3 hours ago',
                icon: 'pi pi-calendar',
                category: 'Schedule',
                categoryClass: 'bg-orange-50 text-orange-600',
                description: 'Finals schedule adjusted due to weather forecast'
            },
            {
                title: 'Live Stream Started',
                time: '4 hours ago',
                icon: 'pi pi-video',
                category: 'Broadcast',
                categoryClass: 'bg-pink-50 text-pink-600',
                description: 'Live streaming began for qualification round'
            }
        ];

        this.systemStatus = [
            {
                name: 'Scoring System',
                status: 'operational',
                icon: 'pi pi-check-circle',
                iconClass: 'text-green-500',
                bgClass: 'bg-green-50'
            },
            {
                name: 'Live Results',
                status: 'operational',
                icon: 'pi pi-check-circle',
                iconClass: 'text-green-500',
                bgClass: 'bg-green-50'
            },
            {
                name: 'Registration System',
                status: 'degraded',
                icon: 'pi pi-exclamation-circle',
                iconClass: 'text-orange-500',
                bgClass: 'bg-orange-50'
            },
            {
                name: 'Backup System',
                status: 'operational',
                icon: 'pi pi-check-circle',
                iconClass: 'text-green-500',
                bgClass: 'bg-green-50'
            }
        ];

        this.leagueCategories = [
            {
                name: 'Senior Male',
                rankings: [
                    {
                        rank: 1,
                        athlete: 'John Doe',
                        points: 250,
                        trendIcon: 'pi pi-arrow-up',
                        trendClass: 'text-green-500'
                    },
                    {
                        rank: 2,
                        athlete: 'Mike Smith',
                        points: 235,
                        trendIcon: 'pi pi-arrow-down',
                        trendClass: 'text-red-500'
                    },
                    // Add more rankings as needed
                ]
            },
            {
                name: 'Senior Female',
                rankings: [
                    {
                        rank: 1,
                        athlete: 'Jane Smith',
                        points: 245,
                        trendIcon: 'pi pi-arrow-up',
                        trendClass: 'text-green-500'
                    },
                    {
                        rank: 2,
                        athlete: 'Sarah Johnson',
                        points: 230,
                        trendIcon: 'pi pi-minus',
                        trendClass: 'text-gray-500'
                    },
                    // Add more rankings as needed
                ]
            },
            // Add more categories as needed
        ];

        this.upcomingEvents = [
            {
                name: 'Boulder Open 2024 - Qualifications',
                date: 'Tomorrow, 9:00 AM',
                type: 'Qualifications',
                typeClass: 'bg-blue-50 text-blue-600',
                severity: 'bg-blue-500',
                icon: 'pi pi-calendar'
            },
            {
                name: 'Lead Climbing Championship',
                date: 'Next Week, Monday',
                type: 'Finals',
                typeClass: 'bg-purple-50 text-purple-600',
                severity: 'bg-purple-500',
                icon: 'pi pi-flag'
            },
            {
                name: 'Youth Boulder Series',
                date: 'In 2 weeks',
                type: 'Scramble',
                typeClass: 'bg-green-50 text-green-600',
                severity: 'bg-green-500',
                icon: 'pi pi-users'
            }
        ];
    }

    navigateToCreateCompetition(): void {
        this.router.navigate(['/competitions/create']);
    }

    navigateToCreateLeague(): void {
        this.router.navigate(['/leagues/create']);
    }

    navigateToManageGyms(): void {
        this.router.navigate(['/gyms/manage']);
    }

    navigateToReports(): void {
        this.router.navigate(['/reports']);
    }
}
