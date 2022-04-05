import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path:'',
        canActivateChild: [AuthGuard],
        children: [
          { 
            path:'category',component:ManageCategoryComponent,
            canActivate:[AdminGuard]
          },
          { 
            path:'', component:AdminDashboardComponent
          },
          { 
            path:'dashboard', component:AdminDashboardComponent,
            canActivate:[AdminGuard]
          },
          { 
            path:'users', component:AdminUserComponent,
            canActivate:[AdminGuard]
          }
        ]
      }
    ]
  },
  {
    path:'login',
    component:AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
