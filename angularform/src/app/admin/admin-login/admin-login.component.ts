import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

export class AdminLogin{
  email:any;
  password:any;
  constructor(){

  }
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminlogin: any;
  verify:any;
  loginForm:any;

  constructor(
    private api:AdminService,
    private router:Router
  ) { 
    this.adminlogin = new AdminLogin();
  }

  ngOnInit(): void {

    let token;

    token = localStorage.getItem('token')
    if(!token)
    {
      this.router.navigate(['/admin/login'])
    }else{
      this.api.getVerifyData().subscribe((res:any) => {
          this.router.navigate(['/admin/dashboard']);
          console.log(res);
      }, err => {
        console.log(err);
      })
    }
  }


  login()
  {
    //console.log(this.adminlogin);
    this.api.postData('login',this.adminlogin).subscribe((res:any) => {
      localStorage.setItem('token',res.token)
      this.router.navigate(['/admin/dashboard'])
    }, err =>{
      console.log(err)
    });
  }


}
