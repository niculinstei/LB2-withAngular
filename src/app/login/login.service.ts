import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {UserModel, UserToPost} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.userUrl).pipe(tap({
      complete: () => console.log("fetchedUsers")
    }))
  }

  postUser(user: UserToPost): Observable<UserToPost> {
    return this.http.post<UserToPost>(this.userUrl, user)
      .pipe(tap((newUser: UserToPost) => console.log(`added task w/ id=${newUser.userName}`))
      );
  }
}
