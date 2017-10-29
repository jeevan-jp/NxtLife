import { Injectable } from '@angular/core';
import { Contact } from '../shared/contact';
import { CONTACTS } from '../shared/contacts';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class ContactService {

  constructor() { }

  getContacts() : Observable<Contact[]> {
    return Observable.of(CONTACTS).delay(2000);
  }

}
