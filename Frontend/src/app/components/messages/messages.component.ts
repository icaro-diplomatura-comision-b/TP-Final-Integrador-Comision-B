import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private router: Router,
    private usersService: UsersService) {

    if (!this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/home')
    }
  }

  ngOnInit(): void {
  }
}
