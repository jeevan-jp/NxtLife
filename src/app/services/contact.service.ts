import { Injectable } from '@angular/core';
import { Contact } from '../shared/contact';
import { CONTACTS } from '../shared/contacts';

@Injectable()
export class ContactService {

  constructor() { }

  getContacts() : Contact[] {
    return CONTACTS;
  }

}
