import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { PatientTableComponent } from './patient-table.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";

describe('PatientTableComponent', () => {
  let component: PatientTableComponent;
  let fixture: ComponentFixture<PatientTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientTableComponent]
    });
    fixture = TestBed.createComponent(PatientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
