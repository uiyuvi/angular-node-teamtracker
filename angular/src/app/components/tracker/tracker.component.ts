import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TrackerRequestsService } from 'src/app/service/tracker-requests.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  Technologies = [];
  seperateTeam: any[];

  editMemberForm: FormGroup;  
  loader: boolean;

  constructor(private _service: TrackerRequestsService, private _formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    //display the loader till the tracker data fetch and display in view
    //configure the form builder of 'editMemberForm' by adding validators
    this.editMemberForm = this._formBuilder.group({
      _id: null,
      employee_id: [''],
      employee_name: [''],
      experience: [''],
    });    
    // get tracker data from service
  }

  getTeams() {
    //get team names from service and store in array to display in dropdown
  }

  getAllMembers() {
    //get details of team members to display in tracker by calling service function - 'getMembers'
  }

}
