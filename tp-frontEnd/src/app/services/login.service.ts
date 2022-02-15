import { Injectable } from '@angular/core';
import { Loguin } from '../interfaces/login.interface'
import { ResponseLogin } from '../interfaces/response-login.interface'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  url: string = 'https://icaro-api-v1.herokuapp.com/api/login';

  private isLogued: boolean = false;


  constructor(private http: HttpClient) { }

  loginByUser(data:Loguin){
    return this.http.post<ResponseLogin>(this.url,data);
  }

  actLoguin(response:boolean){
    this.isLogued = response;
  }

  getLogued(){  //Guardian
    return this.isLogued;
  }

}
