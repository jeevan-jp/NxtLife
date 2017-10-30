import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../shared/contact';

import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactForm: FormGroup;
  contact: Contact;
  feedback: Contact;
  data: Contact[];
  sno: number;

  formErrors = {
    name: '',
    email: '',
    contactnum: 0,
    gender: '',
    message: ''
  };


  validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'contactnum': {
      'required':      'contact number is required.',
      'pattern':       'contact number must contain only numbers.'
    },
    'gender': {
      'required':      'gender is required.',
    },
    'comment': {
      'maxlength':     'message cannot be more than 300 characters long.'
    },
  };

  constructor(private fb: FormBuilder, private contactservice: ContactService) {
    this.createForm();     
  }

  ngOnInit() {
    this.sno = this.contactservice.getSno();
    if(this.sno!==-1) {
      var object = this.data.filter(values => {return values.sno == this.sno})[0];
      this.contactForm.reset({
        name: object.name,
        email: object.email,
        contactnum: object.contactnum,
        gender: object.gender,
        comment: object.comment
      });
    }
  }

  createForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contactnum: [0, [Validators.required, Validators.pattern]],
      gender: ['male', [Validators.required]],
      comment: ['', [Validators.maxLength(100)]]
    });

    this.contactservice.getContacts()
    .subscribe(data => this.data = data)

    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.contactForm.value;
    var obj = this.contactservice.getObj();
    if(obj !== null) {
      this.feedback.sno = obj.sno;
      var i = this.data.indexOf(obj);                    //searching for obj in data.
      this.data[i] = this.feedback;
      this.contactservice.setObjNull();
    }
    else {
      //calculation of max serial number;
      var max=0;
      this.data.forEach(element => {
        if(element.sno>max)
          max = element.sno;
      });
      this.feedback.sno = max + 1;   //providing a serial number.
      this.data.push(this.feedback);
    }
    console.log(this.feedback);
    this.contactForm.reset({
      name: '',
      email: '',
      contactnum: 0,
      gender: '',
      comment: ''
    });
  }

}
