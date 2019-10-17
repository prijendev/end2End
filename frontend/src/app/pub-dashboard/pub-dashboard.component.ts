import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { first } from 'rxjs/operators';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-pub-dashboard',
  templateUrl: './pub-dashboard.component.html',
  styleUrls: ['./pub-dashboard.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css']
})
export class PubDashboardComponent implements OnInit {

  project_list:Project
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

}
