import {Component, OnInit} from '@angular/core';
import {taskToPost} from "../users/taskModel";
import {TaskService} from "../users/task.service";


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public taskToPost: taskToPost = {
    name: "",
    description: ""
  };

  loggedInToggleStartPage:boolean = this.taskService.loggedInToggleTaskPage;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  public saveUser(task: taskToPost) {
    console.log(task)
    if (this.isNotValid(task)){
      throw new Error("Input field can't be nothing")
    } else{
      this.taskService.addUser(task).subscribe(user => {
        console.log(user);
      })
    }


  }

  isNotValid(task: taskToPost): boolean {
    return task.name == "" || task.description == "";
  }
}
