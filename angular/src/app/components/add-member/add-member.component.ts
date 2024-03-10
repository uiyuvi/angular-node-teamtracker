import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackerRequestsService } from 'src/app/service/tracker-requests.service';

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

  constructor(private _formBuilder: FormBuilder, private _service: TrackerRequestsService) { }

  ngOnInit(): void {
    //configure the form builder for addMemberForm by adding validators
    this.addMemberForm = this._formBuilder.group({
      employee_id: [''],
      employee_name: [''],
      experience: [''],
      technology_name: ['']
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
  }

  getTeams() {
    //fetch the technology names from service and store in 'Technologies' array to dispaly in dropdown options
  }

  updateDropdown() {
    //add or remove the technology names in dropdown by calling service function
    //'addTeam' to add technology and 'removeTeam' to remove technology
    //after the successfull adding, an alert 'Team added successfully' should display
    //after the successfull removing, an alert 'Team removed successfully' should display   
    //after updation, it should reflect in the dropdown 
  }

}
