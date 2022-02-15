import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { Destinatario } from '../interfaces/destinatario.interface';
import { FormControl, Validators } from '@angular/forms';
import { Nuevo } from '../interfaces/nuevo.interface';
import { MensajesService } from  '../services/mensajes.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  listaDestinatarios:Destinatario[] = []
  selectedId:any
  selectControl = new FormControl('', Validators.required);
  textareaControl = new FormControl('', Validators.required);
  listControl = new FormControl('', Validators.required);

  constructor(
    private mensajesService: MensajesService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
  }

  @Input() listaUsuariosNuevo!: User[]

  addDestinatario(){
    let destinatario = this.listaUsuariosNuevo.find(element => { return element.id === this.selectedId });
    let nuevo: Destinatario = {
                                id: `${destinatario?.id}`,
                                firstName: `${destinatario?.firstName}`,
                                lastName: `${destinatario?.lastName}`
                              }
    this.listaDestinatarios.push(nuevo)
  }

  removeDestinatario(indice:number){
    this.listaDestinatarios.splice(indice,1)
  }

  enviarMensaje(){
    if(this.listaDestinatarios.length == 0){
      console.log("FALTA AGREGAR DESTINATARIOS")
    }else if(this.textareaControl.value == "" ){
      console.log("No escribio nada!")
    }else{
      //Recorro lista Destinatarios y Envío
      this.listaDestinatarios.forEach(item => {
        let nuevo:Nuevo = {
                          receiverId: item.id,
                          text: this.textareaControl.value
                          }
        this.mensajesService.sentNewMessage(nuevo).subscribe(all =>{
          console.log(all)
        })
      })
      console.log("Mensaje Enviado!")
      this.listaDestinatarios = []
      this.textareaControl.clearValidators()
      this.textareaControl.setValue('')
      this.selectedId = undefined
    }
  }


}
