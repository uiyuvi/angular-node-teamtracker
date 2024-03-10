import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerRequestsService {

  constructor(private http: HttpClient) { }

  addTeam(team): Observable<any> {
    return; //'POST' request , "/api/tracker/technologies/add", send team details to backend to add
  }

  getTeams(): Observable<any> {
    return; //'GET' request , "/api/tracker/technologies/get", get all team names from backend     
  }

  removeTeam(team): Observable<any> {
    return; //'DELETE' request , "/api/tracker/technologies/remove/", delete a team name in backend     
  }

  addMember(member): Observable<any> {
    return; //'POST' request , "/api/tracker/members/add", send the member details to backend server to add in DB     
  }

  getMembers(): Observable<any> {
    return; //'GET' request , "/api/tracker/members/display", get all member details from backend          
  }

}
