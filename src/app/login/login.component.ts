import { Component, OnInit } from '@angular/core';
import { ScoutloginServiceService } from '../scoutlogin-service.service';
import { DatatransferService } from "../datatransfer.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: ScoutloginServiceService,
    private router: Router,
    private datatransfer: DatatransferService,
    private cookie: CookieService) { }

  ngOnInit() {
    if(this.datatransfer.isSignout){
      this.loginb=true
      this.alerttype = "alert alert-success alert-dismissible fade show"
      this.error = "No error so far"
    }else{
      this.loginb = false
    }
  }

  private loginb
  private alerttype
  private error

  loginUser(event) {
    (<HTMLButtonElement>document.querySelector("#loginnnn")).innerText = "Logging in"

    event.preventDefault()
    const target = event.target
    const role = target.querySelector('#role').value
    const name = target.querySelector('#name').value
    const team = target.querySelector('#teamnumberr').value
    const password = target.querySelector('#password').value

    this.Auth.loginUser(role, name, team, password).subscribe(data => {
        if(data.success){
          this.Auth.setLoggedIn(true)
          this.datatransfer.changeMessage(data)

          this.cookie.set("isLog","true");
          this.cookie.set("name", data.name);
          this.cookie.set("match_scouted", String(data.match_scouted));
          this.cookie.set("teamnumber", data.teamnumber);
          this.cookie.set("role", data.role);
          
          this.error = data.message
          this.alerttype = "alert alert-success alert-dismissible fade show"
          this.loginb = false;
          this.router.navigate(['home'])
        }else{
          this.error = data.message
          this.alerttype = "alert alert-danger alert-dismissible fade show"
        }
    })
  }
}
