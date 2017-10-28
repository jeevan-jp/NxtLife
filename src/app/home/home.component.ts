import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactForm: FormGroup;
  contact: Contact;
  feedback: Contact;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contactnum: ['', Validators.required],
      gender: ['', Validators.required],
      comment: ''
    });
  }

  onSubmit() {
    this.feedback = this.contactForm.value;
    console.log(this.feedback);
    this.contactForm.reset({
      name: '',
      email: '',
      contactnum: 0,
      gender: 'Select',
      comment: ''
    });
  }

}
