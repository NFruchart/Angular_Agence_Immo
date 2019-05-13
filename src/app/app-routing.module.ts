import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminSigninComponent },
  // Routage vers le composant de connexion
  { path: 'admin/login', component: AdminSigninComponent },
  // Routage vers le composant tableau de bord
  { path: 'admin/dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
