import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { PatientFormComponent } from './patient-form.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";

describe('PatientFormComponent', () => {
  let component: PatientFormComponent;
  let fixture: ComponentFixture<PatientFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFormComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientFormComponent]
    });
    fixture = TestBed.createComponent(PatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
