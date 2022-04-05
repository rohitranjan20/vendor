import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorCreateComponent } from './vendor-create/vendor-create.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { VendorStatusComponent } from './vendor-status/vendor-status.component';


@NgModule({
  declarations: [VendorCreateComponent, VendorEditComponent, OtpComponent, ThankyouComponent, VendorStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
