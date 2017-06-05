import { Routes, RouterModule } from '@angular/router';

import { RhMainComponent } from './main/main.component';
import { RhLoginComponent } from './login/login.component';
import { RhSignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth';

const appRoutes: Routes = [
    { path: 'profile/:id', component: RhMainComponent, canActivate: [AuthGuard] },
    { path: 'login', component: RhLoginComponent },
    { path: 'signup', component: RhSignupComponent },

    { path: '**', redirectTo: '/login' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);