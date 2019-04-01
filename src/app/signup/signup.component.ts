import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../signup-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error="No error so far"
  alerttype = "alert alert-success alert-dismissible fade show"
  constructor(private Auth: SignupServiceService,
              private router: Router) { }

  ngOnInit() {
  }
  signupScout(event) {
    event.preventDefault()
    const target = event.target
    const role=target.querySelector("#role").value
    const name = target.querySelector('#name').value
    const team = target.querySelector('#teamnumber').value
    const password = target.querySelector('#password').value
    const passwordc = target.querySelector('#passwordc').value
    const check = target.querySelector('#check').checked
 
    this.Auth.getUserInfo(role, name, team, password, passwordc,check).subscribe(data => {
      if (data.success) {
        //this.router.navigate(['signup'])
        this.Auth.setLoggedIn(true)
        this.error = data.message
        this.alerttype = "alert alert-success alert-dismissible fade show"
      } else {
        this.alerttype = "alert alert-danger alert-dismissible fade show"
        this.error=data.message
      }
    })
    //console.log(role,name, team,password,passwordc,check)
  }

}
