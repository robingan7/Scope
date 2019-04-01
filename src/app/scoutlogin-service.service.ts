import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "X-TBA-Auth-Key": "BDkwrhvlaCVM91rOPDIK1vRqAEM9O2l1DJ0Qj9I20QCvBNZ2p88ygB4uOj69RpHG"
  })
};
interface myData{
  success: boolean,
  message: string,
  name: string,
  match_scouted: number,
  teamnumber:string,
  role:string
}

interface editPitData{
  m: string
}
@Injectable({
  providedIn: 'root'
})
export class ScoutloginServiceService {
  private loggedInStatus = false
  constructor(private http: HttpClient) { }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
  loginUser(role,name, teamnumber, password) {

    return this.http.post<myData>('http://localhost/scope_php/scoutlogin.php', {
      role,
      name,
      teamnumber,
      password
    })
  }

  editPit(array,name,teamnumber){
    return this.http.post<editPitData>('http://localhost/scope_php/editPit.php', {
      array,
      name,
      teamnumber
    })
  }
  getAPI3(){
    return this.http.get('https://www.thebluealliance.com/api/v3/team/frc5805/events', httpOptions)
  }
  getPitForm(name, teamnumber){
    return this.http.post<editPitData>('http://localhost/scope_php/getPitForm.php', {
      name,
      teamnumber
    })
  }
}
