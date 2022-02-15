import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

import { NewUser } from 'src/app/interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public newUserForm: FormGroup = this.fb.group({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    country: "",
    city: ""
  } as NewUser, { validators: [Validators.minLength(2), Validators.required] })

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

  public submitNewUser(): void {
    const newUser: NewUser = {
      username: this.newUserForm.controls["username"].value,
      firstName: this.newUserForm.controls["firstName"].value,
      lastName: this.newUserForm.controls["lastName"].value,
      password: this.newUserForm.controls["password"].value,
      country: this.newUserForm.controls["country"].value,
      city: this.newUserForm.controls["city"].value
    };

    this.usersService.registerUser(newUser);
    this.newUserForm.controls["password"].reset();
  }
}
