import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContainersComponent } from './components/containers/containers.component';
import { ImagesComponent } from './components/images/images.component';
import { ContainerDetailComponent } from './components/container-detail/container-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'containers', component: ContainersComponent },
  { path: 'containers/:id', component: ContainerDetailComponent },
  { path: 'images', component: ImagesComponent },
  { path: '**', redirectTo: 'dashboard' }
];
