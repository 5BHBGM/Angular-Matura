import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  static BASE_Patient_URL:string = 'http://localhost:8080/api/patient/';

  constructor(private http: HttpClient) { }

  // ALle Patient
  public getAllPatients(){
    return this.http.get<Patient[]>(PatientService.BASE_Patient_URL);
  }

  // Ein Patient
  public getPatientById(id:string){
    return this.http.get<Patient>(PatientService.BASE_Patient_URL + id)
  }

  // Einen Patient editieren
  public editPatientById(patient:any){
    return this.http.put<Patient>(PatientService.BASE_Patient_URL + patient.id, patient)
  }

  //Einen Patient löschen
  public deletePatientById(id:string){
    return this.http.delete(PatientService.BASE_Patient_URL + id)
  }

  //Einen Patient hinzufügen
  public postPatient(patient:any){
    return this.http.post<Patient>(PatientService.BASE_Patient_URL, patient)
  }
}
