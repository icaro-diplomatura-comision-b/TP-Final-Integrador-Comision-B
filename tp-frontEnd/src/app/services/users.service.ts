import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = 'https://icaro-api-v1.herokuapp.com/api/users';

  private user = new BehaviorSubject<string> ("NotLogged")
  loguedUser$ = this.user.asObservable();

  constructor(private http:HttpClient) { }

  getAllUsers(){
     return this.http.get<User[]>(this.url)
  }

  actUser(user:string){
    this.user.next(user)
  }

  getCurrentUser(){
    return this.user.value;
  }


}
