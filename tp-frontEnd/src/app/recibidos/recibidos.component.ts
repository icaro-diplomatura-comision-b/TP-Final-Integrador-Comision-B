import { Component, OnInit, Input } from '@angular/core';
import { Vista } from '../interfaces/vista.interface';

@Component({
  selector: 'app-recibidos',
  templateUrl: './recibidos.component.html',
  styleUrls: ['./recibidos.component.css']
})
export class RecibidosComponent implements OnInit {

  displayedColumns: string[] = ['remitente', 'destinatario', 'fecha', 'mensaje'];

  constructor() { }

  ngOnInit(): void {
  }


  @Input() listaVistaInbox!: Vista[]


}
