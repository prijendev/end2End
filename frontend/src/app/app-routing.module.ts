import { ProfileComponent } from './profile/profile.component';
import { EmpProjectComponent } from './emp-project/emp-project.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { PubDashboardComponent } from './pub-dashboard/pub-dashboard.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'publisher',component:PubDashboardComponent},
  {path:'project_view',component:ProjectViewComponent},
  {path:'employeer',component:EmpDashboardComponent},
  {path:'emp_view',component:EmpProjectComponent},
  {path:'profile',component:ProfileComponent},
  {
    path: 'home',
    component:HomeComponent,

  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[SignupComponent]