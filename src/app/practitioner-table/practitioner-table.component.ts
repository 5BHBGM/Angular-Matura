import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Practitioner } from 'src/models';
import { PractitionerService } from '../practitioner.service';
import { PractitionerTableDataSource} from './practitioner-table-datasource';

@Component({
  selector: 'app-practitioner-table',
  templateUrl: './practitioner-table.component.html',
  styleUrls: ['./practitioner-table.component.css']
})
export class PractitionerTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Practitioner>;
  dataSource: PractitionerTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'edit', 'delete'];

  constructor(private service:PractitionerService) {
    this.dataSource = new PractitionerTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getPractitioners()
  }

  getPractitioners(){
    this.service.getAllPractitioners().subscribe(data =>{
      this.table.dataSource = data;
    })
  }

  humanNameToString(row:Practitioner): string{
    return row.name.map(name => name.prefix.join(" ")+ " " + name.given.join(" ") + " " + " " + name.family + " " + " " + name.suffix.join(" ")).join(";");
  }

  removePractitioner(id:string){    
    this.service.deletePractitionerById(id).subscribe(data =>{
      console.log('deleted');
      this.getPractitioners()
    })
  }
}
