import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  data: Contact[];

  constructor(private contactservice: ContactService) { }

  ngOnInit() {
    this.data = this.contactservice.getContacts();
  }

}
