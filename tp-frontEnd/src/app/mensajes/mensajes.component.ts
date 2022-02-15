import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/users.interface';
import { MensajesService } from '../services/mensajes.service';
import { Mensaje } from '../interfaces/mensajes.interface';
import { Vista } from '../interfaces/vista.interface';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  listaUsuarios: User[] = []
  listaRecibidos: Mensaje[] = []
  listaEnviados: Mensaje[] = []

  listaRecibidosVista: Vista[] = []  // Property Binding a Recibidos
  listaEnviadosVista: Vista[] = []   // Property Binding a Enviados

  constructor(
    private usersService: UsersService,
    private mensajesService: MensajesService,
    ) { }

  ngOnInit(): void {

    //Lleno lista Usuarios
    this.usersService.getAllUsers().subscribe(users =>{
      this.listaUsuarios = users
    })

    // Lleno lista Recibidos
    this.mensajesService.getInboxMessages().subscribe(inbox =>{
      this.listaRecibidos = inbox
    })

    // Lleno lista Enviados
    this.mensajesService.getSentMessages().subscribe(sent =>{
      this.listaEnviados = sent
    })
  }

  ngAfterContentChecked(): void {

    // Vacío y lleno nuevamente RECIBIDOS Vista
    this.listaRecibidosVista = []
    this.listaRecibidos.forEach(item => {
      let sender = this.listaUsuarios.find(element => { return element.id === item.senderId });
      let receiver = this.listaUsuarios.find(element => { return element.id === item.receiverId });
      let recibido: Vista = {
        remitente: `${sender?.firstName} ${sender?.lastName}`,
        destinatario: `${receiver?.firstName}`,
        mensaje: item.text
      }
      this.listaRecibidosVista.push(recibido)
    })

    // Vacío y lleno nuevamente ENVIADOS Vista
    this.listaEnviadosVista = []
    this.listaEnviados.forEach(item => {
      let sender = this.listaUsuarios.find(element => { return element.id === item.senderId });
      let receiver = this.listaUsuarios.find(element => { return element.id === item.receiverId });
      let enviado: Vista = {
        remitente: `${sender?.firstName}`,
        destinatario: `${receiver?.firstName} ${receiver?.lastName}`,
        mensaje: item.text
      }
      this.listaEnviadosVista.push(enviado)
    })

  }

  refreshAll(){
    //Lleno lista Usuarios
    this.usersService.getAllUsers().subscribe(users =>{
      this.listaUsuarios = users
    })

    // Lleno lista Recibidos
    this.mensajesService.getInboxMessages().subscribe(inbox =>{
      this.listaRecibidos = inbox
    })

    // Lleno lista Enviados
    this.mensajesService.getSentMessages().subscribe(sent =>{
      this.listaEnviados = sent
    })
  }

  ngOnDestroy(): void{
  }

}
