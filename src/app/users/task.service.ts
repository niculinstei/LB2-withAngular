import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {taskModel, taskToPost} from "./taskModel";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private userUrl = 'http://localhost:3000/tasks';
  public loggedInToggleTaskPage = false;
  public loggedInUser: any = {};

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  public getAllTasks(): Observable<taskModel[]> {
    return this.http.get<taskModel[]>(this.userUrl).pipe(tap({
      complete: () => console.log("fetchedTasks")
    }))
  }

  addTask(task: taskToPost): Observable<taskToPost> {
    console.log("inmethod");
    return this.http.post<taskToPost>(this.userUrl, task)
      .pipe(tap((newTask: taskToPost) => console.log(`added task w/ id=${newTask.name}`))
      );
  }

  deletTaskByID(id: number): Observable<taskModel> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<taskModel>(url).pipe(
      tap(_ => console.log(`deleted task id=${id}`))
    );
  }

  updateTask(user: taskModel): Observable<taskModel> {
    console.log("in method2");
    return this.http.put<taskModel>(`${this.userUrl}/${user.id}`, user, this.httpOptions)
      .pipe(tap((newUser: taskModel) => console.log(`updated user w/ id=${newUser.name}`))
      );
  }
}
