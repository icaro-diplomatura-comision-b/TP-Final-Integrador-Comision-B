import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../interfaces/mensajes.interface';
import { UsersService } from './users.service';
import { Nuevo } from '../interfaces/nuevo.interface';
import { ResponseAll } from '../interfaces/responseAll.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  url: string = 'https://icaro-api-v1.herokuapp.com/api';

  constructor(
    private http: HttpClient,
    private usersService: UsersService
    ) { }

  getInboxMessages(){
    let urlInbox = `${this.url}/users/${this.usersService.getCurrentUser()}/messages/inbox`
    return this.http.get<Mensaje[]>(urlInbox)
  }

  getSentMessages(){
    let urlSent = `${this.url}/users/${this.usersService.getCurrentUser()}/messages/sent`
    return this.http.get<Mensaje[]>(urlSent)
  }

  sentNewMessage(data:Nuevo){
    let urlNew = `${this.url}/users/${this.usersService.getCurrentUser()}/messages`
    return this.http.post<ResponseAll>(urlNew,data);
  }
}

