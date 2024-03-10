import { Component, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { TrackerRequestsService } from 'src/app/service/tracker-requests.service';
import { AddMemberComponent } from './add-member.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: ''
})
export class MockComponent implements OnInit {
  ngOnInit() { }
}

export const MockRoutes = [
  {
    path: "tracker",
    component: MockComponent
  },
  {
    path: "addMember",
    component: MockComponent
  },
  {
    path: "moveMember",
    component: MockComponent
  }
]

export const MockTeams = [
  {
    id: 1,
    name: "Angular"
  },
  {
    id: 2,
    name: "React"
  },
  {
    id: 3,
    name: "Nodejs"
  }
];

export const MockMembers = [
  {
    _id: 1,
    employee_id: 123456,
    employee_name: "employee one",
    experience: 1,
    technology_name: "Angular"
  },
  {
    _id: 2,
    employee_id: 123455,
    employee_name: "employee two",
    experience: 2,
    technology_name: "Angular"
  },
  {
    _id: 3,
    employee_id: 123454,
    employee_name: "employee three",
    experience: 3,
    technology_name: "Nodejs"
  }
];

const MockFilterMembers = [
  {
    _id: 1,
    employee_id: 123456,
    employee_name: "employee one",
    experience: 1,
    technology_name: "Angular"
  },
  {
    _id: 2,
    employee_id: 123455,
    employee_name: "employee two",
    experience: 2,
    technology_name: "Angular"
  }
];

const MockFilterMembers2 = [
  {
    _id: 2,
    employee_id: 123455,
    employee_name: "employee two",
    experience: 2,
    technology_name: "Angular"
  },
  {
    _id: 3,
    employee_id: 123454,
    employee_name: "employee three",
    experience: 3,
    technology_name: "Nodejs"
  }
];

export class MockTrackerService {

  adminLogin(credentials): Observable<any> {
    return of({ token: "token" });
  }

  getTeams(): Observable<any> {
    return of(MockTeams);
  }

  addMember(member): Observable<any> {
    return of({ msg: "added" });
  }

  updateMember(member): Observable<any> {
    return of({ msg: "updated" });
  }

  removeMember(id): Observable<any> {
    return of({ msg: "removed" });
  }

  getMembers(): Observable<any> {
    return of(MockMembers);
  }

  filterMembersByTechnology(technology): Observable<any> {
    return of(MockFilterMembers);
  }

  filterMembersByExperience(exp): Observable<any> {
    return of(MockFilterMembers2);
  }

