import { Project } from './../models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  public data:any
  public id:any
  private proj : BehaviorSubject<Project>;
  constructor(private http:HttpClient)
   {
    //this.proj = new BehaviorSubject<Project>(JSON.parse(localStorage.getItem('project')));
    }

   getData(id:String)
   {
     console.log(id);

     return this.http.post<any>(`http://localhost:3000/prj_data`,{id})
      .pipe(map(project=>{
      if(project)
      {
       localStorage.setItem('project', JSON.stringify(project.project));
       //console.log(localStorage.getItem('token'));
      
       this.data=project.project;
      return this.data;
      
      }

      
     }));

     
    
   }

   getAllData(tk:string)
  {
    var token=JSON.parse(tk);
    return this.http.post<any>(`http://localhost:3000/prj_all`,{token})
      .pipe(map(project=>{
      if(project)
      {

       localStorage.setItem('project', JSON.stringify(project.project));
       //console.log(localStorage.getItem('token'));
      
       this.data=project.project;
      return this.data;
      
      }
      else
      {
        localStorage.removeItem('token');
      }
      
      return "nothing";
     }));
  }
  }
