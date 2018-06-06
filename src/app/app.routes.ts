import { Routes, RouterModule } from '@angular/router';
import { SearchFriendComponent } from './views/search-friend/search-friend.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DetailsUploadComponent } from './views/details-upload/details-upload.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './views/header/header.component';
import { UserPorfileComponent } from './views/userProfile/userProfile.component';
const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    { 
        path: 'profile/:id',      
        component: UserPorfileComponent },
    {
        path: 'header',
        component: HeaderComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'home',
        component: ProfileComponent
    },
    {
        path: 'search',
        component: SearchFriendComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
      
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);