  filterMembersByBoth(exp): Observable<any> {
    return of(MockFilterMembers);
  }

}

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;
  let service: TrackerRequestsService;
  let locate: Location;

  let idElm: HTMLInputElement;
  let nameElm: HTMLInputElement;
  let expElm: HTMLInputElement;
  let techElm: HTMLSelectElement;

  let addBtn: HTMLButtonElement;
  let resetBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule.withRoutes(MockRoutes)],
      declarations: [AddMemberComponent],
      providers: [
        { provide: TrackerRequestsService, useClass: MockTrackerService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    locate = TestBed.inject(Location);

    service = TestBed.inject(TrackerRequestsService);

    component.ngOnInit();

    idElm = fixture.nativeElement.querySelector("#emp-id");
    nameElm = fixture.nativeElement.querySelector("#emp-name");
    expElm = fixture.nativeElement.querySelector("#emp-exp");
    techElm = fixture.nativeElement.querySelector("#emp-tech");

    addBtn = fixture.nativeElement.querySelector("#add-btn");
    resetBtn = fixture.nativeElement.querySelector("#reset-btn");
    fixture.detectChanges();
  });

  it('#should display initial UI', () => {
    expect(idElm).toBeTruthy(); expect(nameElm).toBeTruthy();
    expect(expElm).toBeTruthy(); expect(techElm).toBeTruthy();
    expect(techElm.options[1].value).toEqual('Angular');
    expect(techElm.options[2].value).toEqual('React');
    expect(techElm.options[3].value).toEqual('Nodejs');
    let idError: HTMLElement = fixture.nativeElement.querySelector("#invalid-id");
    let nameError: HTMLElement = fixture.nativeElement.querySelector("#invalid-name");
    let expError: HTMLElement = fixture.nativeElement.querySelector("#invalid-exp");
    let techError: HTMLElement = fixture.nativeElement.querySelector("#invalid-tech");
    expect(idError).toBeFalsy(); expect(nameError).toBeFalsy();
    expect(expError).toBeFalsy(); expect(techError).toBeFalsy();
    expect(addBtn.disabled).toBeTruthy(); expect(resetBtn.disabled).toBeTruthy();
  });

  it('#ID validation error', () => {
    idElm.value = ''; idElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let idError: HTMLElement = fixture.nativeElement.querySelector("#invalid-id");
    expect(idError.innerText.trim()).toBe('ID is required');
    idElm.valueAsNumber = 333; idElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(idError.innerText.trim()).toBe('The employee ID range should be between 10000 and 300000');
    idElm.valueAsNumber = 3333333; idElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(idError.innerText.trim()).toBe('The employee ID range should be between 10000 and 300000');
  });

  it('#Name validation error', () => {
    nameElm.value = ''; nameElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let nameError: HTMLElement = fixture.nativeElement.querySelector("#invalid-name");
    expect(nameError.innerText.trim()).toBe('Name is required');
    nameElm.value = 'employee1'; nameElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(nameError.innerText.trim()).toBe('Invalid name');
    nameElm.value = 'employee#123'; nameElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(nameError.innerText.trim()).toBe('Invalid name');
  });

  it('#Experience validation error', () => {
    expElm.value = ''; expElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let expError: HTMLElement = fixture.nativeElement.querySelector("#invalid-exp");
    expect(expError.innerText.trim()).toBe('Experience is required');
    expElm.valueAsNumber = -1; expElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(expError.innerText.trim()).toBe('Invalid experience');
  });

  it('#Technology validation error', () => {
    techElm.value = ''; techElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    let techError: HTMLElement = fixture.nativeElement.querySelector("#invalid-tech");
    expect(techError.innerText.trim()).toBe('Technology is required');
  });

  it('#addMemberForm - invalid and valid form', () => {
    idElm.valueAsNumber = 2333; idElm.dispatchEvent(new Event('input'));
    nameElm.value = 'employee$'; nameElm.dispatchEvent(new Event('input'));
    expElm.valueAsNumber = 2; expElm.dispatchEvent(new Event('input'));
    techElm.value = techElm.options[1].value; techElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.addMemberForm.invalid).toBeTrue();
    expect(addBtn.disabled).toBeTrue();

    idElm.valueAsNumber = 1111111; idElm.dispatchEvent(new Event('input'));
    nameElm.value = 'employee three'; nameElm.dispatchEvent(new Event('input'));
    expElm.valueAsNumber = -1; expElm.dispatchEvent(new Event('input'));
    techElm.value = techElm.options[1].value; techElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.addMemberForm.invalid).toBeTrue();
    expect(addBtn.disabled).toBeTrue();

    idElm.valueAsNumber = 123454; idElm.dispatchEvent(new Event('input'));
    nameElm.value = 'employee three'; nameElm.dispatchEvent(new Event('input'));
    expElm.valueAsNumber = 2; expElm.dispatchEvent(new Event('input'));
    techElm.value = techElm.options[1].value; techElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.addMemberForm.invalid).toBeFalse();
    expect(addBtn.disabled).toBeFalse();
  });

  it('#addMemberForm - add member', fakeAsync(() => {
    const spyAlert = spyOn(window, 'alert');
    spyOn(component, 'addMember').and.callThrough();
    spyOn(service, 'addMember').and.callThrough();
    idElm.valueAsNumber = 123454; idElm.dispatchEvent(new Event('input'));
    nameElm.value = 'employee three'; nameElm.dispatchEvent(new Event('input'));
    expElm.valueAsNumber = 2; expElm.dispatchEvent(new Event('input'));
    techElm.value = techElm.options[1].value; techElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    addBtn.click();
    tick();
    expect(component.addMember).toHaveBeenCalled();
    expect(service.addMember).toHaveBeenCalledWith({ employee_id: 123454, employee_name: 'employee three', experience: 2, technology_name: 'Angular' });
    expect(spyAlert).toHaveBeenCalledWith("Team member added successfully");
    expect(locate.path()).toBe('/tracker');
  }));

});

/**********************************************************************************************************************************/

//const errorResponse: HttpErrorResponse = new HttpErrorResponse('Member with same name already exists');

export class MockErrorTrackerService {

  getTeams(): Observable<any> {
    return of(MockTeams);
  }

  adminLogin(credentials): Observable<any> {
    return throwError("Username or password is wrong");
  }

  addMember(member): Observable<any> {
    return throwError("Member with same name already exists");
  }

}

