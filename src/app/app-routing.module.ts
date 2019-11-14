import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ScoutpageComponent } from './scoutpage/scoutpage.component';
import { AuthGuard } from './auth.guard';

import { ScoutloginComponent } from './scoutlogin/scoutlogin.component';
import { QuestionComponent } from './question/question.component';
import { LoginComponent} from './login/login.component'
const routes: Routes = [
  { path: '', component: LoginComponent,pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: ScoutloginComponent },
  {path:'question', component:QuestionComponent},
  {path: '**', component: ScoutpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingC = [SignupComponent, ScoutloginComponent, ScoutpageComponent,QuestionComponent]
