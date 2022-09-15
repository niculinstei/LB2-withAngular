import {Component, OnInit} from '@angular/core';
import {TaskService} from "../users/task.service";
import {Router} from "@angular/router";
import {UserModel, UserToPost} from "./user.model";
import {LoginService} from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public password: any = "";
  public username: any = "";
  users: UserModel[] = [];

  constructor(public taskService: TaskService, private router: Router, private loginService: LoginService) {
  }

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

  public postData(userName: string, pw: string): void {
    if (this.validatePassword(pw)) {
      let userToPost: UserToPost = {
        userName: userName,
        pw: pw
      }
      this.loginService.postUser(userToPost).subscribe((user) => {
        this.taskService.loggedInUser = user;
      });
      this.taskService.loggedInToggleTaskPage = true;
      this.router.navigate(['/Menu'])
      alert("succesful registred");
    } else {
      alert("password should contain at least 8 chars, 1 special symbol, 1 Capital and 1 lower Case")
    }
  }

  private validatePassword(pw: string): boolean {
    var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    return re.test(pw);
  }

  public logOut() {
    this.taskService.loggedInUser = {};
    this.taskService.loggedInToggleTaskPage = false;
    this.router.navigate(['/Menu'])
  }
}
