import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  
  styleUrls: ['./navbar.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'

            ]

})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
