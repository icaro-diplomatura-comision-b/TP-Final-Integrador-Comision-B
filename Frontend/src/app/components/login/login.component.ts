import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

import { LoggingUser } from 'src/app/interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.fb.group({
    username: "",
    password: "",
  } as LoggingUser, { validators: [Validators.minLength(2), Validators.required] })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService) {

    if (!!this.usersService.getCurrentUser()) {
      this.router.navigateByUrl('/messages/inbox')
    }
  }

  ngOnInit(): void {
  }

  public submitLoginData(): void {
    const loggingUser: LoggingUser = {
      username: this.loginForm.controls["username"].value,
      password: this.loginForm.controls["password"].value
    };

    this.usersService.login(loggingUser);
    this.loginForm.controls["password"].reset();
  }
}
