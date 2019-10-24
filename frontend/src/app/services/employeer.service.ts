import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  public empProject:Project
  constructor(private http:HttpClient)
  {

  }

  
  getProject(skills:string,token:string)
  {
    
    return this.http.post<any>(`http://localhost:3000/skill_data`,{skills,token})
      .pipe(map(project=>{
      if(project)
      {

       /*  console.log(project.project); */
        
      this.empProject=project.project;
      return (this.empProject);
      }
      else
      {
        localStorage.removeItem('token');
      }
      
      return "nothing";
     }));
  }

  updateUser(_id:number,company:string,firstname:string,lastname:string,email:string,contact:string,address:string)
  {
    //alert(company);
    return this.http.post<any>(`http://localhost:3000/us_update `,{_id,company,firstname,lastname,email,contact,address})
    .pipe(map(project=>{
    //alert("updated");
    }));
  }

  bidOnProject(client_id:string ,project_id:string,client_name:string,
    rating:number,proposal:string,date:Date,budget:number,duration:number,contact:number)
  {
    alert("You have succefully bid on project");
    return this.http.post<any>(`http://localhost:3000/push_bid`,{client_id ,project_id,
                                                                client_name,rating,proposal,
                                                                date,budget,duration,contact})
      .pipe(map(project=>{
       alert("inserted");
    }));
  }

}
