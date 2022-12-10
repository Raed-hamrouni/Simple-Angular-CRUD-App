import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Icontact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = `http://localhost:9000`; //json-server url

  constructor(private httpClient: HttpClient) { }

  //get all contacts
  public getAllcontacts(): Observable<Icontact[]> {

    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<Icontact[]>(dataURL).pipe(catchError(this.handleError));

  }

  //get 1 contact
  public getContact(contactId: string): Observable<Icontact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<Icontact>(dataURL).pipe(catchError(this.handleError));
  }

  //create contact 
  public createContact(contact:Icontact):Observable<Icontact>{
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<Icontact>(dataURL, contact).pipe(catchError(this.handleError));
  }
  
  //update contact
  public updateContact(contact:Icontact, contactId: string):Observable<Icontact>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<Icontact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  //delete contact
  public deleteContact( contactId: string):Observable<{}>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  //get all groups
  public getAllGroups(): Observable<IGroup[]> {

    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }

  //get 1 group
  public getGroup(contact: Icontact): Observable<IGroup> {
    let dataURL: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  }
  


  public handleError(error: HttpErrorResponse) {

    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      //client error
      errorMessage = ` Error : ${error.error.message}`
    } else {
      //server error
      errorMessage = ` Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
