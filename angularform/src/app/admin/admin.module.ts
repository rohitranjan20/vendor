import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, ManageCategoryComponent, AdminLoginComponent, AdminUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
