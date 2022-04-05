import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import { Router } from '@angular/router';
import { Vendor, ReferenceCompany, ProfileContact, ContactPerson } from './vendor';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  serverUrl = 'http://localhost:3000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  

  // addVendor(url:any, data:any)
  // {
  //   const URL = this.serverUrl + url;
  //   const headers = new Headers();

  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(URL,data);
  // }

  addVendor(vendor:Vendor)
  {
    return this.http.post<Vendor>(`${this.serverUrl}/vendor/add`,vendor,this.httpOptions);
  }

  addProfileContact(profile:ProfileContact)
  {
    return this.http.post<ProfileContact>(`${this.serverUrl}/vendor/profilecontact`,profile,this.httpOptions);
  }

  addContactPerson(contactperson:ContactPerson)
  {
    return this.http.post<ContactPerson>(`${this.serverUrl}/vendor/contactperson`,contactperson,this.httpOptions);
  }

  addReferenceComp(reference:ReferenceCompany)
  {
    return this.http.post<ReferenceCompany>(`${this.serverUrl}/vendor/reference_company`,reference,this.httpOptions);
  }

  postdata(urlT: any, data: any)  {
    // console.log(JSON.stringify(data));
    const updateUrl = this.serverUrl + urlT;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(updateUrl, data);
  }

  getdata(urlt: any) {
    const getUrl = this.serverUrl + urlt;
    return this.http.get(getUrl);
  }

  deletedata(urlt: any, id: any)  {
    const deleteUrl = this.serverUrl + urlt + '/' + id;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.delete(deleteUrl);
  }
  deleteAlldata(urlt: any)  {
    const deleteUrl = this.serverUrl + urlt;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.delete(deleteUrl);
  }

  putdata(urlT: any, data: any) {
    console.log(JSON.stringify(data));
    const putUrl = this.serverUrl + urlT;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.put(putUrl, data);
  }
  
}
