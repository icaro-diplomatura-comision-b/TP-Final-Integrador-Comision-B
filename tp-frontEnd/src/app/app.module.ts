import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module'
import { HttpClientModule } from '@angular/common/http';


//Components
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecibidosComponent } from './recibidos/recibidos.component';
import { EnviadosComponent } from './enviados/enviados.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { RegistracionComponent } from './registracion/registracion.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MensajesComponent,
    PageNotFoundComponent,
    RecibidosComponent,
    EnviadosComponent,
    NuevoComponent,
    RegistracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
