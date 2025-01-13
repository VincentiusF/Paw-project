import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { response } from 'express';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'mongodb://mdp:BelajarMongo2024@cluster0-shard-00-00.n214x.mongodb.net:27017,cluster0-shard-00-01.n214x.mongodb.net:27017,cluster0-shard-00-02.n214x.mongodb.net:27017/dbbuku?ssl=true&replicaSet=atlas-107w2z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
  // private url: string = environment.api + 'users/';
  private subjectExecuteUser = new Subject<string>();

  constructor(public http: HttpClient) {}

  //observeable, subject
  executeUserListener() {
    return this.subjectExecuteUser.asObservable();
  }

  addUser(email: string, password: string) {
    const user: User = {
      _id: null,
      email: email,
      password: password,
    };

    this.http.post<{ message: string }>(this.url, user).subscribe(
      (response) => {
        console.log(response);
        this.subjectExecuteUser.next(response.message);
      },
      (error) => {
        console.log(error);
        this.subjectExecuteUser.next(error.error.message);
      }
    );
  }
}
