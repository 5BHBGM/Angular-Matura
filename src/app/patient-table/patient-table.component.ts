import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {Patient} from "../../models";
import { PatientService } from '../patient.service';
import {PatientTableDataSource} from "./patient-table-datasource";

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Patient>;
  dataSource: PatientTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'edit', 'delete'];

  constructor(private service:PatientService) {
    this.dataSource = new PatientTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getPatients()
  }

  getPatients(){
    this.service.getAllPatients().subscribe(data =>{
      this.table.dataSource = data;
    })
  }

  humanNameToString(row:Patient): string{
    return row.name.map(name => name.prefix.join(" ")+ " " + name.given.join(" ") + " " + " " + name.family + " " + " " + name.suffix.join(" ")).join(";");
  }

  removePatient(id:string){
    this.service.deletePatientById(id).subscribe(data =>{
      console.log('deleted');
      this.getPatients()
    })
  }

}
