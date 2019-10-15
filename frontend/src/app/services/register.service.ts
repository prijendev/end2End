import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient)
   { }

   register(client:Client)
   {
      console.log(client.firstname);
      return this.http.post(`http://localhost:3000/register`,client);
   }

   
}
