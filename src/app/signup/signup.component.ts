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
    (<HTMLDivElement>document.querySelector("#start_spinner")).style.display = "none"

  }
  signupScout(event) {
    event.preventDefault()
    const target = event.target
    const role=target.querySelector("#roleee").value
    const name = target.querySelector('#nameee').value
    const team = target.querySelector('#teamnumberrr').value
    const password = target.querySelector('#passworddd').value
    const passwordc = target.querySelector('#passwordccc').value
    const check = target.querySelector('#checkkk').checked
 
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
