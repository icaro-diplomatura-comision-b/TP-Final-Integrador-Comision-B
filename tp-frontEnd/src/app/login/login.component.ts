import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Loguin } from '../interfaces/login.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl('',Validators.required),
    pass: new FormControl('',Validators.required)
  })

  body:Loguin = {
    username:'',
    password:''
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    if((this.loginForm.get('user')?.value == '') || (this.loginForm.get('pass')?.value == '')){
      console.log("No ingreso algun dato!") //Mostrar por pantalla
    }else{
      this.body.username = this.loginForm.get('user')?.value;
      this.body.password = this.loginForm.get('pass')?.value;
      this.loginService.loginByUser(this.body)
      .subscribe(response => {
        if(response.loginSuccesful){
          console.log(response.message); //Mostrar por pantalla
          this.loginService.actLoguin(response.loginSuccesful);
          this.userService.actUser(this.body.username);
          this.router.navigate(['mensajes']);
        }
        else{
          console.log(response.message); //Mostrar por pantalla
          this.loginService.actLoguin(false);
          this.userService.actUser("NotLogged");
        }
      })
    }
  }


}


