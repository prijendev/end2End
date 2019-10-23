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
  public project:Project;
  client_id:string
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
       //slocalStorage.setItem('project', JSON.stringify(project.project));
       
        
       this.data=project.project;
      return this.data;
      
      }

      
     }));

    
    
   }


   pushProject(client_id:string, project_name:string,requirement:string,skills:string,date:Date,budget:number,duration:number,bidtime:number,contact:number)
   {

    console.log(project_name + " " + requirement  + " " + skills + " " + budget+ " " +duration+ " " +bidtime);
  
  
   return this.http.post<any>(`http://localhost:3000/push_project`,{client_id,project_name,skills,requirement,date,budget,duration,bidtime,contact})
     .pipe(map(project=>{

      console.log("called");
      if(project)
      {
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

  getBids(project_id:string)
  {
   
    return this.http.post<any>(`http://localhost:3000/getBid`,{project_id})
      .pipe(map(bid=>{
      if(bid)
      {

       return bid.bids;
      
      }
      else
      {
        
      }
      
      return "nothing";
     }));
  }


  grant(project_id:string,bid_id:string,status:string)
  {
    
    return this.http.post<any>(`http://localhost:3000/grant`,{project_id,bid_id,status})
      .pipe(map(grant=>{
      if(grant && grant.done)
      {

       return grant;
      
      }
      else
      {
        
      }
      
      return "nothing";
     }));
  }


  }
