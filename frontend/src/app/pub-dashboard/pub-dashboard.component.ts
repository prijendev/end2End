import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { first } from 'rxjs/operators';
import { isDefined } from '@angular/compiler/src/util';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-pub-dashboard',
  templateUrl: './pub-dashboard.component.html',
  styleUrls: ['./pub-dashboard.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css']
})
export class PubDashboardComponent implements OnInit {

  project_list:Project
 
  _id:string
  constructor(private prjservice:ProjectService,private router:Router) 
  {

    this.prjservice.getAllData(localStorage.getItem('token'))
    .pipe(first())
    .subscribe(data=>{

      if(data)
      {
        this.project_list=data
        console.log(this.project_list);
      }
      else
      this.router.navigate(['/signup']);
      

      
    },error =>{
      //alert message;
    });
    
  }
    
   


  ngOnInit()
  {

  }

  public onProjectClick(itemId : number )
  {
    this.prjservice.id=itemId;
    console.log(itemId);
    this.router.navigate(['/project_view']);
  }

  public onPost(name:string,discription:string,skills:number,budget:number,duration:number,bidtime:number)
  {
    console.log('dfgdfgfdgdf');
    console.log(name+ " " +discription+ " " +skills+ " " +budget+ " " +duration+ " " +bidtime);

    
    

    //onsole.log(this.project_list1);

    this._id=localStorage.getItem('client_id');
    var client_id=JSON.parse(this._id);
    var date=new Date();
     this.prjservice.pushProject(client_id ,name,discription,skills,date,budget,duration,bidtime)
    .pipe(first())
    .subscribe(data=>{

    });  
  }
}
