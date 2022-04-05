export class Vendor {
    vendor_id:any='';
    project_state:any='';
    vendor_type:any='';
    vendor_type_other:any='';
    vendor_name:any='';
    profile_upl:any='';
    profile_upl_attach:any='';
    vendor_address:any='';
    vendor_country:any='';
    vendor_state:any='';
    vendor_city:any='';
    vendor_pincode:any='';
    vendor_email:any='';
    vendor_mobile:any='';
    vendor_website:any='';
    multi_reg_type:any='';
    is_proprietary_firm:any='';
    aadhar_no:any='';
    vendor_adhar:any='';
    nature_of_business:any='';
    distributor_upl:any='';
    is_register_msme:any='';
    msme_register_no:any='';
    pan_no:any='';
    documentary_proof:any='';
    gst_no:any='';
    certificate_documentary:any='';
    vendor_bank_name:any='';
    vendor_bank_branch:any='';
    vendor_name_account:any='';
    vendor_bank_account_no:any='';
    vendor_ifsc:any='';
    cancelled_cheque_upl:any='';
    staff_working_acil:any='';
    is_vendor_insurance:any='';
    vendor_insurance_no:any='';
    vendor_insurance:any='';
    vendor_blacklisted:any='';
    registration_certificate:any='';
    profileContact:any='';
    contactPerson:any='';
    referenceComp:any='';
    constructor() { }
}


export class ProfileContact {
    vid:any='';
    profile_contact_name:any='';
    profile_contact_no:any ='';
    constructor() { }
}


export class ReferenceCompany{
    vid:any='';
    comp_name:any='';
    comp_address:any='';
    comp_contact_person:any='';
    comp_contact_no:any='';
    constructor() { }
}


export class ContactPerson{
    vid:any='';
    contact_pname:any='';
    contact_pdesignations:any='';
    contact_pmobile:any='';
    contact_plandline:any='';
    contact_pfax:any='';
    contact_pemail:any='';
    constructor() { }
}


export class Otp{
    vid:any='';
    email:any='';
    mobile:any='';
    constructor() { }
}
