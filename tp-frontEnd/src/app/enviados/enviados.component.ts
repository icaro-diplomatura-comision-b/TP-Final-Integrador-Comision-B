import { Component, OnInit, Input } from '@angular/core';
import { Vista } from '../interfaces/vista.interface';

@Component({
  selector: 'app-enviados',
  templateUrl: './enviados.component.html',
  styleUrls: ['./enviados.component.css']
})
export class EnviadosComponent implements OnInit {

  displayedColumns: string[] = ['remitente', 'destinatario', 'fecha', 'mensaje'];

  constructor() { }

  ngOnInit(): void {
  }

  @Input() listaVistaSent!: Vista[]

}
