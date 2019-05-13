import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminSigninComponent,
    AdminDashboardComponent,
    AdminPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Import du module de formulaire (méthode template)
    FormsModule,
    // Import du module de formulaire (méthode reactive)
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
