import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerform: FormGroup;
  Data: any[] = []
  private db: SQLiteObject

  constructor( 
    private dbs: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    public platform: Platform,
    private sqlite: SQLite,
    private router: Router,) { 
    }

 private register(){
  this.dbs.addTable(
    this.registerform.value.full_name,this.registerform.value.email,this.registerform.value.password,this.registerform.value.mobile_no
  ).then((res) => {
    this.registerform.reset();
    this.router.navigateByUrl('/home')
  })
  
    }
  ngOnInit() {
    this.registerform = this.formBuilder.group({
      full_name: [''],
      password: [''],
      email: [''],
      mobile_no: ['']
    })
  }

  goLogin(){
    this.router.navigateByUrl('/home')
  }
}
