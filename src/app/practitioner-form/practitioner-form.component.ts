import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { omitDeep } from 'lodash-omitdeep';
import { isNil, merge } from 'lodash';
import { Practitioner } from 'src/models';
import { __param } from 'tslib';
import { PractitionerService } from '../practitioner.service';

@Component({
  selector: 'app-practitioner-form',
  templateUrl: './practitioner-form.component.html',
  styleUrls: ['./practitioner-form.component.css']
})
export class PractitionerFormComponent implements OnInit{
  constructor(private fb: FormBuilder, private service: PractitionerService, private route:ActivatedRoute, private router:Router) {}

  currentPractitioner?: Practitioner = undefined;

  getPractitioner(){
    this.route.params.subscribe(params =>{
      this.service.getPractitionerById(params["id"]).subscribe(data =>{
        this.currentPractitioner=data
        console.log(this.currentPractitioner);

        this.practitionerForm.controls.address.clear();
        while (
          this.practitionerForm.controls.address.length <
          (this.currentPractitioner?.address?.length ?? 0)
        ) {
          this.addNewAddress();
        }

        this.practitionerForm.controls.identifier.clear();
        while (
          this.practitionerForm.controls.identifier.length <
          (this.currentPractitioner?.identifier?.length ?? 0)
        ) {
          this.addNewIdentifier();
        }

        this.practitionerForm.controls.name.clear();
        while (
          this.practitionerForm.controls.name.length <
          (this.currentPractitioner?.name?.length ?? 0)
        ) {
          this.addNewName();
        }

        this.practitionerForm.controls.telecom.clear();
        while (
          this.practitionerForm.controls.telecom.length <
          (this.currentPractitioner?.telecom?.length ?? 0)
        ) {
          this.addNewTelecom();
        }

        this.practitionerForm.controls.photo.clear();
        while (
          this.practitionerForm.controls.photo.length <
          (this.currentPractitioner?.photo?.length ?? 0)
        ) {
          this.addNewPhoto();
        }
        
        this.practitionerForm.controls.communication.clear();
        while (
          this.practitionerForm.controls.communication.length <
          (this.currentPractitioner?.communication?.length ?? 0)
        ) {
          this.addNewCommunication();
        }


        this.practitionerForm.patchValue(this.currentPractitioner as any);

        console.log(this.practitionerForm.value);
      })
    });
  }
  
  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      if(params["id"] != "new"){
        this.getPractitioner();
      }
    })    
  }

  practitionerForm = this.fb.group({
    id: new FormControl<string>(""),
    text: this.createTextFormGroup(),
    identifier: new FormArray([this.createIdentiferFormGroup()]),
    name: new FormArray([this.createNameFormGroup()]),
    telecom: new FormArray([this.createTelecomFormGroup()]),
    address: new FormArray([this.createAddressFormGroup()]),
    photo: new FormArray([this.createPhotoFormGroup()]),
    communication: new FormArray([this.createCommunicationFormGroup()]),
    active: new FormControl<boolean>(true),
    gender: new FormControl<string>("male"),
    birthdate: new FormControl<string>("")
  });

  getCodings(form:any) {
    return form.controls.coding.controls;
  }

  getCodingsNested(form:any) {
    return form.controls.code.controls.coding.controls;
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

  createCommunicationFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      coding: new FormArray([this.createCodingFormGroup()]),
      text: new FormControl<string>("")
    })
  }

  createCodingFormGroup():FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      system: new FormControl<string>(""),
      version: new FormControl<string>(""),
      code: new FormControl<string>(""),
      display: new FormControl<string>(""),
      userSelected: new FormControl<boolean>(false)
    })
  }

  createCodeFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl<string>(""),
      coding: new FormArray([this.createCodingFormGroup()]),
      text: new FormControl<string>("")
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
    this.practitionerForm.controls.identifier.push(this.createIdentiferFormGroup());
  }

  addNewAddress(){
      this.practitionerForm.controls.address.push(this.createAddressFormGroup());
  }

  addNewName(){
    this.practitionerForm.controls.name.push(this.createNameFormGroup());
  }

  addNewTelecom(){
    this.practitionerForm.controls.telecom.push(this.createTelecomFormGroup());
  }

  addNewPhoto(){
    this.practitionerForm.controls.photo.push(this.createPhotoFormGroup());
  }
  
  addNewCommunication(){
    this.practitionerForm.controls.communication.push(this.createCommunicationFormGroup());
  }

  removeIdentifier(index:number){
    this.practitionerForm.controls.identifier.removeAt(index);
  }

  removeAddress(index:number){
    this.practitionerForm.controls.address.removeAt(index);
  }

  removeName(index:number){
    this.practitionerForm.controls.name.removeAt(index);
  }

  removeTelecom(index:number){
    this.practitionerForm.controls.telecom.removeAt(index);
  }

  removePhoto(index:number){
    this.practitionerForm.controls.photo.removeAt(index);
  }

  removeCommunication(index:number){
    this.practitionerForm.controls.communication.removeAt(index);
  }

  savePractitioner() {
    // update
    const merged = this.practitionerForm.value;

    const id = merged.id;

    const withoutIds = omitDeep(merged,"id");
    
    // falls server streikt, kann es sein, dass sie die ids
    // rauslöschen müssen - das geht zB so:
    /* const id = merged.id;
    const withoutIds = omitDeep(merged, 'id'); */
    this.service.editPractitionerById({id, ... withoutIds}).subscribe(response => {
      console.log('put', response);
      this.router.navigate(['practitioner/', response.id])
    });
    
    
  }
}
