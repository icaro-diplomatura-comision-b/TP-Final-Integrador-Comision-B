//COMPONENTES

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SidebarComponent } from './components/messages/sidebar/sidebar.component';
import { MsgListComponent } from './components/messages/msg-list/msg-list.component';
import { InboxComponent } from './components/messages/msg-list/inbox/inbox.component';
import { SentComponent } from './components/messages/msg-list/sent/sent.component';
import { NewComponent } from './components/messages/new/new.component';

//MODULOS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//SERVICIOS
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './services/users.service';
import { SharedService } from './services/shared.service';
import { MessagesService } from './services/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    PageNotFoundComponent,
    RegisterComponent,
    InboxComponent,
    SentComponent,
    MessagesComponent,
    NewComponent,
    MsgListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    SharedService,
    UsersService,
    SharedService,
    CookieService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
