import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackerRequestsService {

  constructor(private http: HttpClient) { }

  addTeam(team): Observable<any> {
    //'POST' request , "/api/tracker/technologies/add", send team details to backend to add
    return this.http.post("/api/tracker/technologies/add", team).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  getTeams(): Observable<any> {
    //'GET' request , "/api/tracker/technologies/get", get all team names from backend     
    return this.http.get("/api/tracker/technologies/get").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  removeTeam(team): Observable<any> {
    //'DELETE' request , "/api/tracker/technologies/remove/", delete a team name in backend     
    return this.http.delete(`/api/tracker/technologies/remove/${team}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  addMember(member): Observable<any> {
    //'POST' request , "/api/tracker/members/add", send the member details to backend server to add in DB     
    return this.http.post("/api/tracker/members/add", member).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  getMembers(): Observable<any> {
    //'GET' request , "/api/tracker/members/display", get all member details from backend       
    return this.http.get("/api/tracker/members/display").pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

}
