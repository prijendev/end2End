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

  constructor(private http:HttpClient)
   {
      this.clientsubject=new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('currentClient')));
      this.observer=this.clientsubject.asObservable();

   }

   public get  currentClient() : Client
   {
      return this.clientsubject.value;
   }

   login(email:string,password:string)
   {
     return this.http.post<any>(`http://localhost:3000/login`,{email,password})
     .pipe(map(client=>{
       if(client && client.token)
       {
        localStorage.setItem('currentClient', JSON.stringify(client));
        this.clientsubject.next(client);
       }
     }))
     
   }

   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentClient');
    this.clientsubject.next(null);
}
}
