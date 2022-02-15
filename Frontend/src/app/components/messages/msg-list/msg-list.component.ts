import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { MailboxCollection, Message } from 'src/app/interfaces/messages';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css']
})
export class MsgListComponent implements OnInit, OnChanges {

  @Input() identifier!: keyof MailboxCollection

  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.refresh();
  }

  public refresh(): void {
    this.messagesService.refresh(this.identifier);
  }

  public deleteMessage(id: string): void {
    this.messagesService.deleteMessage(id as keyof Message, this.identifier)
  }

  public capitalize(word: string) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }
}


