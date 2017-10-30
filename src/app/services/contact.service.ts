import { Injectable } from '@angular/core';
import { Contact } from '../shared/contact';
import { CONTACTS } from '../shared/contacts';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class ContactService {

  constructor() { }

  sno = -1;
  obj = null;

  getContacts() : Observable<Contact[]> {
    return Observable.of(CONTACTS);
  }

  updateId(value) {
    this.obj = value;
    this.sno = value.sno;
    console.log('sno updated: '+ this.sno);
  }

  getSno() {
    return this.sno;
  }

  getObj() {
    return this.obj;
  }

  setObjNull() {
    this.obj = null;
  }

}
