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

  public columnsToDisplay = ['taskName', 'editTaskName', 'editButton1', 'taskDescription', 'editTaskDescription', 'editButton2', 'taskId', 'deleteButton']
  dataSource = new MatTableDataSource();


  private tasks: taskModel[] = [];

  public taskToEditName: any = {};
  public taskToEditDescription: any = {};

  constructor(private taskService: TaskService) {
  }

  public loggedIn: boolean = this.taskService.loggedInToggleTaskPage;

  ngOnInit(): void {
    this.loadTasks();

  }

  private loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      let tasksFromUser: taskModel[] = [];
      for (let task of tasks){
        if (task.userId == this.taskService.loggedInUser.id){
          tasksFromUser.push(task);
        }
      }
      console.log(tasksFromUser);
      this.dataSource.data = tasksFromUser;
      console.log(this.tasks);
    });
  }

  deleteTaskById(taskId: number): void {
    confirm("Wollen sie diesen Eintrag wirkich löschen?")
    this.taskService.deletTaskByID(taskId).subscribe(task => {
      console.log(task)
    });
  }

  editTaskName(taskname: string, id: number, task: taskModel): void {
    const taskToEdit: taskModel = {
      name: taskname,
      description: task.description,
      id: id,
      userId: this.taskService.loggedInUser.id
    }
    if (taskToEdit) {
      console.log(taskToEdit.name)
      this.taskService.updateTask(taskToEdit).subscribe(user => {
        console.log(user)
      })
    }

  }

  editTaskDescription(description: string, id: number, task: taskModel): void {
    const taskToEdit: taskModel = {
      name: task.name,
      description: description,
      id: id,
      userId: this.taskService.loggedInUser.id
    }
    if (taskToEdit) {
      console.log(taskToEdit.description)
      this.taskService.updateTask(taskToEdit).subscribe(user => {
        console.log(user)
      })
    }
  }


}
