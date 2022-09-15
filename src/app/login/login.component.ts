import {Component, OnInit} from '@angular/core';
import {StartPageComponent} from "../start-page/start-page.component";
import {TaskService} from "../users/task.service";
import {AppRoutingModule} from "../app-routing.module";
import {Router} from "@angular/router";
import {UserModel} from "./user.model";
import {LoginService} from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public password: any = "";
  public username: any = "";


  constructor(public taskService: TaskService, private router: Router, private loginService: LoginService) {
  }

  users: UserModel[] = [];

  ngOnInit(): void {
    console.log("component")
  }

  public checkData(username: string, password: string): void {
    this.getAllUsers();
    console.log(username + password)
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userName == username && this.users[i].pw == password) {
        this.taskService.loggedInUser = this.users[i];
        this.taskService.loggedInToggleTaskPage = true;
        this.router.navigate(['/Menu'])
      }
    }
    if (!this.taskService.loggedInToggleTaskPage) {
      alert("Wrong Password or Username")
    }
  }

  private getAllUsers() {
    this.loginService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

}
