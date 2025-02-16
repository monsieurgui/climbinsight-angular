import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './climbinsight/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LandingComponent } from './climbinsight/components/landing/landing.component';
import { AuthGuard } from './climbinsight/guards/auth.guard';
import { PublicGuard } from './climbinsight/guards/public.guard';

const routes: Routes = [
    { 
        path: '', 
        component: LandingComponent,
        canActivate: [PublicGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./climbinsight/components/auth/auth.module').then(m => m.AuthModule),
        canActivate: [PublicGuard]
    },
    { 
        path: 'landing', 
        loadChildren: () => import('./climbinsight/components/landing/landing.module').then(m => m.LandingModule),
        canActivate: [PublicGuard]
    },
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: 'dashboard',
                loadChildren: () => import('./climbinsight/components/dashboard/dashboard.module')
                    .then(m => m.DashboardModule)
            },
            {
                path: 'leagues',
                loadChildren: () => import('./climbinsight/components/league/league-routing.module')
                    .then(m => m.leagueRoutes)
            },
            {
                path: 'climbinsight',
                loadChildren: () => import('./climbinsight/climbinsight.module').then(m => m.ClimbinsightModule),
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
