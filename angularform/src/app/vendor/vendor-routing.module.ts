import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { VendorCreateComponent } from './vendor-create/vendor-create.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { VendorStatusComponent } from './vendor-status/vendor-status.component';

const routes: Routes = [
  { path:'', component:VendorCreateComponent},
  { path:'otp/:id', component:OtpComponent},
  { path:'thank-you', component:ThankyouComponent},
  { path:'status', component:VendorStatusComponent},
  { path:'edit/:id', component:VendorEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
