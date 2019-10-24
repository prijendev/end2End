import { AuthenticateService } from './../services/authenticate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  email:string;
  contact:string;
  address:string;
  company:string;
  skills:string;
  
  constructor(private royter:Router,private service:AuthenticateService) 
  {
    
    this.firstname=service.data1.firstname;
    this.lastname=service.data1.lastname;
    this.email=service.data1.email;
    this.address=service.data1.address;
    this.company=service.data1.company;
    this.contact=service.data1.contact;
  }

  ngOnInit() {
  }

}
