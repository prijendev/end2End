import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule ,routingComponent} from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';

import { ProjectViewComponent } from './project-view/project-view.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { PubDashboardComponent } from './pub-dashboard/pub-dashboard.component';
import { EmpProjectComponent } from './emp-project/emp-project.component';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    routingComponent,
   
    ProjectViewComponent,
   
    EmpDashboardComponent,
   
    PubDashboardComponent,
   
    EmpProjectComponent,
   
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
