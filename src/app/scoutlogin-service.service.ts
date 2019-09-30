import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "X-TBA-Auth-Key": "BDkwrhvlaCVM91rOPDIK1vRqAEM9O2l1DJ0Qj9I20QCvBNZ2p88ygB4uOj69RpHG"
  })
};
interface isLoggedIn {
  status: boolean
}
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

interface editPitDataArray{
  m: any[]
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

interface teammemberData{
  m:any[];
}

interface api3{
  m:any[]
}
@Injectable({
  providedIn: 'root'
})
export class ScoutloginServiceService {
  apiUrl = "http://localhost/scope_php/images";
  private loggedInStatus = false;
  private path ="http://localhost/scope_php/";
  //private path = "";
  constructor(private http: HttpClient) { }
  getPit_rank_team(team, name, role){
    return this.http.post<api3>(this.path + 'getPit_rank_team.php', {
      team,
      name,
      role
    })
  }

  updateRankPitTeam(team,name,role,list){
    return this.http.post<api3>(this.path + 'updateRankPitTeam.php', {
      team,
      name, 
      role,
      list
    })
  }
  loadrankPit(team, pit_list){
    return this.http.post<rankData>(this.path + 'loadrankPit.php', {
      team,
      pit_list
    })
  }
  getTotal_pit_match(name,team){
    return this.http.post<getPerferenceData>(this.path + 'getTotal_pit_match.php', {
      name,
      team
    })
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
  getQuestion(num){
    return this.http.post<editPitData>(this.path + 'getQuestion.php', {
      num
    })
  }
  editTaskPit(teamnumber, managerName, mem_name, task){
    return this.http.post<teammemberData>(this.path + 'editTaskPit.php', {
      teamnumber,
      managerName,
      task,
      mem_name
    })
  }
  setQuestion(name, teamnumber, match, pit) {
    return this.http.post<teammemberData>(this.path + 'setQuestion.php', {
      teamnumber,
      name,
      match,
      pit
    })
  }
  addTaskPit(teamnumber, role, name, task_, manager_name) {
    return this.http.post<teammemberData>(this.path + 'addTaskPit.php', {
      teamnumber,
      role,
      name,
      task_,
      manager_name
    })
  }
  editTaskMatch(teamnumber,managerName, mem_name,task){
    return this.http.post<teammemberData>(this.path + 'editTaskMatch.php', {
      teamnumber,
      managerName,
      task,
      mem_name
    })
  }
  deleteTaskPit(teamnumber, name, mem_name, num) {
    return this.http.post<teammemberData>(this.path + 'deleteTaskPit.php', {
      teamnumber,
      name,
      mem_name,
      num
    })
  }
  deleteTaskMatch(teamnumber,name, mem_name,num){
    return this.http.post<teammemberData>(this.path + 'deleteTaskMatch.php', {
      teamnumber,
      name,
      mem_name,
      num
    })
  }
  getTeamMemberTaskPit(teamnumber, name) {
    return this.http.post<teammemberData>(this.path + 'getTeamMemberTaskPit.php', {
      teamnumber,
      name
    })
  }
  getTeamMemberTask(teamnumber, name){
    return this.http.post<teammemberData>(this.path + 'getTeamMemberTask.php', {
      teamnumber,
      name
    })
  }
  addTask(teamnumber,role,name,task_, manager_name){
    return this.http.post<teammemberData>(this.path + 'addTask.php', {
      teamnumber,
      role,
      name,
      task_,
      manager_name
    })
  }
  getTeamMember(teamnumber){
    return this.http.post<teammemberData>(this.path + 'getTeamMember.php', {
      teamnumber
    })
  }

  getcurrentRegionMain(scout_team, scout_name) {
    return this.http.post<editPitData>(this.path + 'getcurrentRegionMain.php', {
      scout_team,
      scout_name
    })
  }
  setMainEvent(scout_team, scout_name, event) {
    return this.http.post<updateData>(this.path + 'setMainEvent.php', {
      scout_team,
      scout_name,
      event
    })
  }
  getEditDataMatchPit(scout_team, scout_name,teamnumber){
    return this.http.post<editPitData>(this.path + 'getEditDataPit.php', {
      scout_team,
      scout_name,
      teamnumber
    })
  }
  getHistoryPit(scout_name, scout_team){
    return this.http.post<historydata>(this.path + 'getHistoryPit.php', {
      scout_name,
      scout_team
    })
  }
  updateMatchEdit(col, value, id){
    return this.http.post<updateData>(this.path + 'updateMatchEdit.php', {
      col,
      value,
      id
    })
  }
  updatePitEdit(col, value, id) {
    return this.http.post<updateData>(this.path + 'updatePitEdit.php', {
      col,
      value,
      id
    })
  }
  getEditDataMatch(scout_team,scout_name,region,matchnumber,teamnumber){
    return this.http.post<editPitData>(this.path + 'getEditDataMatch.php', {
      scout_team,
      scout_name,
      region,
      matchnumber,
      teamnumber
    })
  }
  getSelectedTeamPerference(scout_name,scout_team,role){
    return this.http.post<getPerferenceData>(this.path + 'getSelectedTeamPerference.php', {
      scout_team,
      scout_name,
      role
    })
  }
  updateSelectedTeamPerference(scout_team,scout_name,role,perference){
    return this.http.post<getPerferenceData>(this.path + 'updateSelectedTeamPerference.php', {
      scout_team,
      scout_name,
      role,
      perference
    })
  }
  updateRankSelectedTeam(scout_team, region, squence){
    return this.http.post<rankData>(this.path +'updateRankSelectedTeam.php', {
      scout_team,
      region,
      squence
    })
  }
  getSelectedTeam(scout_team, region,option,optioninner){
    return this.http.post<rankData>(this.path +'getSelectedTeam.php', {
      scout_team,
      region,
      option,
      optioninner
  })
  }
  getRankPerference(name, teamnumber, role){
    return this.http.post<getPerferenceData>(this.path +'getRankPerference.php', {
      name,
      teamnumber,
      role
    })
  }
  updaterankPerference(name, teamnumber,role, perference){
    return this.http.post<getPerferenceData>(this.path +'updaterankPerference.php', {
      name,
      teamnumber,
      role,
      perference
    })
  }
  selectTeam(scout_region, scout_team,select,notselect){
    return this.http.post<rankData>(this.path +'selectTeam.php', {
      scout_region,
      scout_team,
      select,
      notselect
    })
  }
  loadrankScout(team) {
    return this.http.post<rankData>(this.path + 'loadrankScout.php', {
      team
    })
  }
  loadrank(team, region, currentOption, currentOptionInner){
    return this.http.post<rankData>(this.path +'loadrank.php', {
      team,
      region,
      currentOption,
      currentOptionInner
    })
  }
  getHistory(scout_name, scout_team){
    return this.http.post<historydata>(this.path +'getHistory.php', {
      scout_name,
      scout_team
    })
  }
  updateTotalVal(scout_team, currentRegion, teamnumber){
    return this.http.post<updateData>(this.path +'updateTotalVal.php', {
      scout_team,
      currentRegion,
      teamnumber
    })
  }
  updatePitImage(teamnumber, image, title,scout_name, scout_team) {
   //return this.http.post<backImage>("http://localhost/scope_php/images/89898.png", image)
    
    return this.http.post<backImage>(this.path +'updatePitImage.php', {
      teamnumber,
      image,
      title,
      scout_name,
      scout_team
    })
  }

  updatePit(id,value,scout_name, scout_team,currentPit){
    return this.http.post<updateData>(this.path +'updatePit.php', {
      id,
      value,
      scout_name,
      scout_team,
      currentPit
    })
  }

  updateMatch(id, value, scout_name, scout_team, currentMatch, currentRegion, currentMatchNumber,teamnumber) {
    return this.http.post<updateData>(this.path +'updateMatch.php', {
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

    return this.http.post<myData>(this.path +'scoutlogin.php', {
      role,
      name,
      teamnumber,
      password
    })
  }
  isLog(){
    return this.http.post<isLoggedIn>(this.path + 'isLogging.php', {
    })
  }
  editPit(array,name,teamnumber){
    return this.http.post<editPitData>(this.path +'editPit.php', {
      array,
      name,
      teamnumber
    })
  }

  editMatch(array: string, name: string, teamnumber: string) {
    return this.http.post<editPitData>(this.path +'editMatch.php', {
      array,
      name,
      teamnumber
    })
  }
  getAPI3(path:string){
    return this.http.get('https://www.thebluealliance.com/api/v3/' + path, httpOptions)
  }
  getPitForm(name, teamnumber){
    return this.http.post<editPitDataArray>(this.path +'getPitForm.php', {
      name,
      teamnumber
    })
  }

  getMatchForm(name, teamnumber) {
    return this.http.post<editPitDataArray>(this.path +'getMatchForm.php', {
      name,
      teamnumber
    })
  }
}
