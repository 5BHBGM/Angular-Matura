import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practitioner } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  static BASE_PRACTITIONER_URL:string = 'http://localhost:8080/api/practitioner/';

  constructor(private http: HttpClient) { }

  // ALle Practitioner
  public getAllPractitioners(){
    return this.http.get<Practitioner[]>(PractitionerService.BASE_PRACTITIONER_URL);
  }

  // Ein Practitioner
  public getPractitionerById(id:string){
    return this.http.get<Practitioner>(PractitionerService.BASE_PRACTITIONER_URL + id)
  }

  // Einen Practitioner editieren
  public editPractitionerById(practitioner:any){
    return this.http.put<Practitioner>(PractitionerService.BASE_PRACTITIONER_URL + practitioner.id, practitioner)
  }

  //Einen Practitioner löschen
  public deletePractitionerById(id:string){
    return this.http.delete(PractitionerService.BASE_PRACTITIONER_URL + id)
  }

  //Einen Practitioner hinzufügen
  public postPractitioner(practitioner:any){
    return this.http.post<Practitioner>(PractitionerService.BASE_PRACTITIONER_URL, practitioner)
  }
}
