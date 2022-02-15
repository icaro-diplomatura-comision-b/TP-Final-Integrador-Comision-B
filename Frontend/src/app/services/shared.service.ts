import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public API_PATH: string = "https://icaro-api-v1.herokuapp.com/api";
  public currentUser!: string;

  constructor() { }
}
