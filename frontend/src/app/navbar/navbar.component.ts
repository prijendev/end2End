import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  
  styleUrls: ['./navbar.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'

            ]

})
export class NavbarComponent implements OnInit {

  public islogin:any
  public flag:any
  constructor(private router:Router,private service:AuthenticateService)
  {
    if(localStorage.getItem('name'))
    {
      this.flag=JSON.parse(localStorage.getItem('name'));
      this.islogin=true;
    }
    else
    this.islogin=this.service.islogin;
  }

  ngOnInit()
  {
    if(this.service.flag)
    {
      this.flag=this.service.flag;
      this.islogin=this.service.islogin;
    }
  }

  public onLogout()
  {
    this.islogin=false;
    localStorage.setItem('token',localStorage.getItem('name'));
    localStorage.removeItem('name');
    
    
  }
}
