import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup, FormBuilder, FormControl,FormArray, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { Vendor, ProfileContact, ContactPerson, ReferenceCompany,Otp } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  modalRef:any = BsModalRef;

  vendorCreate:any= FormGroup;
  // model:Vendor[] = [];
  profileAttach:Array<any> = [];
  profileContact:Array<any> = [];
  // contactPerson:Array<any> = [];
  // referenceComp:Array<any> = [];
  isAadhar:any ='d-none';
  isRegisterMsme:any='d-none';
  isVendorInsurance:any='d-none';
  isvendInsur:any=0;

  profile:any;
  contactPer:any;
  referenceCom:any;
  vendorResp:any;

  profileResp:any;
  contactPersonResp:any;
  referenceCompanyResp:any;


  profcont:any;

  file: any;

  documentary_proof:any;
  vendor_adhar:any;
  registration_certificate:any;
  certificate_documentary:any;
  cancelled_cheque_upl:any;
  vendor_insurance:any;

  profile_upl_attach:Array<File> = [];
  vendor_id:any;

  otpData:any;


  
  countries:any;
  countryid:any;
  states:any;
  stateid:any;
  cities:any;


  constructor(
    private fb: FormBuilder,
    private router:Router,
    private vendorservice:VendorService,
    private modalService:BsModalService
    ) { 
      // this.profile = new ProfileContact();
      // this.referenceCom = new ReferenceCompany();
      // this.contactPer = new ContactPerson();
      this.otpData = new Otp();
    }


    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

  ngOnInit(): void {
   
    this.createForm();
    this.setDefault();
  }


  get f() { return this.vendorCreate.controls; }

  createForm()
  {
    this.vendorCreate = this.fb.group({
      project_state:['',Validators.required],
      vendor_type:['',Validators.required],
      vendor_type_other:[''],
      vendor_name:['',Validators.required],
      profile_upl:[''],
      profileContact:this.fb.array([this.fb.group({profile_contact_name:'',profile_contact_no:''})]),
      contactPerson:this.fb.array([this.fb.group({contact_pname:'',contact_pdesignations:'',contact_pmobile:'',contact_plandline:'',contact_pfax:'', contact_pemail:''})]),
      profile_upl_attach:[''],
      vendor_address:['',Validators.required],
      vendor_country:['',Validators.required],
      vendor_state:[''],
      vendor_city:[''],
      vendor_pincode:['',Validators.required],
      vendor_email:['',Validators.required],
      vendor_mobile:['',Validators.required],
      vendor_website:[''],
      multi_reg_type:[''],
      is_proprietary_firm:['0'],
      aadhar_no:[''],
      vendor_adhar:[''],
      nature_of_business:[''],
      distributor_upl:[''],
      is_register_msme:['0'],
      msme_register_no:[''],
      // contact_pname:[''],
      // contact_pdesignations:[''],
      // contact_pmobile:[''],
      // contact_plandline:[''],
      // contact_pfax:[''],
      // contact_pemail:[''],
      pan_no:[''],
      documentary_proof:[''],
      gst_no:[''],
      certificate_documentary:[''],
      vendor_bank_name:[''],
      vendor_bank_branch:[''],
      vendor_name_account:[''],
      vendor_bank_account_no:[''],
      vendor_ifsc:[''],
      cancelled_cheque_upl:[''],
      staff_working_acil:[''],
      referenceComp:this.fb.array([this.fb.group({comp_name:'', comp_address:'', comp_contact_no:'', comp_contact_person:''})]),
      // comp_name:[''],
      // comp_address:[''],
      // comp_contact_person:[''],
      // comp_contact_no:[''],
      is_vendor_insurance:['0'],
      vendor_insurance_no:[''],
      vendor_insurance:[''],
      vendor_blacklisted:[''],
      registration_certificate:[''],
      vendor_id:['']
    });
  }

  /* Upload pan */ 
  uploadPan(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentary_proof = file;
        const formData = new FormData();
        formData.append('documentary_proof', this.documentary_proof);
        this.vendorservice.postdata('/vendor/pan',  formData).subscribe((res: any) => {
          console.log(res);
          this.vendorCreate.patchValue({
            documentary_proof: res.filename
          });
          this.vendorCreate.get('documentary_proof').updateValueAndValidity();
        }, eror => {
          console.log(eror);
        });
    }
  }

    /* Upload aadhar */ 
    uploadAadhar(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.vendor_adhar = file;
          const formData = new FormData();
          formData.append('vendor_adhar', this.vendor_adhar);
          this.vendorservice.postdata('/vendor/aadhar',  formData).subscribe((res: any) => {
            console.log(res);
            this.vendorCreate.patchValue({
              vendor_adhar: res.filename
            });
            this.vendorCreate.get('vendor_adhar').updateValueAndValidity();
          }, eror => {
            console.log(eror);
          });
      }
    }


     /* Upload aadhar */ 
     uploadMsme(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registration_certificate = file;
          const formData = new FormData();
          formData.append('registration_certificate', this.registration_certificate);
          this.vendorservice.postdata('/vendor/msme',  formData).subscribe((res: any) => {
            console.log(res);
            this.vendorCreate.patchValue({
              registration_certificate: res.filename
            });
            this.vendorCreate.get('registration_certificate').updateValueAndValidity();
          }, eror => {
            console.log(eror);
          });
      }
    }

    uploadGst(event:any)
    {
        if(event.target.files.length > 0)
        {
          const file = event.target.files[0];
          this.certificate_documentary = file;
          const formData = new FormData();
          formData.append('certificate_documentary', this.certificate_documentary);
          this.vendorservice.postdata('/vendor/gst',  formData).subscribe((res: any) => {
            console.log(res);
            this.vendorCreate.patchValue({
              certificate_documentary: res.filename
            });
            this.vendorCreate.get('certificate_documentary').updateValueAndValidity();
          }, eror => {
            console.log(eror);
          });
        }
    }

    uploadCheque(event:any)
    {
      if(event.target.files.length > 0)
        {
          const file = event.target.files[0];
          this.cancelled_cheque_upl = file;
          const formData = new FormData();
          formData.append('cancelled_cheque_upl', this.cancelled_cheque_upl);
          this.vendorservice.postdata('/vendor/cheque',  formData).subscribe((res: any) => {
            console.log(res);
            this.vendorCreate.patchValue({
              cancelled_cheque_upl: res.filename
            });
            this.vendorCreate.get('cancelled_cheque_upl').updateValueAndValidity();
          }, eror => {
            console.log(eror);
          });
        }
    }

    //vendor_insurance
    uploadInsurance(event:any)
    {
        if(event.target.files.length > 0)
        {
          const file = event.target.files[0];
          this.vendor_insurance = file;
          const formData = new FormData();
          formData.append('vendor_insurance', this.vendor_insurance);
          this.vendorservice.postdata('/vendor/insurance',  formData).subscribe((res: any) => {
            console.log(res);
            this.vendorCreate.patchValue({
              vendor_insurance: res.filename
            });
            this.vendorCreate.get('vendor_insurance').updateValueAndValidity();
          }, eror => {
            console.log(eror);
          });
        }
    }

    //profile_upl_attach
    uplodProfile(event:any)
    {
      this.profile_upl_attach = <Array<File>>event.target.files;
    }


    setDefault() {
       /* Start get vendorid*/

        this.vendorservice.getdata('/vendor/vendorid').subscribe((res:any) => {
          console.log(res);
          this.vendorCreate.get('vendor_id').setValue(res.count);
            }, eror => {
              console.log(eror);
        });


        /* start set country*/ 

        this.vendorservice.getdata('/location/country').subscribe((res:any) => {
          // console.log(res);
          this.countries = res;
          
            }, eror => {
              console.log(eror);
        });
    }

  onSubmit()
  {

    // this.modalRef = this.modalService.show('template');
    const formData: any = new FormData();
      const files: Array<File> = this.profile_upl_attach;
      // console.log(files);

      for(let i =0; i < files.length; i++){
          formData.append("profile[]", files[i], files[i]['name']);
      }

      this.vendorservice.postdata('/vendor/profile',  formData).subscribe((res: any) => {
          // console.log(res);
          this.vendorCreate.patchValue({
            profile_upl_attach: res.filename
          });
          this.vendorCreate.get('profile_upl_attach').updateValueAndValidity();
        }, eror => {
          console.log(eror);
        });

       

        console.log(this.vendorCreate.value);
    // if(this.vendorCreate.valid) {
      // console.log(this.vendorCreate.get("profileContact").value); // Process your form

      // this.vendorCreate.get("profileContact").value;
      /*for (let index = 0; index < this.vendorCreate.get("profileContact").value.length; index++) {
        const element = this.vendorCreate.get("profileContact").value[index];
        console.log(element.profile_contact_name);
      }*/
    // }

    // this.model = this.vendorCreate.value;

      // this.profcont = this.vendorCreate.get("profileContact").value;
      
    

    this.vendorservice.addVendor(this.vendorCreate.value).subscribe( (res:any) => {
      this.vendorResp = res;
      console.log(this.vendorResp);
      this.otpData.vid = res._id;
      this.otpData.email = res.vendor_email;
      this.otpData.mobile = res.vendor_mobile;
      this.vendorservice.deletedata('/',res._id).subscribe((dlres:any) => {

      });
      this.vendorservice.postdata('/vendor/otp',  this.otpData).subscribe((rr: any) => {
        console.log(rr);
        this.router.navigate(['/vendor/otp/'+res._id]);
      }, eror => {
        console.log(eror);
      });
    });
    
  }

  addProfileAttach()
  {
    this.profileAttach.push(this.fb.group({profile_upl_attach:''}));
  }

  removeProfileAttach(profatt:any,i:any)
  {
    const index = this.profileAttach.indexOf(profatt);
      if (index !== -1) {
        this.profileAttach.splice(index, 1);
      }
  }


  profContact() : FormArray {

    return this.vendorCreate.get("profileContact") as FormArray

  }

  

  addProfileContact()
  {
    this.profContact().push(this.fb.group({profile_contact_name:'',profile_contact_no:''}));
  }

  removeProfileContact(i:any){
    this.profContact().removeAt(i);
  }


  //contactPerson

  contPerson() : FormArray {

    return this.vendorCreate.get("contactPerson") as FormArray

  }

  addContactPerson()
  {
    this.contPerson().push(this.fb.group({contact_pname:'',contact_pdesignations:'',contact_pmobile:'',contact_plandline:'',contact_pfax:'', contact_pemail:''}));
  }

  removeContactPerson(i:any)
  {
    this.contPerson().removeAt(i);
  }

  // referenceComp:this.fb.array([]),

  refComp() : FormArray {

    return this.vendorCreate.get("referenceComp") as FormArray

  }

  addReferencCompany()
  {
    this.refComp().push(this.fb.group({comp_name:'', comp_address:'', comp_contact_no:'', comp_contact_person:''}))
  }

  removeReferencCompany(i:any)
  {
    this.refComp().removeAt(i);
  }

  checkAadhar(res:any)
  {
    if(res == 1)
    {
      this.isAadhar = 'd-block';
    }else{
      this.isAadhar = 'd-none';
    }
  }
  //is_register_msme
  
  isMsmeRegister(res:any){
    if(res == 1)
    {
      this.isRegisterMsme = 'd-block';
    }else{
      this.isRegisterMsme = 'd-none';
    }
  }

  isVendInsurance(res:any){
    if(res == 1)
    {
      this.isVendorInsurance = 'd-block';
    }else{
      this.isVendorInsurance = 'd-none';
    }
  }

  /*Dependent country, state and city*/ 

  changeCountry(cid:any)
  {
    // console.log(cid.target.value);
    this.countryid = cid.target.value;
    this.vendorservice.getdata('/location/state/'+this.countryid).subscribe((res:any) => {
      
      this.states = res;
      
        }, eror => {
          console.log(eror);
    });
  }

  changeState(sid:any)
  {
    // console.log(cid.target.value);
    this.stateid = sid.target.value;
    this.vendorservice.getdata('/location/city/'+this.stateid).subscribe((res:any) => {
  
      this.cities = res;
      
        }, eror => {
          console.log(eror);
    });
  }

}
