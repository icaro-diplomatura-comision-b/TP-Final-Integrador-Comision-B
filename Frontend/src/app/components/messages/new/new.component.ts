import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from 'src/app/services/users.service';
import { MessagesService } from 'src/app/services/messages.service';

import { User } from 'src/app/interfaces/users';
import { NewMessage } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {

  public usersList!: User[];
  public newMsgForm: FormGroup = this.fb.group({
    receiverId: "",
    text: ""
  } as NewMessage, { validators: [Validators.minLength(2), Validators.required] });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private messagesService: MessagesService) {

    this.getUsers();
  }

  ngOnInit(): void {
  }

  private getUsers(): void {
    this.usersList = this.usersService.getUsersList()
  }

  public submitNewMessage(): void {
    const message: NewMessage = {
      receiverId: this.newMsgForm.controls["receiverId"].value,
      text: this.newMsgForm.controls["text"].value
    }

    this.messagesService.sendMessage(message)
    this.newMsgForm.controls["receiverId"].setValue("")
    this.newMsgForm.controls["text"].setValue("")
  }
}
