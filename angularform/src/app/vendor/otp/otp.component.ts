import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { VendorService } from '../vendor.service';

export class OtpInfo {
  vid:any;
  otp:any;
  constructor() { }
}

export class UpdateVendor {
  verify:any;
  constructor() { }
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  vendorinfo:any;
  vid:any;
  otpInfo:any;
  otp:any;
  matchotp:any;
  errMsg:boolean = false;
  updatevendor:any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private vendorService:VendorService
  ) {
    this.otpInfo = new OtpInfo();
    this.updatevendor = new UpdateVendor();

   }

  ngOnInit(): void {
    // this.vendorinfo = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.vendorService.getHero(params.get('id')!))
     
    // );
      this.vid = this.route.snapshot.params.id;

  

    // console.log(this.vid);
  }

  submit()
  {
    this.otpInfo.vendorid = this.vid;

    this.vendorService.postdata('/vendor/matchotp',this.otpInfo).subscribe((res: any) => {
      if(res === null)
      {
        this.errMsg = true;
      }else{
        this.errMsg = false;

        this.updatevendor.verify = '1';

        this.vendorService.putdata('/vendor/update/'+this.vid,this.updatevendor).subscribe((dlres:any) => {

        });

        this.vendorService.deletedata('',this.vid).subscribe((dlres:any) => {

        });

        this.router.navigate(['/vendor/thank-you/']);
      }

    });
  }

  resendotp()
  {
    this.vendorService.getdata('/vendor/resentotp/'+this.vid).subscribe((res: any) => {
      console.log(res);
    });
  }

 

}
