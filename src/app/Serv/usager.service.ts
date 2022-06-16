import { Injectable } from '@angular/core';
import { IProduit } from '../iproduit';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsagerService {

    /** L'adresse URL du webservice  */
    // url:string = "http://127.0.0.1:8000/webservice/php/bouteille/";
    url:string = environment.baseURl+'usager/';
    constructor(private http:HttpClient) { }


  getUsager(id: any) {
    let httpOption = {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    return this.http.get<IProduit>(this.url+'/getCellier?id='+id, httpOption);
  }

  modifierUsager(data: any) {
    let httpOption = {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    return this.http.put<IProduit>(this.url+'/usager', data, httpOption);
  }
}
