import { EmployeerService } from './../services/employeer.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Bid } from '../models/Bid';
import { ProjectService } from '../services/project.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-emp-project',
  templateUrl: './emp-project.component.html',
  styleUrls: ['./emp-project.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css']
})
export class EmpProjectComponent implements OnInit {

  p_data:Project
  bid_list:Bid
  _id:string
  
  constructor(private prjservice:ProjectService,private router:Router,private empservice:EmployeerService) 
  {
    this.prjservice.getData(prjservice.id)
    .pipe(first())
    .subscribe(data=>{
      this.p_data=data
     // console.log(this.p_data);
      
    },error =>{
      //alert message;
    });
   }

  ngOnInit() {
  }

  public onBid(name:string,proposal:string,budget:number,duration:number,contact:number)
  {
   // console.log('dfgdfgfdgdf');
    console.log(name+  " " +budget+ " " +duration);

    
    

    //onsole.log(this.project_list1);

    this._id=localStorage.getItem('client_id');
    var client_id=JSON.parse(this._id);
    var rating=4;
    //var client_name=JSON.parse(localStorage.getItem('name'));
    var date=new Date();
     this.empservice.bidOnProject(client_id ,this.prjservice.id,name,rating,proposal,date,budget,duration,contact)
    .pipe(first())
    .subscribe(data=>{

    });  
  }
  
}
