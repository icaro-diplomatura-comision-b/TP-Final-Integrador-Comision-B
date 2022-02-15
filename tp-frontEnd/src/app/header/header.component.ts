import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loguedUser$!:Observable<string>

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loguedUser$ = this.usersService.loguedUser$
  }


}
