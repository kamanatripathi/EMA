import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { DbService } from '../services/db.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup
  constructor(public router : Router,
    public dbs: DbService,
    public formBuilder: FormBuilder)
   {this.loginForm= this.formBuilder.group({
    email: [''],
    password: [''],
  })  
}
  goRegister(){
    this.router.navigateByUrl('/register');
  }
  login(){
    console.log(this.loginForm.value)
    this.dbs.loginuser(
      this.loginForm.value.email,this.loginForm.value.password
    ).then((res) => {
      console.log(res)
      this.loginForm.reset();
      this.router.navigateByUrl('/task');
    })
    

  }
}
