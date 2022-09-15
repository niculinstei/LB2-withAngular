import { Component, OnInit } from '@angular/core';
import {StartPageComponent} from "../start-page/start-page.component";
import {TaskService} from "../users/task.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public password: any = ""
  public username: any = "";

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    console.log("component")
  }

  public checkData(username:string, passowrd: string): void{
    //validation
    this.taskService.loggedInToggleTaskPage = true;
  }

}
