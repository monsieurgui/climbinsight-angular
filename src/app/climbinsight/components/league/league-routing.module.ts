import { Routes } from '@angular/router';
import { MainLeagueComponent } from './main-league/main-league.component';
import { CreateLeagueComponent } from './create-league/create-league.component';
import { LeagueDetailsComponent } from './league-details/league-details.component';

export const leagueRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainLeagueComponent
      },
      {
        path: 'create',
        component: CreateLeagueComponent
      },
      {
        path: ':id',
        component: LeagueDetailsComponent
      }
    ]
  }
]; 