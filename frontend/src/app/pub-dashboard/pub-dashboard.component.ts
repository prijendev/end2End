import { AuthenticateService } from './../services/authenticate.service';
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
  constructor(private prjservice:ProjectService,private router:Router,private authservice:AuthenticateService) 
  {

    this.prjservice.getAllData(localStorage.getItem('token'))
    .pipe(first())
    .subscribe(data=>{

      if(data)
      {
        this.authservice.islogin=true;
        this.authservice.flag=JSON.parse(localStorage.getItem('name'));
        this.project_list=data
        console.log(this.project_list);
      }
      else
      {
        localStorage.removeItem('name');
        this.router.navigate(['/signup']);
      }
      
      

      
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

  public onPost(name:string,discription:string,skills:string,budget:number,duration:number,bidtime:number,contact:number)
  {
    console.log('dfgdfgfdgdf');
    console.log(name+ " " +discription+ " " +skills+ " " +budget+ " " +duration+ " " +bidtime);

    
    

    //onsole.log(this.project_list1);

    this._id=localStorage.getItem('client_id');
    var client_id=JSON.parse(this._id);
    var date=new Date();
     this.prjservice.pushProject(client_id ,name,discription,skills,date,budget,duration,bidtime,contact)
    .pipe(first())
    .subscribe(data=>{

    });  
  }
}
