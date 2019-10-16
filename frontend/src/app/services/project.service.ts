import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public data:any
  constructor(private http:HttpClient)
   { }

   getData()
   {
     return this.http.post<any>(`http://localhost:3000/project`,{})
     .pipe(map(project=>{
      if(project)
      {
       localStorage.setItem('project', JSON.stringify(project.client));
       console.log(localStorage.getItem('token'));
      
       this.data=JSON.stringify(project.project);
      return this.data;
      
      }
     }))

     return "nothing";
   }
  }
