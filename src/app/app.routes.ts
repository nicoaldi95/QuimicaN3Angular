import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Balancer } from './features/balancer/balancer';
import { PeriodicTable } from './features/periodic-table/periodic-table';
import { Quiz } from './features/quiz/quiz';
import { Social } from './features/social/social';
import { Tools } from './features/tools/tools';
import { Perfil } from './features/perfil/perfil';
import { MolecularBond } from './features/molecular-bond/molecular-bond';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'tools', component: Tools },
  { path: 'tools/periodic-table', component: PeriodicTable },
  { path: 'tools/balancer', component: Balancer },
  { path: 'tools/molecular-bond', component: MolecularBond },
  { path: 'social', component: Social },
  { path: 'profile', component: Perfil },
  { path: 'quiz', component: Quiz },
];
