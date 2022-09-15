import {Component, OnInit} from '@angular/core';
import {TaskService} from "./task.service";
import {taskModel} from "./taskModel";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-users',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public loggedInToggleStartPage = false;
  public columnsToDisplay = ['taskName', 'editTaskName','editButton1', 'taskDescription', 'editTaskDescription', 'editButton2', 'taskId', 'deleteButton']
  dataSource = new MatTableDataSource();

  private tasks: taskModel[] = [];

  public taskToEditName: any = {};
  public taskToEditDescription: any = {
  };

  constructor(private userService: TaskService) {
  }

  ngOnInit(): void {
    this.loadUsers();

  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
      console.log(this.tasks);
    });
  }

  deleteUserById(userId: number): void {
    confirm("Wollen sie diesen Eintrag wirkich löschen?")
    this.userService.deleteUserById(userId).subscribe(user => {
      console.log(user)
    });
  }

  editTaskName(taskname: string, id: number, task: taskModel): void {
    const taskToEdit:taskModel = {
      name: taskname,
      description: task.description,
      id: id
    }
    if (taskToEdit){
      console.log(taskToEdit.name)
      this.userService.updateUser(taskToEdit).subscribe(user =>{console.log(user)})
    }

  }

  editTaskDescription(description: string, id: number, task: taskModel): void {
    const taskToEdit:taskModel = {
      name: task.name,
      description: description,
      id: id
    }
    if (taskToEdit){
      console.log(taskToEdit.description)
      this.userService.updateUser(taskToEdit).subscribe(user =>{console.log(user)})
    }
  }

}
