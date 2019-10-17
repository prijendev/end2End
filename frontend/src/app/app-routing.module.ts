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