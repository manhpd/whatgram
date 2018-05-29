import { Routes, RouterModule } from '@angular/router';
import { SearchFriendComponent } from './views/search-friend/search-friend.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DetailsUploadComponent } from './views/details-upload/details-upload.component';
import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'home',
        component: ProfileComponent
    },
    {
        path: 'search',
        component: SearchFriendComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);