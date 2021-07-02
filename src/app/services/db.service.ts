import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Task } from './employee';

export interface Employee {
  emp_id: number ;
  full_name: string;
  email: string;
  password: string;
  mobile_no: number;
}
@Injectable({
  providedIn: 'root'
})


export class DbService {
  private storage: SQLiteObject;
  // Task = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  databaseObj: SQLiteObject;
  items: any[];

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private HttpClient: HttpClient,
    private sqlPorter: SQLitePorter,

  ) {
    this.platform.ready().then(() => {
      return new Promise((resolve, reject) => {
       this.sqlite.create({
        name:   'employee.db',
        location: 'default'
      })
      .then((sqLite: SQLiteObject) => {
        this.databaseObj = sqLite;
        console.log('freaky_datatable Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
      console.log("created")
    })
   })


  }


  // Create table
  createTable() {
    this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS user_registration  (empid INTEGER AUTO_INCREMENT PRIMARY KEY, full_name varchar(255) , email varchar(255), password varchar(255), mobile_no int(10))`,
     [])
      .then(() => {
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  addTable(full_name, email,password,mobile_no) {
    this.createTable()
    let data = [full_name, email,password,mobile_no];
    return this.databaseObj.executeSql('INSERT INTO user_registration (full_name, email,password,mobile_no) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      // this.getSongs();
      console.log(res)

      console.log("added to the table")
    });
  }

  loginuser(email,password): Promise<any>{
    console.log(email,password)
    return this.databaseObj.executeSql('select *  from user_registration where email=? and password=?', [email,password])
    .then((res) => {
      console.log(res)
      console.log("got it to the table")
      return{
        email: res.rows.item(0).email,
        password: res.rows.item(0).password,
        full_name: res.rows.item(0).full_name
      }

    });
  }
  createTable2() {
    this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS task  ( id INTEGER PRIMARY KEY AUTOINCREMENT, task_name varchar(255) , priority varchar(255), assigned_to varchar(255))`,
     [])
      .then(() => {
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  addtask(task_name, priority,assigned_to) {
    this.createTable2()
    let data = [task_name, priority,assigned_to];
    return this.databaseObj.executeSql('INSERT INTO task (task_name, priority,assigned_to) VALUES (?, ?, ?)', data)
    .then(res => {
      // this.getSongs();
      console.log(res)
      console.log("added to the table")
    });
  }

  public findAll() {
      this.databaseObj.executeSql("SELECT * FROM task", []).then((data) => {
        let items : Task[] = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                this.items.push(data.rows.item(i));
            }
        }
        console.log(this.items)
    }, (e) => {
        console.log("Error: " + JSON.stringify(e));
    });
}

  // Update




}
