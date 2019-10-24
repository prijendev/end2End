import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css']
})


export class HomeComponent implements OnInit {

  constructor(private router:Router) 
  {
    if(localStorage.getItem('token') == null)
    localStorage.setItem('token',localStorage.getItem('client_id'));
   }

  ngOnInit() {
  }

}
