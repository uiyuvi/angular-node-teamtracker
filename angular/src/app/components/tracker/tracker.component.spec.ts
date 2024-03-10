import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TrackerRequestsService } from 'src/app/service/tracker-requests.service';
import { MockAltTrackerService, MockRoutes, MockTrackerService } from '../add-member/add-member.component.spec';

import { TrackerComponent } from './tracker.component';

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;
  let service: TrackerRequestsService;

  let filter2Elm: HTMLInputElement;
  let filterAllElm: HTMLInputElement;
  let filterBtn: HTMLButtonElement;
  let clrfilterBtn: HTMLButtonElement;
  let filterTech:HTMLSelectElement;
  let filterExp:HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, RouterTestingModule.withRoutes(MockRoutes), ReactiveFormsModule],
      declarations: [ TrackerComponent ],
      providers: [
        {provide:TrackerRequestsService, useClass: MockTrackerService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(TrackerRequestsService);

    filter2Elm = fixture.nativeElement.querySelector("#filter-exp-radio");
    filterAllElm = fixture.nativeElement.querySelector("#filter-both-radio");
    filterBtn = fixture.nativeElement.querySelector("#filter-btn");
    clrfilterBtn = fixture.nativeElement.querySelector("#filter-clear-btn");

    spyOn(service,"getTeams").and.callThrough();
    spyOn(service,"getMembers").and.callThrough();
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('#tracker - should display initial UI', () => {
    expect(service.getMembers).toHaveBeenCalled();
    let trackerElm:HTMLElement[] = fixture.nativeElement.querySelectorAll("#tracker-data");
    let teamTitle1:HTMLElement = trackerElm[0].querySelector("div");
    expect(teamTitle1.innerText.trim()).toBe("Team Angular");
    let teamData1:NodeListOf<HTMLTableRowElement> = trackerElm[0].querySelectorAll("tr");
    let memberData11:NodeListOf<HTMLTableCellElement> = teamData1[0].querySelectorAll("td");
    expect(memberData11[0].innerText.trim()).toBe("123456");
    expect(memberData11[1].innerText.trim()).toBe("employee one");
    expect(memberData11[2].innerText.trim()).toBe("1");
    let memberData12:NodeListOf<HTMLTableCellElement> = teamData1[1].querySelectorAll("td");
    expect(memberData12[0].innerText.trim()).toBe("123455");
    expect(memberData12[1].innerText.trim()).toBe("employee two");
    expect(memberData12[2].innerText.trim()).toBe("2");

    let teamTitle2:HTMLElement = trackerElm[1].querySelector("div");
    expect(teamTitle2.innerText.trim()).toBe("Team Nodejs");
    let teamData2:NodeListOf<HTMLTableRowElement> = trackerElm[1].querySelectorAll("tr");
    let memberData21:NodeListOf<HTMLTableCellElement> = teamData2[0].querySelectorAll("td");
    expect(memberData21[0].innerText.trim()).toBe("123454");
    expect(memberData21[1].innerText.trim()).toBe("employee three");
    expect(memberData21[2].innerText.trim()).toBe("3");
  });

});

describe('TrackerComponent - Alternate values', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;
  let service: TrackerRequestsService;

  let filterAllElm: HTMLInputElement;
  let filterBtn: HTMLButtonElement;
  let filterTech:HTMLSelectElement;
  let filterExp:HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, RouterTestingModule.withRoutes(MockRoutes), ReactiveFormsModule],
      declarations: [ TrackerComponent ],
      providers: [
        {provide:TrackerRequestsService, useClass: MockAltTrackerService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(TrackerRequestsService);

    filterAllElm = fixture.nativeElement.querySelector("#filter-both-radio");
    filterBtn = fixture.nativeElement.querySelector("#filter-btn");

    spyOn(service,"getTeams").and.callThrough();
    spyOn(service,"getMembers").and.callThrough();
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('#tracker - should display initial UI', () => {
    expect(service.getMembers).toHaveBeenCalled();
    let trackerElm:HTMLElement[] = fixture.nativeElement.querySelectorAll("#tracker-data");
    let teamTitle1:HTMLElement = trackerElm[0].querySelector("div");
    expect(teamTitle1.innerText.trim()).toBe("Team Data science");
    let teamData1:NodeListOf<HTMLTableRowElement> = trackerElm[0].querySelectorAll("tr");
    let memberData11:NodeListOf<HTMLTableCellElement> = teamData1[0].querySelectorAll("td");
    expect(memberData11[0].innerText.trim()).toBe("234561");
    expect(memberData11[1].innerText.trim()).toBe("employee one");
    expect(memberData11[2].innerText.trim()).toBe("1");
    expect(teamData1[1]).toBeFalsy();

    let teamTitle2:HTMLElement = trackerElm[1].querySelector("div");
    expect(teamTitle2.innerText.trim()).toBe("Team Big data");
    let teamData2:NodeListOf<HTMLTableRowElement> = trackerElm[1].querySelectorAll("tr");
    let memberData21:NodeListOf<HTMLTableCellElement> = teamData2[0].querySelectorAll("td");
    expect(memberData21[0].innerText.trim()).toBe("234541");
    expect(memberData21[1].innerText.trim()).toBe("employee two");
    expect(memberData21[2].innerText.trim()).toBe("3");
    expect(teamData2[1]).toBeFalsy();
    expect(trackerElm[2]).toBeFalsy();
  });

});


describe('TrackerComponent - Testing app loader', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;
  let service: TrackerRequestsService;

  let loaderElm: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, RouterTestingModule.withRoutes(MockRoutes), ReactiveFormsModule],
      declarations: [ TrackerComponent ],
      providers: [
        {provide:TrackerRequestsService, useClass: MockAltTrackerService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TrackerRequestsService);
  });

  it('#tracker - should display initial UI', () => {
    spyOn(service,"getTeams").and.callThrough();
    spyOn(service,"getMembers").and.callThrough();
    loaderElm = fixture.nativeElement.querySelector("#app-loader");    
    expect(loaderElm).toBeFalsy();
    component.ngOnInit();
    fixture.detectChanges();
    loaderElm = fixture.nativeElement.querySelector("#app-loader");    
    expect(service.getTeams).toHaveBeenCalled();
    expect(service.getMembers).toHaveBeenCalled();
    expect(loaderElm).toBeFalsy();
  });

});