describe('AddMemberComponent - ErrorResponse', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;
  let service: TrackerRequestsService;

  let idElm: HTMLInputElement;
  let nameElm: HTMLInputElement;
  let expElm: HTMLInputElement;
  let techElm: HTMLSelectElement;

  let addBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule.withRoutes(MockRoutes)],
      declarations: [AddMemberComponent],
      providers: [
        { provide: TrackerRequestsService, useClass: MockErrorTrackerService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(TrackerRequestsService);

    component.ngOnInit();

    idElm = fixture.nativeElement.querySelector("#emp-id");
    nameElm = fixture.nativeElement.querySelector("#emp-name");
    expElm = fixture.nativeElement.querySelector("#emp-exp");
    techElm = fixture.nativeElement.querySelector("#emp-tech");

    addBtn = fixture.nativeElement.querySelector("#add-btn");
    fixture.detectChanges();
  });

  it('#addMemberForm - add member already exists error response', fakeAsync(() => {
    const spyAlert = spyOn(window, 'alert');
    spyOn(component, 'addMember').and.callThrough();
    spyOn(service, 'addMember').and.callThrough();
    idElm.valueAsNumber = 123454; idElm.dispatchEvent(new Event('input'));
    nameElm.value = 'employee three'; nameElm.dispatchEvent(new Event('input'));
    expElm.valueAsNumber = 2; expElm.dispatchEvent(new Event('input'));
    techElm.value = techElm.options[1].value; techElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    addBtn.click();
    tick();
    expect(component.addMember).toHaveBeenCalled();
    expect(service.addMember).toHaveBeenCalledWith({ employee_id: 123454, employee_name: 'employee three', experience: 2, technology_name: 'Angular' });
    expect(spyAlert).toHaveBeenCalledWith("Member with same name already exists");
  }));

});

/****************************************************************************************************************************************************************/

const MockAltTeams = [
  {
    id: "1",
    name: "Data science"
  },
  {
    id: "2",
    name: "Big data"
  }
];

export const MockAltMembers = [
  {
    _id: 1,
    employee_id: 234561,
    employee_name: "employee one",
    experience: 1,
    technology_name: "Data science"
  },
  {
    _id: 3,
    employee_id: 234541,
    employee_name: "employee two",
    experience: 3,
    technology_name: "Big data"
  }
];

const MockAltFilterMembers = [
  {
    _id: 1,
    employee_id: 234561,
    employee_name: "employee one",
    experience: 1,
    technology_name: "Data science"
  }
]

export class MockAltTrackerService {

  addTeam(team): Observable<any> {
    return of({ msg: "added" });
  }

  getTeams(): Observable<any> {
    return of(MockAltTeams);
  }

  getMembers(): Observable<any> {
    return of(MockAltMembers);
  }

  removeTeam(team): Observable<any> {
    return of({ msg: "removed" });
  }

  filterMembersByBoth(exp): Observable<any> {
    return of(MockAltFilterMembers);
  }

}

describe('AddMemberComponent - editTechnologyForm', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;
  let service: TrackerRequestsService;

  let addRadio: HTMLInputElement;
  let removeRadio: HTMLInputElement;
  let addElm: HTMLInputElement;
  let removeElm: HTMLSelectElement;
  let techElm: HTMLSelectElement;

  let updateBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule.withRoutes(MockRoutes)],
      declarations: [AddMemberComponent],
      providers: [
        { provide: TrackerRequestsService, useClass: MockAltTrackerService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(TrackerRequestsService);

    component.ngOnInit();

    addRadio = fixture.nativeElement.querySelector("#tech-add-radio");
    removeRadio = fixture.nativeElement.querySelector("#tech-remove-radio");
    techElm = fixture.nativeElement.querySelector("#emp-tech");

    updateBtn = fixture.nativeElement.querySelector("#update-btn");
    fixture.detectChanges();
  });

  it('#initial UI for edit dropdown', () => {
    expect(techElm.options[1].value).toEqual('Data science');
    expect(techElm.options[2].value).toEqual('Big data');
    expect(techElm.options[3]).toBeFalsy();
    expect(addRadio.checked).toBeTrue();
    expect(removeRadio.checked).toBeFalse();
    expect(updateBtn.disabled).toBeTrue();
  });

  it('#add team to dropdown', fakeAsync(() => {
    const spyAlert = spyOn(window, 'alert');
    spyOn(component, 'updateDropdown').and.callThrough();
    spyOn(service, 'addTeam').and.callThrough();
    spyOn(service, 'getTeams').and.callThrough();
    addElm = fixture.nativeElement.querySelector("#tech-add");
    addElm.value = "Angular"; addElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    updateBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.updateDropdown).toHaveBeenCalled();
    expect(service.addTeam).toHaveBeenCalledWith({ technology_name: "Angular" });
    expect(spyAlert).toHaveBeenCalledWith("Team added successfully");
    expect(service.getTeams).toHaveBeenCalled();
  }));

  it('#remove team from dropdown', fakeAsync(() => {
    const spyAlert = spyOn(window, 'alert');
    spyOn(component, 'updateDropdown').and.callThrough();
    spyOn(service, 'removeTeam').and.callThrough();
    spyOn(service, 'getTeams').and.callThrough();
    removeRadio.click();
    tick();
    fixture.detectChanges();
    removeElm = fixture.nativeElement.querySelector("#tech-remove");
    removeElm.value = removeElm.options[2].value; removeElm.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    updateBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.updateDropdown).toHaveBeenCalled();
    expect(service.removeTeam).toHaveBeenCalledWith("Big data");
    expect(spyAlert).toHaveBeenCalledWith("Team removed successfully");
    expect(service.getTeams).toHaveBeenCalled();
  }));

});