import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ------ import all the componets ---

import { AppComponent } from './app.component';

// --------- login sign up page components --------
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  

    { path: 'login', component: LoginComponent},
    { path: 'resetpassword', component: ResetPasswordComponent },
    { path: 'home', component: HomeComponent , canActivate:[AuthGuardService] },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

