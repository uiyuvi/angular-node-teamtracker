import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockRoutes } from '../add-member/add-member.component.spec';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let locate: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(MockRoutes)],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    locate = TestBed.inject(Location);

    spyOn(localStorage,"getItem").and.returnValue("true");
    fixture.detectChanges();
  });

  it('#home link', fakeAsync(() => {
    let homeLink: HTMLAnchorElement = fixture.nativeElement.querySelector("#home-link");
    homeLink.click();
    tick();
    fixture.detectChanges();
    expect(locate.path()).toBe("/tracker");
  }));

  it('#add team member link', fakeAsync(() => {
    let addLink: HTMLAnchorElement = fixture.nativeElement.querySelector("#add-link");
    addLink.click();
    tick();
    fixture.detectChanges();
    expect(locate.path()).toBe("/addMember");
  }));

});
