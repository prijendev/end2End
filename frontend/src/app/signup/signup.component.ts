import { AuthenticateService } from './../services/authenticate.service';
import { RegisterService } from '../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {first} from 'rxjs/operators'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
 {

  loginForm:FormGroup;
  registerForm:FormGroup;
  loading=false;
  submitted=false;
  exchange=false;
  

  constructor(private formBuilder: FormBuilder,
              private service:RegisterService,
              private authService:AuthenticateService) 
  {

    if(this.authService.currentClient)
    {

    }
   }

  ngOnInit()
  {
    this.registerForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern('^([a-z A-Z 0-9]{7,12}[@ # $ % ^ & * -]{1})$')]]
    });

    this.loginForm=this.formBuilder.group({
      l_email:['',[Validators.required, Validators.email]],
      p_word:['',[Validators.required, Validators.pattern('^([a-z A-Z 0-9]{7,12}[@ # $ % ^ & * -]{1})$')]]
    });



    
  }

  get builder()
  {
    return this.registerForm.controls;
  }
  
  get login()
  {
    return this.loginForm.controls;
  }
  public onSubmitRegister()
  {
    this.submitted=true;

    if (this.registerForm.invalid)
    {
      return;
    }
    this.exchange=false;
    this.loading=true;
    
    this.service.register(this.registerForm.value).
    pipe(first()).
    subscribe(data=>{
      console.log(data);
    },
    error=>{
      console.log("error");
    });
    
    
  }
  public onSubmitLogin()
  {
    this.submitted=true;
    
    this.loading=true;
    console.log("entered");


    this.authService.login(this.login.l_email.value,this.login.p_word.value)
    .pipe(first())
    .subscribe(data=>{
      console.log(data);
      //navigate
    },error =>{
      //alert message;
    });
    
    
    
   
    
  }
  
  public onChange()
  {
    console.log("onchange");
    this.exchange=true;
  }
}
