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
  public count = [];

  constructor(private contactservice: ContactService) { }

  ngOnInit() {
    this.contactservice.getContacts()
      .subscribe(values => {
        if(values.length>0) 
          this.data = values;
    });

    //this.contactservice.updateId(this.object);
  }

  delete() {
    console.log("count: ",this.count);
    var length = this.count.length;
    var count1 = this.count;
    for(var i=0; i<length; i++) {
      this.data.splice(count1[i], 1);
      this.count.splice(i,1);
    }
  }

  addToList(id) {
    var object = this.data.filter( data => { return data.sno == id; } )[0];
    console.log(object);
    var index = this.data.indexOf(object);
    document.getElementsByClassName('tableData')[index].classList.add('highlight');
    this.count.push(index); 
  }

  edit() {
    var object = this.data[this.count[0]];
    console.log(object);
    this.contactservice.updateId(object);
  }
}
