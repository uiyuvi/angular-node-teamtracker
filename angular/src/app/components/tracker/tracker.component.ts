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
  members = [];
  seperateTeam: any[] = [];

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
    this.getTeams();
    this.getAllMembers();
  }

  getTeams() {
    //get team names from service and store in array to display in dropdown
    this._service.getTeams().subscribe((teams) => this.Technologies = teams)
  }

  getAllMembers() {
    //get details of team members to display in tracker by calling service function - 'getMembers'
    this._service.getMembers().subscribe((members) => {
      this.members = members;
      this.Technologies.forEach(team => {
        this.seperateTeam[team.name] = [];
      });
      members.forEach(member => {
        const teamName = member.technology_name;
        if (this.seperateTeam[teamName]) {
          this.seperateTeam[teamName].push(member);
        }
      });
    })
  }

}
