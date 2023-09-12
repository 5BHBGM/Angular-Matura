import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PractitionerFormComponent } from './practitioner-form/practitioner-form.component';
import { PractitionerTableComponent } from './practitioner-table/practitioner-table.component';

const routes: Routes = [
  {path:"", component:PractitionerTableComponent},
  {path:"practitioner/:id", component:PractitionerFormComponent},
  {path: "practitioner/new", component:PractitionerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
