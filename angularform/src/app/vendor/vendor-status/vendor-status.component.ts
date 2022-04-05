import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { VendorService } from '../vendor.service';

export class VendorStatus{
  search:any;

   constructor()
   {

   }
}

@Component({
  selector: 'app-vendor-status',
  templateUrl: './vendor-status.component.html',
  styleUrls: ['./vendor-status.component.css']
})
export class VendorStatusComponent implements OnInit {

  vendorStatus:any;
  errMsg:boolean = false;

  vendorList:any;
  successMsg:boolean = false;

  constructor(
    private router:Router,
    private vendorService:VendorService
  ) {
      this.vendorStatus = new VendorStatus();
     }

  ngOnInit(): void {


  }

  submit()
  {
    //console.log(this.vendorStatus);
    this.vendorService.postdata('/vendor/search',this.vendorStatus).subscribe((res:any) => {
       
      if(res == '')
      {
        this.errMsg = true;
        this.successMsg = false;
      }else{
        this.errMsg = false;
        this.vendorList =res;
        this.successMsg = true;
      }

    });
  }

}
