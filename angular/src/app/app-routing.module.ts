import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { TrackerComponent } from './components/tracker/tracker.component';

const routes: Routes = [  
  {
    path:'tracker',
    component:TrackerComponent    
  },
  {
    path:'addMember',
    component:AddMemberComponent    
  },
  {
    path:'',
    redirectTo:'tracker',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [  
  AddMemberComponent,
  TrackerComponent
]