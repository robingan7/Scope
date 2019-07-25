import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {
  private messageSource = new BehaviorSubject('default');
  currentMessage = this.messageSource.asObservable();

  private isLogout=true
  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message)
  }

  signout(){
    this.isLogout=true
  }

  signin() {
    this.isLogout = false
  }

  get isSignout(){
    return this.isLogout
  }
}
