import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { UsersService } from './users.service';

import { MailboxCollection, Message, NewMessage } from '../interfaces/messages';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private mailboxes: MailboxCollection = {
    inbox: {
      identifier: "inbox",
      data: []
    }, sent: {
      identifier: "sent",
      data: []
    }
  }

  constructor(private http: HttpClient,
    private sharedService: SharedService,
    private usersService: UsersService) { }

  //metodos de solicitud a la API
  private fetchMessages(mailbox: keyof Message): Observable<any> {
    return this.http.get(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages/${mailbox}`);
  }

  private attemptSendMessage(message: NewMessage): Observable<any> {
    return this.http.post(`${this.sharedService.API_PATH}/users/${this.usersService.getCurrentUser()}/messages`, message);
  }

  private attemptDeleteMessage(messageId: keyof Message): Observable<any> {
    return this.http.delete(`${this.sharedService.API_PATH}/messages/${messageId}`)
  }

  //metodos de manejo de datos

  private transformMessages(msgArray: Message[]): Message[] {
    const transformedMsgArray: Message[] = []

    msgArray.forEach((msg: Message) => {
      const transformedMessage: Message = {
        id: msg.id,
        senderId: this.usersService.getUserById(msg.senderId as keyof User),
        receiverId: this.usersService.getUserById(msg.receiverId as keyof User),
        text: msg.text
      }
      transformedMsgArray.push(transformedMessage)
    });
    return transformedMsgArray
  }

  private setMailbox(identifier: keyof MailboxCollection): void {
    const observer = {
      next: (response: any) => {
        this.mailboxes[identifier].data = this.transformMessages(response);
        //console.log(`Lista de mensajes %c"${identifier}"%c desde setMailbox`, "color:red;", "");/////
        //console.log(this.mailboxes[identifier].data);/////////////////////////////////////////
      },
      error: (e: any) => {
        console.log(`ERROR al recuperar los mensajes de ${identifier}`);
        console.log(e);
      }
    }

    this.fetchMessages(identifier as keyof Message).subscribe(observer);
  }

  //metodos publicos

  public refresh(identifier: keyof MailboxCollection): void {
    this.setMailbox(identifier)
  }

  public getMailbox(identifier: keyof MailboxCollection): Message[] {
    return this.mailboxes[identifier].data;
  }

  public sendMessage(newMsg: NewMessage): void {
    const observer = {
      next: (r: any) => {
        console.log("Mensaje enviado con éxito");
      },
      error: (e: any) => {
        console.log(e.error.text);
      }
    }

    this.attemptSendMessage(newMsg).subscribe(observer)
  }

  public deleteMessage(messageId: keyof Message, boxId: keyof MailboxCollection): void {
    const observer = {
      next: (r: any) => {
        this.setMailbox(boxId)
        alert("Message deleted")
      },
      error: (e: any) => {
        console.log(e.error.text);
      }
    }

    this.attemptDeleteMessage(messageId).subscribe(observer)
  }
}
