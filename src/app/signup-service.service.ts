import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  private loggedInStatus = false
  private path = "http://localhost/scope_php/"
  //private path ="https://frcscoutingapp.000webhostapp.com/"
  constructor(private http: HttpClient) { }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
  getUserInfo(role,name, teamnumber, password,passwordc,check) {

    return this.http.post<myData>(this.path+'scoutsignup.php', {
      role,  
      name,
      teamnumber,
      password,
      passwordc,
      check
    })
  }
}
