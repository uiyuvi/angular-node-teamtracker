import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackerRequestsService } from './tracker-requests.service';
import { MockMembers } from '../components/add-member/add-member.component.spec';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '../interceptor/http-config.interceptor';
import { throwError } from 'rxjs';

const MockTeams = [
  {
    id:1,
    name:"Angular"
  },
  {
    id:2,
    name:"React"
  },
  {
    id:3,
    name:"Nodejs"
  }
];

describe('TrackerRequestsService', () => {
  let httpTesting: HttpTestingController;
  let service: TrackerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        TrackerRequestsService,
        {provide:HTTP_INTERCEPTORS, useClass:HttpConfigInterceptor, multi: true}
      ]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TrackerRequestsService);
  });

  afterEach(() => {
    httpTesting.verify();
  })

  it('#addTeam API request', () => {
    const MockTeam = {technology_name:"React"};
    service.addTeam(MockTeam).subscribe(data => {
      expect(data).toBe(MockTeam);
    });
    const api = httpTesting.expectOne("/api/tracker/technologies/add");
    expect(api.request.method).toEqual("POST");
    expect(api.request.body).toBe(MockTeam);
    api.flush(MockTeam);
  });

  it('#getTeams API request', () => {
    service.getTeams().subscribe(data => {
      expect(data).toBe(MockTeams);
    });
    const api = httpTesting.expectOne("/api/tracker/technologies/get");
    expect(api.request.method).toEqual("GET");
    api.flush(MockTeams);
  });

  it('#removeTeam API request', () => {
    const MockOneTeam = {id:"1",name:"Nodejs"};
    service.removeTeam("Nodejs").subscribe(data => {
      expect(data).toBe(MockOneTeam);
    });
    const api = httpTesting.expectOne("/api/tracker/technologies/remove/"+MockOneTeam.name);
    expect(api.request.method).toEqual("DELETE");
    api.flush(MockOneTeam);
  });

  it('#addMember API request', () => {    
    service.addMember(MockMembers[0]).subscribe(data => {
      expect(data).toEqual({msg:"Added"});
    });
    const api = httpTesting.expectOne("/api/tracker/members/add");
    expect(api.request.method).toEqual("POST");
    expect(api.request.body).toEqual(MockMembers[0]);
    api.flush({msg:"Added"});
  });

  it('#getMembers API request', () => {    
    service.getMembers().subscribe(data => {
      expect(data).toEqual(MockMembers);
    });
    const api = httpTesting.expectOne("/api/tracker/members/display");
    expect(api.request.method).toEqual("GET");
    api.flush(MockMembers);
  });

});
