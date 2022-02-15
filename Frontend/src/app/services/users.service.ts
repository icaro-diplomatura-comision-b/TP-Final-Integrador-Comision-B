import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { CookieService } from 'ngx-cookie-service';

import { NewUser, User, LoggingUser } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersList!: User[];

  constructor(private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private cookies: CookieService) {

    this.usersList = this.getUsersList()
  }

  //metodos de la solicitud a la API
  private attemptLogin(user: LoggingUser): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/login`, user);
  }

  public attemptRegisterUser(newUser: NewUser): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users`, newUser);
  }

  private fetchUsers(): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users`);
  }

  //metodos de manejo de datos
  private setUsersList(): void {
    const fetched: User[] = []
    const observer = {
      next: (response: any) => {
        response.forEach((element: User) => {//////////////////////////////////cambiar este forEach por una asignacion
          fetched.push(element)
        });
        //console.log("Lista de %cusuarios%c desde getUsersList()", "color:red;", ""); /////
        //console.log(fetched); /////////////////////////////////////
      },
      error: (e: any) => {
        console.log("ERROR al recuperar los usuarios");
        console.log(e);
      }
    }

    this.fetchUsers().subscribe(observer);
    this.usersList = fetched
  }

  //metodos publicos
  public getUsersList(): User[] {
    this.setUsersList()
    return this.usersList;
  }

  public getUserById(id: keyof User): keyof User {
    return this.usersList.find((x) => x.id === id)?.username as keyof User
  }

  public login(user: LoggingUser): void {
    const observer = {
      next: (r: any) => {
        if (!r.loginSuccesful) {
          alert("Incorrect username or password. Please try again.")
          return
        }
        this.setCurrentUser(user.username as keyof LoggingUser)
        this.router.navigateByUrl('/messages/inbox')
      },
      error: (e: any) => {
        alert("Please enter a valid username and password")
        console.log(e.error.text);
      }
    }

    this.attemptLogin(user).subscribe(observer)
  }

  public registerUser(newUser: NewUser): void {
    const observer = {
      next: (r: any) => {
        alert("Registration succesful");
        console.log("Usuario registrado con éxito");
        this.login({
          username: newUser.username,
          password: newUser.password
        });
      },
      error: (e: any) => {
        alert(e.error.text)
        console.log(e.error.text);
      }
    }

    this.attemptRegisterUser(newUser).subscribe(observer)
  }

  //metodos de cookies
  public setCurrentUser(token: keyof User): void {
    this.cookies.set("username", token, undefined, "/");
    this.sharedService.currentUser = token;
    //console.log(`currentUser = ${token}`);/////////////////////
  }

  public clearCurrentUser(): void {
    this.cookies.delete("username", "/");
    this.sharedService.currentUser = "";
    //console.log(`currentUser cleared`);////////////
  }

  public getCurrentUser(): string {
    this.sharedService.currentUser = this.cookies.get("username");
    return this.sharedService.currentUser;
  }
}
