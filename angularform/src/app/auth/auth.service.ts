import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  isLoggedIn() {
    var token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }
}
