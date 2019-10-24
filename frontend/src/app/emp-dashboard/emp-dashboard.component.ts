import { ProjectService } from './../services/project.service';
import { Router } from '@angular/router';
import { AuthenticateService } from './../services/authenticate.service';
import { EmployeerService } from './../services/employeer.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Project } from '../models/project';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css']
})
export class EmpDashboardComponent implements OnInit {

  public emp_list:Project;
  public client_id:string
  
  constructor(private empservice:EmployeerService,private prjservice:ProjectService ,private authservice:AuthenticateService,private router:Router) 
  {
    var skills=JSON.parse(localStorage.getItem('skills'));
    var token=JSON.parse(localStorage.getItem('token'));
    
    this.empservice.getProject(skills,token)
    .pipe(first())
    .subscribe(data=>{

      if(data)
      {
        this.authservice.islogin=true;
        this.emp_list=empservice.empProject;
        this.authservice.flag=JSON.parse(localStorage.getItem('name'));
        
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

  ngOnInit() {
  }

  onSkills(skill:string)
  {
    this.client_id=JSON.parse(localStorage.getItem('client_id'));
    //this.empservice.updateSkills(skill,this.client_id);
    //alert(this.client_id);
  }

  public onProjectClick(itemId : number )
  {
    this.prjservice.id=itemId;
    console.log(itemId);
    this.router.navigate(['/emp_view']);
  }
  

}
