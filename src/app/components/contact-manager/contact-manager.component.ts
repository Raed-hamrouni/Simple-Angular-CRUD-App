import { Component, OnInit } from '@angular/core';
import { Icontact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean = false;
  public contacts: Icontact[] = [];
  public errorMessage: string | null = null;
  

  constructor( private contactService : ContactService){

  }

  ngOnInit() : void {
   this.getallcontactsfromserver();
  }


  public getallcontactsfromserver(){
    this.loading = true;
    this.contactService.getAllcontacts().subscribe(  ( data:Icontact[] ) => {
      this.contacts = data;
      this.loading = false;
    },  (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }

  public deletecontact(contactId : string | undefined) {

    if(contactId)[
      this.contactService.deleteContact(contactId).subscribe((data :{})=>{
        this.getallcontactsfromserver();
      }, (error) =>{
        this.errorMessage = error;
      })
    ]
  }
 }
