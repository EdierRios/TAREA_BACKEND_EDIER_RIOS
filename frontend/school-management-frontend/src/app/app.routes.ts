import { Routes } from '@angular/router';
import { GrupoListComponent } from './components/grupo-list/grupo-list.component'; 

export const routes: Routes = [
  { path: '', component: GrupoListComponent },
  { path: '**', redirectTo: '' }
];
