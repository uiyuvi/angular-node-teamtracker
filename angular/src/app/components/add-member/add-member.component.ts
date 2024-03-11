import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackerRequestsService } from 'src/app/service/tracker-requests.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


// Asynchronous custom validator function to validate the range of a field
export function asyncRangeValidator(minValue: number, maxValue: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    return new Observable((observer) => {
      // Simulate an asynchronous operation (e.g., API call)
      if (value !== null && (isNaN(value) || value < minValue || value > maxValue)) {
        observer.next({ 'range': true }); // Validation failed
      } else {
        observer.next(null); // Validation passed
      }
      observer.complete();
    });
  };
}

export function asyncMinValueValidator(minValue: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    return new Observable((observer) => {
      // Simulate an asynchronous operation (e.g., API call)
      if (value !== null && (isNaN(value) || value < minValue)) {
        observer.next({ 'minValue': true }); // Validation failed
      } else {
        observer.next(null); // Validation passed
      }
      observer.complete();
    });
  };
}


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  addMemberForm: FormGroup;
  editTechnologyForm: FormGroup;
  Technologies = [];

  //validation message for addMemberForm fields
  idRequiredError = "ID is required";
  idMinMaxError = "The employee ID range should be between 10000 and 300000";
  nameRequiredError = "Name is required";
  namePatternError = "Invalid name";
  experienceRequiredError = "Experience is required";
  experienceMinError = "Invalid experience";
  technologyNameRequiredError = "Technology is required";

  constructor(private _formBuilder: FormBuilder, private _service: TrackerRequestsService, private route: Router) { }

  ngOnInit(): void {
    //configure the form builder for addMemberForm by adding validators
    this.addMemberForm = this._formBuilder.group({
      employee_id: ['', Validators.required, asyncRangeValidator(100000, 300000)],
      employee_name: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]{3,20}$')
        ]
      ],
      experience: ['', Validators.required, asyncMinValueValidator(0)],
      technology_name: ['', Validators.required]
    });
    this.editTechnologyForm = this._formBuilder.group({
      newOption: ['', Validators.required],
      removeOption: ['', Validators.required],
      addOrRemove: ['add', Validators.required]
    });
    this.getTeams();

  }

  addMember() {
    //add member in a team by calling the service function -  'addMember'
    //after successful adding of a member, an alert "Team member added successfully" should display
    //or else an alert of error should display 'Member with same name already exists'
    this._service.addMember(this.addMemberForm.value).subscribe(() => {
      alert("Team member added successfully");
      this.route.navigate(['/tracker'])
    }, (error) => alert("Member with same name already exists"))

  }

  getTeams() {
    //fetch the technology names from service and store in 'Technologies' array to dispaly in dropdown options
    this._service.getTeams().subscribe((teams) => this.Technologies = teams, (error) => console.log(error))
  }

  updateDropdown() {
    //add or remove the technology names in dropdown by calling service function
    //'addTeam' to add technology and 'removeTeam' to remove technology
    //after the successfull adding, an alert 'Team added successfully' should display
    //after the successfull removing, an alert 'Team removed successfully' should display   
    //after updation, it should reflect in the dropdown 
    if (this.editTechnologyForm.controls['addOrRemove'].value === 'remove') {
      this._service.removeTeam(this.editTechnologyForm.controls['removeOption'].value).subscribe(() => {
        alert("Team removed successfully");
        this.getTeams();
      }, (error) => alert("unable to remove team"))
    }

    if (this.editTechnologyForm.controls['addOrRemove'].value === 'add') {
      this._service.addTeam({ technology_name: this.editTechnologyForm.controls['newOption'].value }).subscribe(() => {
        alert("Team added successfully");
        this.getTeams();
      }, (error) => alert("Team could not be added"))
    }

  }

}
