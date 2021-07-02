import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../services/db.service';
import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  task: FormGroup;
  Data: any[] = []
  items: any[];
  databaseObj: SQLiteObject;

  constructor(
    public router: Router,
    private db: DbService,
    private sqlite: SQLite,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    public platform: Platform
    
  ) {
    this.task= this.formBuilder.group({
      task_name: [''],
      priority: [''],
      assigned: [''],
    })
   }
  update(){
    console.log("DFDS ")
}
  

  add(){
    this.db.addtask(
      this.task.value.task_name,
      this.task.value.priority,
      this.task.value.assigned
    ).then((res) => {
      console.log(res)
      this.task.reset();
      this.findAll()
    })
  }


  ngOnInit() {
    this.findAll()
  }
  logout(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  async  delete(id){
    this.deletetask(id)
      let toast = await this.toast.create({
        message: 'Song deleted',
        duration: 2500
      });
      toast.present();     
      this.findAll()
  }
  
  deletetask(id){
    this.platform.ready().then(() => {
      return new Promise((resolve, reject) => {
       this.sqlite.create({
        name:   'employee.db',
        location: 'default'
      })
      .then((sqLite: SQLiteObject) => {
        this.databaseObj = sqLite;
        return this.databaseObj.executeSql('DELETE FROM task WHERE id = ?', [id])
        .then(_ => {
          this.findAll();
        })
      })
      })
    })
  }



  public findAll() {
    this.platform.ready().then(() => {
      return new Promise((resolve, reject) => {
       this.sqlite.create({
        name:   'employee.db',
        location: 'default'
      })
      .then((sqLite: SQLiteObject) => {
        this.databaseObj = sqLite;
        this.databaseObj.executeSql("SELECT * FROM task", []).then((data) => {
        this.items = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              this.items.push(data.rows.item(i));
          }
      }
      console.log(this.items)
  }, (e) => {
      console.log("Error: " + JSON.stringify(e));
  });
})
      })
    })
  }
}
