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

interface getPerferenceData {
  m: string
}

interface updateData{
  col_name: string,
  currentId: string
}
interface backImage{
  col_name: string,
  currentId: string
}

interface rankData {
  col_index:any[]
  output: any[]
}

interface historydata {
  col_name: string,
  currentId: string,
  bs:any
}
@Injectable({
  providedIn: 'root'
})
export class ScoutloginServiceService {
  apiUrl = "http://localhost/scope_php/images"
  private loggedInStatus = false
  constructor(private http: HttpClient) { }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
  getSelectedTeam(scout_team, region,option,optioninner){
    return this.http.post<rankData>('http://localhost/scope_php/getSelectedTeam.php', {
      scout_team,
      region,
      option,
      optioninner
  })
  }
  getRankPerference(name, teamnumber, role){
    return this.http.post<getPerferenceData>('http://localhost/scope_php/getRankPerference.php', {
      name,
      teamnumber,
      role
    })
  }
  updaterankPerference(name, teamnumber,role, perference){
    return this.http.post<getPerferenceData>('http://localhost/scope_php/updaterankPerference.php', {
      name,
      teamnumber,
      role,
      perference
    })
  }
  selectTeam(scout_region, scout_team,select,notselect){
    return this.http.post<rankData>('http://localhost/scope_php/selectTeam.php', {
      scout_region,
      scout_team,
      select,
      notselect
    })
  }
  loadrank(team, region, currentOption, currentOptionInner){
    return this.http.post<rankData>('http://localhost/scope_php/loadrank.php', {
      team,
      region,
      currentOption,
      currentOptionInner
    })
  }
  getHistory(scout_name, scout_team){
    return this.http.post<historydata>('http://localhost/scope_php/getHistory.php', {
      scout_name,
      scout_team
    })
  }
  updateTotalVal(scout_team, currentRegion, teamnumber){
    return this.http.post<updateData>('http://localhost/scope_php/updateTotalVal.php', {
      scout_team,
      currentRegion,
      teamnumber
    })
  }
  updatePitImage(teamnumber, image, title,scout_name, scout_team) {
   //return this.http.post<backImage>("http://localhost/scope_php/images/89898.png", image)
    
    return this.http.post<backImage>('http://localhost/scope_php/updatePitImage.php', {
      teamnumber,
      image,
      title,
      scout_name,
      scout_team
    })
  }

  updatePit(id,value,scout_name, scout_team,currentPit){
    return this.http.post<updateData>('http://localhost/scope_php/updatePit.php', {
      id,
      value,
      scout_name,
      scout_team,
      currentPit
    })
  }

  updateMatch(id, value, scout_name, scout_team, currentMatch, currentRegion, currentMatchNumber,teamnumber) {
    return this.http.post<updateData>('http://localhost/scope_php/updateMatch.php', {
      id,
      value,
      scout_name,
      scout_team,
      currentMatch,
      currentMatchNumber,
      currentRegion,
      teamnumber
    })
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

  editMatch(array, name, teamnumber) {
    return this.http.post<editPitData>('http://localhost/scope_php/editMatch.php', {
      array,
      name,
      teamnumber
    })
  }
  getAPI3(path){
    return this.http.get('https://www.thebluealliance.com/api/v3/'+path, httpOptions)
  }
  getPitForm(name, teamnumber){
    return this.http.post<editPitData>('http://localhost/scope_php/getPitForm.php', {
      name,
      teamnumber
    })
  }

  getMatchForm(name, teamnumber) {
    return this.http.post<editPitData>('http://localhost/scope_php/getMatchForm.php', {
      name,
      teamnumber
    })
  }
}
