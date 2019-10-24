import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer, Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private clientsubject : BehaviorSubject<Client>;
  private observer : Observable<Client>;
  public data:any;
  public data1: Client;
  public flag:any;
  public islogin:any
  constructor(private http:HttpClient)
   {
      this.clientsubject=new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('client_id')));
      this.observer=this.clientsubject.asObservable();
      this.islogin=false;
     

   }

   public get  currentClient() : Client
   {
      return this.clientsubject.value;
   }

   login(email:string,password:string)
   {
     return this.http.post<any>(`http://localhost:3000/login`,{email,password})
     .pipe(map(client=>{

      localStorage.removeItem('skills');
      localStorage.removeItem('client_id');

      if(client && client.token)
       {
        //localStorage.setItem('currentClient', JSON.stringify(client.client));
        localStorage.setItem('client_id',JSON.stringify(client.client._id));
        localStorage.setItem('client',JSON.stringify(client.client));
        //alert(localStorage.getItem('skills'));
        //alert(localStorage.getItem('skills'));
        console.log(localStorage.getItem('client_id'));
        localStorage.setItem('token', JSON.stringify(client.token));
        localStorage.setItem('name',JSON.stringify(client.client.firstname));
        this.flag=client.client.firstname;
        console.log(localStorage.getItem('token'));
        this.islogin=true;
        this.clientsubject.next(client);
        
        this.data1=client.client;
      return this.data1;
      }
      
      return "not get any data";
     }))
     
   }

   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentClient');
    this.clientsubject.next(null);
}
}
