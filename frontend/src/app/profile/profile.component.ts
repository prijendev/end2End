import { EmployeerService } from './../services/employeer.service';
import { ProjectService } from './../services/project.service';
import { Client } from './../models/client';
import { AuthenticateService } from './../services/authenticate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css']
})
export class ProfileComponent implements OnInit {

  firstname:string;
  lastname:string;
  password:string;
  email1:string;
  contact1:string;
  address1:string;
  company:string;
  skills:string;
  dt:Client
  
  constructor(private royter:Router,private service:AuthenticateService,private empservice:EmployeerService) 
  {
    
      this.dt =JSON.parse(localStorage.getItem('client'));
      
      this.firstname=this.dt.firstname
      this.lastname=this.dt.lastname;
      this.email1=this.dt.email;
      console.log(this.email1);
      this.address1=this.dt.address;
      this.company=this.dt.company;
      this.contact1=this.dt.contact;
    
  }

  ngOnInit() {
  }

  public onEdit(cname:string,fname:string,lname:string,email:string,contact:string,address:string)
  {
    //alert("hii");
     var id=JSON.parse(localStorage.getItem('client_id'));
    //alert(id);
    this.empservice.updateUser(id,cname,fname,lname,email,contact,address)
      .pipe(first())
      .subscribe(data=>{
     
        alert("You profile has  succefully updated");
        
      }); 
  }
}
