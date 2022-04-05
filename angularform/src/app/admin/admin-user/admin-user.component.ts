import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  users:any = [];
  totalUser:any;
  p:number = 1;
  limit:number = 10;

  constructor(
    private adminService:AdminService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.getAllUsers(this.p);

    // console.log(this.totalUser);
  }

  getAllUsers(p:number)
  {
    this.adminService.getData('users?pageNo='+p+'&size='+this.limit).subscribe((res:any) => {
      
      this.users = res.results;
      this.totalUser = res.totalcount;

      console.log(res);
    });
  }

  getPage(pageNo:number)
  {
    this.p = pageNo;
    this.getAllUsers(this.p);
  }


}
