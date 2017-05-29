import { Routes, RouterModule } from '@angular/router';

import { RhMainComponent } from './main/main.component';
import { RhLoginComponent } from './login/login.component';
import { RhSignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth';

const appRoutes: Routes = [
    { path: '', component: RhMainComponent, canActivate: [AuthGuard] },
    { path: 'profile/:id', component: RhMainComponent, canActivate: [AuthGuard] },
    { path: 'login', component: RhLoginComponent },
    { path: 'signup', component: RhSignupComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);