import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ScoutpageComponent } from './scoutpage/scoutpage.component';
import { AuthGuard } from './auth.guard';

import { ScoutloginComponent } from './scoutlogin/scoutlogin.component';
import { QuestionComponent } from './question/question.component';
const routes: Routes = [
  { path: '', component: ScoutloginComponent,pathMatch: 'full'},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: ScoutloginComponent },
  {path:'question', component:QuestionComponent},
  {path: '**', component: ScoutpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingC = [SignupComponent, ScoutloginComponent, ScoutpageComponent,QuestionComponent]
