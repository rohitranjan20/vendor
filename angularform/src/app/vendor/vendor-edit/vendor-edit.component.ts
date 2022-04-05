import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup, FormBuilder, FormControl,FormArray, Validators} from '@angular/forms'
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { Vendor, ProfileContact, ContactPerson, ReferenceCompany,Otp } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

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
  editVendor:any;
  vid:any;
  doc_proof:any;
  certi_doc:any;
  cancel_cheque:any;
  msme_upl:any;
  profileUplAttach:any;



  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router,
    private vendorservice:VendorService,
    private modalService:BsModalService
  ) { 

    this.otpData = new Otp();
  }

  ngOnInit(): void {

    this.setDefault();
    this.createForm();
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

        // this.vendorservice.getdata('/vendor/vendorid').subscribe((res:any) => {
        //   console.log(res);
        //   this.vendorCreate.get('vendor_id').setValue(res.count);
        //     }, eror => {
        //       console.log(eror);
        // });


        /* start set country*/ 

        this.vendorservice.getdata('/location/country').subscribe((res:any) => {
          // console.log(res);
          this.countries = res;
          
            }, eror => {
              console.log(eror);
        });

        this.vid = this.route.snapshot.params.id;

        this.getVendor(this.vid);

       
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

  getVendor(id:any)
  {
    this.vendorservice.getdata('/vendor/detail/'+id).subscribe((res:any) => {
      this.vendorCreate.controls["vendor_id"].setValue(res.vendor_id);
      this.vendorCreate.controls["project_state"].setValue(res.project_state);
      this.vendorCreate.controls["vendor_type"].setValue(res.vendor_type);
      this.vendorCreate.controls["vendor_name"].setValue(res.vendor_name);
      this.vendorCreate.controls["vendor_type_other"].setValue(res.vendor_type_other);
      this.vendorCreate.controls["vendor_address"].setValue(res.vendor_address);
      this.vendorCreate.controls["vendor_country"].setValue(res.vendor_country);
      this.vendorCreate.controls["vendor_state"].setValue(res.vendor_state);
      this.vendorCreate.controls["vendor_city"].setValue(res.vendor_city);
      this.vendorCreate.controls["vendor_pincode"].setValue(res.vendor_pincode);
      this.vendorCreate.controls["vendor_email"].setValue(res.vendor_email);
      this.vendorCreate.controls["vendor_mobile"].setValue(res.vendor_mobile);
      this.vendorCreate.controls["vendor_website"].setValue(res.vendor_website);
      this.vendorCreate.controls["multi_reg_type"].setValue(res.multi_reg_type);
      this.vendorCreate.controls["is_proprietary_firm"].setValue(res.is_proprietary_firm);
      this.vendorCreate.controls["aadhar_no"].setValue(res.aadhar_no);
      this.vendorCreate.controls["nature_of_business"].setValue(res.nature_of_business);
      this.vendorCreate.controls["distributor_upl"].setValue(res.distributor_upl);
      this.vendorCreate.controls["is_register_msme"].setValue(res.is_register_msme);
      this.vendorCreate.controls["msme_register_no"].setValue(res.msme_register_no);
      this.vendorCreate.controls["pan_no"].setValue(res.pan_no);
      this.vendorCreate.controls["gst_no"].setValue(res.gst_no);
      this.vendorCreate.controls["vendor_bank_name"].setValue(res.vendor_bank_name);
      this.vendorCreate.controls["vendor_bank_branch"].setValue(res.vendor_bank_branch);
      this.vendorCreate.controls["vendor_name_account"].setValue(res.vendor_name_account);
      this.vendorCreate.controls["vendor_bank_account_no"].setValue(res.vendor_bank_account_no);
      this.vendorCreate.controls["vendor_ifsc"].setValue(res.vendor_ifsc);
      this.vendorCreate.controls["staff_working_acil"].setValue(res.staff_working_acil);
      this.vendorCreate.controls["is_vendor_insurance"].setValue(res.is_vendor_insurance);
      this.vendorCreate.controls["vendor_insurance_no"].setValue(res.vendor_insurance_no);
      this.vendorCreate.controls["vendor_blacklisted"].setValue(res.vendor_blacklisted);
      this.vendorCreate.controls["profileContact"].patchValue(res.profileContact);
      this.vendorCreate.controls["referenceComp"].patchValue(res.referenceComp);
      this.vendorCreate.controls["contactPerson"].patchValue(res.contactPerson);

      this.doc_proof=res.documentary_proof;
      this.certi_doc=res.certificate_documentary;
      this.cancel_cheque=res.cancelled_cheque_upl;
      this.msme_upl=res.registration_certificate;
      this.profileUplAttach = res.profile_upl_attach;
      // console.log(res.profileContact);

      // document proof
      /*this.vendorCreate.patchValue({
        documentary_proof: res.documentary_proof
      });
      this.vendorCreate.get('documentary_proof').updateValueAndValidity();
      */

      //insurance
      /*
      this.vendorCreate.patchValue({
        vendor_insurance: res.vendor_insurance
      });
      this.vendorCreate.get('vendor_insurance').updateValueAndValidity();
      */

      //registration

      /*
      this.vendorCreate.patchValue({
        registration_certificate: res.registration_certificate
      });
      this.vendorCreate.get('registration_certificate').updateValueAndValidity();
      */

      //cancel cheque

      /*

      this.vendorCreate.patchValue({
        cancelled_cheque_upl: res.cancelled_cheque_upl
      });
      this.vendorCreate.get('cancelled_cheque_upl').updateValueAndValidity();
      */

      //certificate documentary

      /*
      this.vendorCreate.patchValue({
        certificate_documentary: res.certificate_documentary
      });
      this.vendorCreate.get('certificate_documentary').updateValueAndValidity();
      */
      


      
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

       
      if(this.vendorCreate.get("documentary_proof").value == '')
      {
        this.vendorCreate.patchValue({
          documentary_proof: this.doc_proof
        });
        this.vendorCreate.get('documentary_proof').updateValueAndValidity();
      }


      if(this.vendorCreate.get("certificate_documentary").value == '')
      {
        this.vendorCreate.patchValue({
          certificate_documentary: this.certi_doc
        });
        this.vendorCreate.get('certificate_documentary').updateValueAndValidity();
      }

      if(this.vendorCreate.get("cancelled_cheque_upl").value == '')
      { 
        this.vendorCreate.patchValue({
          cancelled_cheque_upl: this.cancel_cheque
        });
        this.vendorCreate.get('cancelled_cheque_upl').updateValueAndValidity();
      }


        console.log(this.vendorCreate.get("documentary_proof").value);
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
      
    

    this.vendorservice.putdata('/vendor/'+this.vid,this.vendorCreate.value).subscribe( (res:any) => {
      this.vendorResp = res;
      console.log(this.vendorResp);
      this.otpData.vid = this.vid;
      this.otpData.email = res.vendor_email;
      this.otpData.mobile = res.vendor_mobile;
      this.vendorservice.deletedata('/vendor',this.vid).subscribe((dlres:any) => {

      });
      this.vendorservice.postdata('/vendor/otp',  this.otpData).subscribe((rr: any) => {
        console.log(rr);
        this.router.navigate(['/vendor/otp/'+this.vid]);
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
