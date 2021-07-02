import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  editForm: FormGroup;
  id: any;
  databaseObj: SQLiteObject;
  priority: any;
  task_name: any;
  assigned_to: any;
  data = { task_name:"", priority:"", assigned_to:""};

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    public  platform:Platform,
    private sqlite: SQLite,

  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.getSong(this.id)
  
   }



  ngOnInit() {   

  }


updateData(){
      console.log(this.data.task_name,this.data.priority,this.data.assigned_to)
     let data= [this.data.task_name,this.data.priority,this.data.assigned_to];
     this.platform.ready().then(() => {
      return new Promise((resolve, reject) => {
       this.sqlite.create({
        name:   'employee.db',
        location: 'default'
      })
      .then((sqLite: SQLiteObject) => {
        this.databaseObj = sqLite;
     return this.databaseObj.executeSql(`UPDATE task SET task_name = ?, priority = ?,assigned_to=?  WHERE id = ${this.id}`, data)
     .then((res)=>{
      this.router.navigateByUrl('/task')
     })
      })
    })
  })
}

  getSong(id) {
    this.platform.ready().then(() => {
      return new Promise((resolve, reject) => {
       this.sqlite.create({
        name:   'employee.db',
        location: 'default'
      })
      .then((sqLite: SQLiteObject) => {
        this.databaseObj = sqLite;
    return this.databaseObj.executeSql('SELECT * FROM task WHERE id = ?', [id])
    .then(res => { 
      if(res.rows.length > 0) {

        this.id =  res.rows.item(0).id,
       this.data.task_name= res.rows.item(0).task_name,  
         this.data.priority=  res.rows.item(0).priority,
         this.data.assigned_to= res.rows.item(0).assigned_to
      }
    });
  })
})
    })
  }
}
