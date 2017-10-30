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
  public objectsToDelete = [];

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
    //console.log("count: ",this.count);
    var length1 = this.objectsToDelete.length;
    for(var i=0; i<length1; i++) {
      var position = this.data.indexOf(this.objectsToDelete[i]);
      //console.log("position: "+position);
      this.data.splice(position, 1);
    }

    //checking if list is empty.
    if(this.data.length == 0) {     
      //console.log('hi empty');
      document.getElementById('empty').style.display = 'inline';
      document.getElementById('tableData').style.display = 'none';
    }
    this.objectsToDelete = [];
  }

  addToList(id) {       //selected elements are pushed into 
    var object = this.data.filter( data => { return data.sno == id; } )[0];
    if(this.objectsToDelete.indexOf(object) > -1) {
      this.objectsToDelete.splice(index,1);
      var list = document.getElementsByClassName('tableData').length;
      console.log(list);
      
    }
    else {
      this.objectsToDelete.push(object);
      var index = this.data.indexOf(object);
      document.getElementsByClassName('tableData')[index].classList.add('highlight');
      this.count.push(index); 
    }
  }

  edit() {
    if(this.objectsToDelete.length>1) {
      document.getElementById('message1').innerHTML = 'Multiple elements cannot be edited!';
    }
    else if(this.data.length == 0) {
      document.getElementById('message1').innerHTML = 'The list is empty!';
    }
    else if(this.objectsToDelete.length==0) {
      document.getElementById('message1').innerHTML = 'No element selected!!!';
    }
    else {
      var object = this.data[this.count[0]];
      //console.log(object);
      this.contactservice.updateId(object);
    }
  }
}
