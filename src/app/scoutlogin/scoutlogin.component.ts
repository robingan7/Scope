import { Component, OnInit } from '@angular/core';
import { ScoutloginServiceService } from '../scoutlogin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'scoutlogin',
  templateUrl: './scoutlogin.component.html',
  styleUrls: ['./scoutlogin.component.css']
})
export class ScoutloginComponent implements OnInit {
  error = "No error so far"
  loginb = true
  scoutb = false
  managerb = false;
  name="Robin"
  role="M"
  match_scouted=3
  teamnumber="5805"
  alerttype = "alert alert-success alert-dismissible fade show"

  private bs = [{ id:"#isWH",b:true},
    { id: "#isSensor", b: true },
    { id: "#isImage", b: true },
    { id: "#isAT", b: true },
    { id: "#isAA", b: true },
    { id: "#isTA", b: true },
    { id: "#isSpeed", b: true },
    { id: "#isEndgame", b: true },
    { id: "#isStr", b: true },
    { id: "#isDri", b: true },
    { id: "#isQ", b: true },
    { id: "#isN", b: true }]
  constructor(private Auth: ScoutloginServiceService,
              private router: Router) { 
                /*
                setInterval(()=>{
                  this.Auth.getPitForm(this.name, this.teamnumber).subscribe(data => {
                    const split = data.m.split('/')
                    var count = 0;
                    for (var i = 0; i < this.bs.length; i++) {
                      for (var i2 = 0; i2 < split.length; i2++) {
                        if (this.bs[i].id == split[i2]) {
                          count++;
                        }
                      }
                      if (count > 0) {
                        this.bs[i].b = false
                      } else {
                        this.bs[i].b = true
                      }
                      count=0
                    }
                  })
                },1000)*/
              }

  ngOnInit() {
    
  }

  updatePitForm(){
    const test="/#12/#14/#13"
    this.Auth.getPitForm(this.name, this.teamnumber).subscribe(data => {
      const split = data.m.split('/')
      for (var i = 0; i < this.bs.length; i++) {
        for (var i2 = 0; i2 < split.length; i2++) {
          if (this.bs[i].id == split[i2]) {
            this.bs[i].b = false
          }
        }
      }
    })  
    const split=test.split('/')
    console.log(split[0])
  }
  editPit(event){
    event.preventDefault()
    const ids = ['#isWH','#isSensor', '#isImage', '#isAT', '#isAA', '#isTA'
      ,'#isSpeed', '#isEndgame', '#isStr', '#isDri', '#isQ', '#isN']
    const target = event.target
    const falseElement = ids.filter(id => target.querySelector(id).checked==false)
    this.Auth.editPit(falseElement,this.name,this.teamnumber).subscribe(data=>{
      //console.log(data)
      const split = data.m.split('/')
      var count=0;
      for (var i = 0; i < this.bs.length; i++) {
        for (var i2 = 0; i2 < split.length; i2++) {
          if (this.bs[i].id == split[i2]) {
            count++;
          }
        }
        if(count>0){
          this.bs[i].b = false
        }else{
          this.bs[i].b = true
        }
        count=0
      }
      
      console.log(this.bs)
    })
    
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    const role = target.querySelector('#role').value
    const name = target.querySelector('#name').value
    const team = target.querySelector('#teamnumber').value
    const password = target.querySelector('#password').value
    //this.Auth.getAPI3().subscribe(data => {
      //console.log("we got", data)
   // })
    
    this.Auth.loginUser(role,name, team, password).subscribe(data => {
      if (data.success) {
        //this.router.navigate(['signup'])
        this.Auth.setLoggedIn(true)
        this.error = data.message
        this.alerttype = "alert alert-success alert-dismissible fade show"
        this.loginb=false;
        this.scoutb=true
        this.name=data.name
        this.match_scouted = data.match_scouted
        this.teamnumber=data.teamnumber
        if(data.role=="scout"){
          this.managerb=false
          this.role="S"
        }
        else{
          this.managerb = true
          this.role = "M"
        }

      } else {
        this.error=data.message
        this.alerttype = "alert alert-danger alert-dismissible fade show"
      }
    })
    //console.log(name, team,password)
  }
}
