# Schema for Athena hard level challenge - Team tracker

`Angular-Nodejs` = A company have seperate team members for different technologies. This application helps to maintain a tracker of those team members. Build an application for admin user who able to login and manage this team tracker application.

`There is default data present in database which contains admin credentials to login`

# Username : Admin
# Password : Fresco@123

# Components

`Add member`

This component should be used to add a member in a team (team should be select from dropdown list of options) and add or remove a team name from dropdown options.

Add Member Form [addMemberForm] : Form fields and its criteria

Employee ID : [required], [min_value_100000], [max_value_3000000]
Employee Name : [required], [pattern](atleast 3 characters, atmost 20     characters, allow alphabtes and spaces only) 
Experience : [required], [min_value_0]
Technology Name : [required]

Edit Technology Form [editTechnologyForm] : Form fields and its criteria

New Option   : [required]
Remove Option : [required]
Add Or Remove  : [required] 

`Login`

This component should be used to log in for admin to manage the teams and its members. It contains login form to enter username and password.

After successfull login,
  set `isLoggedIn` as `true` local storage
  set `token` from backend
  navigete to tracker component

Login Form [loginForm] : Form fields and its criteria

Username : [required]
Password : [required]

`Move member`
This component should be used to move a member from one team to another team by specifying the Employee ID, From Technology Name, To Technology Name.

From and To technology names are the team name of the member currently in and going to respectively.

Move Member Form [moveMemberForm] : Form fields and its criteria

Employee ID : [required]
From Technology : [required]
To Technology : [required]

moving a member should updated in the tracker

`Tracker`
This component should display the team and its member details with edit and remove buttons to update the member details in the tracker and filter options.

It displays the details of all members in different teams or technologies.
It contains filter options to display the team members grouping by technology, experience or both.
Clicking the edit button displays a bootstrap modal to edit the details which should be able update the member details.
Clicking the remove button should delete the member from that team.

# Guard

`AuthGuard`

It is a route guard that tells the router whether it should allow navigation to a requested route or not.

# Service

`Schema Service`

This service is used to make API calls to the back-end NodeJS.
The request URLs and the request methods to be done are present in service file [angular\src\app\service\tracker-requests.service.ts].
NodeJS and MongoDB should be used as backend.

`Backend routes`
/admin/login
/tracker/members/add
/tracker/technologies/get
/tracker/technologies/add
/tracker/technologies/remove/:technology_name
/tracker/members/update/:id
/tracker/members/display
/tracker/members/delete/:id

# TeamTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
