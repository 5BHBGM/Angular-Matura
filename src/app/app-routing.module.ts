import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractitionerFormComponent } from './practitioner-form/practitioner-form.component';
import { PractitionerTableComponent } from './practitioner-table/practitioner-table.component';
import {PatientTableComponent} from "./patient-table/patient-table.component";
import {PatientFormComponent} from "./patient-form/patient-form.component";

const routes: Routes = [
  {path:"practitioner", component:PractitionerTableComponent},
  {path:"practitioner/:id", component:PractitionerFormComponent},
  {path: "practitioner/new", component:PractitionerFormComponent},
  {path:"patient", component:PatientTableComponent},
  {path:"patient/:id", component:PatientFormComponent},
  {path: "patient/new", component:PatientFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
