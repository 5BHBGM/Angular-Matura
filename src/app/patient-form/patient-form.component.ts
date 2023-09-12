import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PatientService} from "../patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../models";
import {omitDeep} from "lodash-omitdeep";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit{
  constructor(private fb: FormBuilder, private service: PatientService, private route:ActivatedRoute, private router:Router) {}

  currentPatient?: Patient = undefined;

  getPatient(){
    this.route.params.subscribe(params =>{
      this.service.getPatientById(params["id"]).subscribe(data =>{
        this.currentPatient=data
        console.log(this.currentPatient);

        this.patientForm.controls.address.clear();
        while (
          this.patientForm.controls.address.length <
          (this.currentPatient?.address?.length ?? 0)
          ) {
          this.addNewAddress();
        }

        this.patientForm.controls.identifier.clear();
        while (
          this.patientForm.controls.identifier.length <
          (this.currentPatient?.identifier?.length ?? 0)
          ) {
          this.addNewIdentifier();
        }

        this.patientForm.controls.name.clear();
        while (
          this.patientForm.controls.name.length <
          (this.currentPatient?.name?.length ?? 0)
          ) {
          this.addNewName();
        }

        this.patientForm.controls.telecom.clear();
        while (
          this.patientForm.controls.telecom.length <
          (this.currentPatient?.telecom?.length ?? 0)
          ) {
          this.addNewTelecom();
        }

        this.patientForm.controls.photo.clear();
        while (
          this.patientForm.controls.photo.length <
          (this.currentPatient?.photo?.length ?? 0)
          ) {
          this.addNewPhoto();
        }

        this.patientForm.controls.generalPractitioner.clear();
        while (
          this.patientForm.controls.generalPractitioner.length <
          (this.currentPatient?.generalPractitioner?.length ?? 0)
          ) {
          this.addNewGeneralPractitioner();
        }


        this.patientForm.patchValue(this.currentPatient as any);

        console.log(this.patientForm.value);
      })
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      if(params["id"] != "new"){
        this.getPatient();
      }
    })
  }

  patientForm = this.fb.group({
    id: new FormControl<string>(""),
    text: this.createTextFormGroup(),
    identifier: new FormArray([this.createIdentiferFormGroup()]),
    name: new FormArray([this.createNameFormGroup()]),
    telecom: new FormArray([this.createTelecomFormGroup()]),
    address: new FormArray([this.createAddressFormGroup()]),
    photo: new FormArray([this.createPhotoFormGroup()]),
    generalPractitioner: new FormArray([this.createGeneralPractitionerFormGroup()]),
    active: new FormControl<boolean>(true),
    gender: new FormControl<string>("male"),
    birthdate: new FormControl<string>("")
  });

  getRefences(form:any) {
    return form.controls.references.controls;
  }

  getRefencesNested(form:any) {
    return form.controls.refence.controls;
  }

  getLines(form:any){
    return form.controls.line.controls;
  }

  getGiven(form:any){
    return form.controls.given.controls;
  }

  getPrefix(form:any){
    return form.controls.prefix.controls;
  }

  getSuffix(form:any){
    return form.controls.suffix.controls;
  }

  getIdentifier(form:any){
    return form.controls.identifier.controls;
  }

  createFormControl(): FormControl{
    return new FormControl<string>("");
  }

  createTextFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      status: new FormControl<string>("generated"),
      div: new FormControl<string>("")
    })
  }

  createGeneralPractitionerFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      reference: new FormControl<string>(""),
      type: new FormControl<string>(""),
      text: new FormControl<string>(""),
      display: new FormControl<string>("")
    })
  }

  createPhotoFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      contenttype: new FormControl<string>(""),
      language: new FormControl<string>(""),
      data: new FormControl<string>(""),
      url: new FormControl<string>(""),
      size: new FormControl<number>(0),
      hash: new FormControl<string>(""),
      title: new FormControl<string>(""),
      creation: new FormControl<string>("")
    })
  }

  createAddressFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      use: new FormControl<string>(""),
      type: new FormControl<string>(""),
      text: new FormControl<string>(""),
      line: new FormArray([this.createFormControl()]),
      city: new FormControl<string>(""),
      district: new FormControl<string>(""),
      state: new FormControl<string>(""),
      postalCode: new FormControl<number>(0),
      country: new FormControl<string>(""),
      period: this.createPeriodFormGroup()
    })
  }

  createTelecomFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      system: new FormControl<string>(""),
      value: new FormControl<string>(""),
      use: new FormControl<string>(""),
      rank: new FormControl<number>(0),
      period: this.createPeriodFormGroup()
    })
  }

  createNameFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      use: new FormControl<string>(""),
      text: new FormControl<string>(""),
      family: new FormControl<string>(""),
      given: new FormArray([this.createFormControl()]),
      prefix: new FormArray([this.createFormControl()]),
      suffix: new FormArray([this.createFormControl()]),
      period: this.createPeriodFormGroup()
    });
  }

  createIdentiferFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      use : new FormControl<string>("official"),
      system: new FormControl<string>(""),
      value: new FormControl<string>(""),
      period: this.createPeriodFormGroup(),
      assigner: new FormControl<string>("")
    })
  }

  createPeriodFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      start: new FormControl<string>(""),
      end: new FormControl<string>("")
    })
  }

  addNewIdentifier(){
    this.patientForm.controls.identifier.push(this.createIdentiferFormGroup());
  }

  addNewAddress(){
    this.patientForm.controls.address.push(this.createAddressFormGroup());
  }

  addNewName(){
    this.patientForm.controls.name.push(this.createNameFormGroup());
  }

  addNewTelecom(){
    this.patientForm.controls.telecom.push(this.createTelecomFormGroup());
  }

  addNewPhoto(){
    this.patientForm.controls.photo.push(this.createPhotoFormGroup());
  }

  addNewGeneralPractitioner(){
    this.patientForm.controls.generalPractitioner.push(this.createGeneralPractitionerFormGroup());
  }

  removeIdentifier(index:number){
    this.patientForm.controls.identifier.removeAt(index);
  }

  removeAddress(index:number){
    this.patientForm.controls.address.removeAt(index);
  }

  removeName(index:number){
    this.patientForm.controls.name.removeAt(index);
  }

  removeTelecom(index:number){
    this.patientForm.controls.telecom.removeAt(index);
  }

  removePhoto(index:number){
    this.patientForm.controls.photo.removeAt(index);
  }

  removeGeneralPractitioner(index:number){
    this.patientForm.controls.generalPractitioner.removeAt(index);
  }

  savePatient() {
    const merged = this.patientForm.value;

    const id = merged.id;
    const withoutIds = omitDeep(merged, "id");

    if (this.router.url.includes('new')) {
      // Create a new patient
      this.service.postPatient(withoutIds).subscribe(response => {
        console.log('post', response);
        this.router.navigate(['patient/', response.id]);
      });
    } else {
      // Update existing patient
      this.service.editPatientById({id, ...withoutIds}).subscribe(response => {
        console.log('put', response);
        this.router.navigate(['patient/', response.id]);
      });
    }
  }

}

