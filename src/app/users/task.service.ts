import {catchError, Observable, of} from 'rxjs';
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

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<taskModel[]> {
    return this.http.get<taskModel[]>(this.userUrl).pipe(tap({
      complete: () => console.log("fetchedUsers")
    }))
  }

  addUser(user: taskToPost): Observable<taskToPost> {
    console.log("inmethod");
    return this.http.post<taskToPost>(this.userUrl, user)
      .pipe(tap((newUser: taskToPost) => console.log(`added tip w/ id=${newUser.name}`))
      );
  }

  deleteUserById(id: number): Observable<taskModel> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<taskModel>(url).pipe(
      tap(_ => console.log(`deleted user id=${id}`))
    );
  }

  updateUser(user: taskModel): Observable<taskModel> {
    console.log("in method2");
    return this.http.put<taskModel>(`${this.userUrl}/${user.id}`, user, this.httpOptions)
      .pipe(tap((newUser: taskModel) => console.log(`updated user w/ id=${newUser.name}`))
      );
  }
}
