import { Component, OnInit, ViewChild } from '@angular/core';
import { ScoutloginServiceService } from '../scoutlogin-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'scoutlogin',
  templateUrl: './scoutlogin.component.html',
  styleUrls: ['./scoutlogin.component.css']
})

export class ScoutloginComponent implements OnInit {
  
  //-----oninit---------
  lengthh = 0
  image_not_avalibe=false
  //---------team selection-------
  frameworkComponents:any;
  isFullWidthCell:any;
  fullWidthCellRenderer:any;

  pit_question
  match_question

  editMemberTaskLoader=true

  col_index3=[]
  currentData3=[]
  gridApi3

  editPitLoader=true

  selectTeamOption=[]
  selectTeamOptionInner=[]
  squence=[]

  selctedPerference="General_Ability"

  getCurrentRegionCycleCounter=0

  currentTemMatchList:object

  total_pit_match="0"
  name_addTask

  taskMatchLoader=true
  taskPitLoader = false

  /*
  selctedPerference={
    General_Ability:false,
    Teleop_Total:false,
    Teleop_Average: false,
    Autonomous_Average: false,
    Autonomous_Total: false
  }*/
    
  //----Page Control & Error Boolean----
  error = "No error so far"

  /*
  loginb = !true
  scoutb = true
  managerb = true*/

  editingCEventCount=0

  loginb = true
  scoutb = !true
  managerb = !true


  editPitError=true
  alerttype = "alert alert-success alert-dismissible fade show"

  matchspinnerb=false
  pitspinner=false

  pitspinnerb=true
  thethreereply={mes:"Complete to unlock the rest",
    style:"alert alert-danger"}

  selectLoader = false
  selectLoaderA = false

  editMatchLoader=true

  yourtask=true

  loadCurrentEvent=true

  manage_tipb=false

  pitLock=false
  matchLock=false

  pitLock2 = false
  matchLock2 = false

  loadChangeHistoryPerson=false
  //--------User Info----Remember Change Those
  name="Robin"
  role="M"
  match_scouted=0
  teamnumber = "5805"
  currentRegionMain ="no event"
  currentRegionMainId=0
  currrentEventButtonModes=[
    {
      style:"btn btn-primary",
      info:["Change event","Welcome come to",this.currentRegionMain]
    },
    {
      style: "btn btn-danger",
      info: ["Set current event(do this first!!)"]
    }
  ]
  currrentEventButtonCurrentMode = this.currrentEventButtonModes[1]
  atleastoneteam=false
  atleastoneteamA = false
  //----Counter +1 or -1-----
  editdrophatch=0
  editdropcargo=0
  editdroppiece=0
  editblock=0

  editdrophatch2 = 0
  editdropcargo2 = 0
  editdroppiece2 = 0
  editblock2 = 0

  cargolvl3 = 0
  hatchlvl3=0
  cargolvl2 = 0
  hatchlvl2 = 0
  cargolvl1 = 0
  hatchlvl1 = 0
  cargoship = 0
  hatchship = 0
  //-----Current Status------
  currentPit="none"
  currentPitTask = "none"

  currentPitReceiver="5805"
  currentImage=null
  currentImageTitle="5805"

  currentMatchTeam = "none"
  currentRegion="none"
  currentMatchNumber=0
  currentMatch="none"

  asssign_pits=[]

  currentTask={
  title: "none",
  region:"no event",
  matchnumber:"0",
  teamnumber:"0000"
}

currentTaskPit={
  teamnumber:"0000"
}
  //--------Team List----------

  select2 = []
  allselect2 = []

  currentSelect2 = []
  currentNotSelect2 = []

  //-------history--------

  //-----match-------
  date=[]
  datematch=[]
  currentHdate=""
  currentHmatch=""
  history=[]
  dateid=[]

  historyb=true
  historybs=[]
  historybscount=0
  historyload=true
  historyPersonload=false
  isFirstHistory=0
  //------pit------
  date_pit = []
  datematch_pit = []
  currentHdate_pit= ""
  currentHmatch_pit = ""
  history_pit = []
  dateid_pit = []

  historyb_pit = true
  historybs_pit = []
  historybscount_pit= 0
  historyload_pit = true
  isFirstHistory_pit = 0

  history_person

  //--------data--------
  currentOption=[]
  currentRank=[]
  currentOptionInner=[]
  currentOptionInnerTem=[]

  currentData=[]

  col_index:any[]

  autoHeight="autoHeight"

  gridApi

  rowSelection = "multiple";
  rowGroupPanelShow = "always";
  pivotPanelShow = "always";
  multiSortKey = "ctrl";

  select=[]
  allselect=[]

  currentSelect=[]
  currentNotSelect=[]

  editingThethree=false
  editingTeamnumber=false

  overlayLoadingTemplate =
  '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  overlayNoRowsTemplate =
  "<span style=\"padding: 10px; border-radius: 20px solid #aaa;\">No data for current event</span>";
  
  rankperference=
    {
      totalautopoint:false,
      autohatch: false,
      autocargo: false,
      totalcargo: false,
      totalhatch: false,
      cargolvl1: false,
      cargolvl2: false,
      cargolvl3: false,
      hatchlvl1: false,
      hatchlvl2: false,
      hatchlvl3: false,
      cargoship: false,
      hatchship: false,
      defenseblock: false,
      defensedrop: false,
      hatchdrop: false,
      cargodrop: false
    }

  rankperferencestring =//holds the string data from above object
    ["totalautopoint", "autohatch", "autocargo", "totalcargo", "totalhatch", "cargolvl1", "cargolvl2", "cargolvl3",
      "hatchlvl1", "hatchlvl2", "hatchlvl3", "cargoship", "hatchship", "defenseblock", "defensedrop", "hatchdrop", "cargodrop"]
  
  editdata = {id:-1,region:"none", matchnumber:"0", teamnumber:"0000", alliance:"blue", exitplatform:0, autohatch:0, autocargo:0,
    cargolvl1:0, cargolvl2:0, cargolvl3:0, hatchlvl1:0, hatchlvl2:0, hatchlvl3:0, cargoship:0,hatchship:0,defenseblock:0,
    defensedrop:0, hatchdrop:0, cargodrop:0, climbpoint:0, fitness:"0", question:"", answer:"", notes:""}

  editdataPit = {
    id: -1, teamnumber: "0000", weightunit: "", heightunit: "", weight2: 0, height2: 0, sensor: "", autotype: "",
    autolvl: "", autochoice: "", cargolevel: "", hatchlevel: "", speed: "", cargopickupspeed: "", hatchpickupspeed: "", climbability: "",
    stra: "", driver: "", question: "", answer: "", fitness: "0", notes: ""
  }

  editdatastring= ["id", "region", "matchnumber", "teamnumber", "alliance", "exitplatform", "autohatch", "autocargo",
    "cargolvl1", "cargolvl2", "cargolvl3", "hatchlvl1", "hatchlvl2", "hatchlvl3", "cargoship", "hatchship", "defenseblock",
    "defensedrop", "hatchdrop", "cargodrop", "climbpoint", "fitness", "question", "answer", "notes"];

  editdatastringPit = ["id", "teamnumber", "weightunit", "heightunit", "weight2", "height2",
    "sensor", "autotype", "autolvl", "autochoice", "cargolevel", "hatchlevel", "speed",
    "cargopickupspeed", "hatchpickupspeed", "climbability", "stra", "driver", "question", "answer", "notes"]
//----average-----
  gridApiA

  currentOptionA = []
  currentRankA = []
  currentOptionInnerA = []
  currentOptionInnerTemA = []

  currentDataA = []

  col_indexA: any[]
  selectA = []
  allselectA = []

  currentSelectA = []
  currentNotSelectA = []

  //-----pit and match form type----
  editMatchEvent=[]
  private bs = [
    { id: "#isTeam", b: true },
    { id:"#isWH",b:true},
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

  private bs2 = [{ id: "#isEvent", b: true },
    { id: "#isMatch", b: true },
    { id: "#isTeam", b: true },
    { id: "#isImage", b: true },
    { id: "#isA", b: true },
    { id: "#isAP", b: true },
    { id: "#isTP", b: true },
    { id: "#isDe", b: true },
    { id: "#isEfficient", b: true },
    { id: "#isEndgame", b: true },
    { id: "#isFit", b: true },
    { id: "#isQ", b: true },
    { id: "#isN", b: true }]


    //--------manage page------
    
    team_member_list=[this.name]  
    currentYear="2019"
    matchnumber_max=1
    addError=[
      {
        title:"Added!!",
        content:"one more?"
      },
      {
        title:"Fill in",
        content:"all space"
      },
      {
        title: "Error",
        content: "invalid id"
      },{
        title: "Error",
        content: "invalid data"
      }
    ]
  addErrorC = {
    title: "Fill in",
    content: "all space"
  }
  team_member_task:Object
  team_member_task2=[]

  team_member_task_pit={}
  team_member_task2_pit = []

  team_member_task_this=[]

  currentEditMember={
    match:[],
    pit:[]
  }

  currentAddMember=[]
  currentEditMemberName="Robin"

  currentRegionTeams=[]

  tipsb={
    manager_tipb:false,
    task_tipb: false,
    data_tipb: false,
    history_tipb: false,
    teamlist_tipb: false,
    account_tipb:false
  }
  type_assignb={
    match_assign:true,
    pit_assign:false
  }
  
  constructor(private Auth: ScoutloginServiceService,
              private router: Router) { 
    this.isFullWidthCell = function (rowNode) {
      return true;
    };
    
    this.history_person=this.name
    this.fullWidthCellRenderer = "fullWidthCellRenderer";
                //this.loadrank()
                
                setInterval(()=>{
                  if (this.scoutb) {
                  //------set Event run--------
                  if (this.scoutb && this.editingCEventCount == 0) {
                    this.getcurrentRegionMain()
                    this.editingCEventCount = -1
                  }

                  if (this.getCurrentRegionCycleCounter>1){
                  if (this.currentRegionMain != "an event") {
                    this.currrentEventButtonModes[0].info[2] = this.currentRegionMain
                    this.currrentEventButtonCurrentMode = this.currrentEventButtonModes[0]
                    this.loadCurrentEvent=false
                  }else{
                    this.currrentEventButtonCurrentMode = this.currrentEventButtonModes[1]
                    this.loadCurrentEvent=false
                  }}else{
                    this.getCurrentRegionCycleCounter++
                  }
                  //---------end of set event-----
                  if(this.scoutb){
                  this.Auth.getPitForm(this.name, this.teamnumber).subscribe(data => {

                    //----only run once-----111111111
                    if(this.lengthh==0){
                      var selectedoptionsVar:string[]
                      this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)

                      this.getSelectedTeamPerference()
                     
                      this.Auth.getRankPerference(this.name, this.teamnumber, this.role).subscribe(data2 => {
                        selectedoptionsVar = data2.m.split("/")
                        this.currentOption = data2.m.split("/")
                        for (var ele in this.currentOption) {
                          this.rankperference[this.currentOption[ele]] = true
                        }
                        this.currentOptionA = data2.m.split("/")
                        //console.log(this.currentOptionA)
                        for (var ele in this.currentOptionA) {
                          this.rankperference[this.currentOptionA[ele]] = true
                          
                        }
                        
                        this.currentOptionA = ["isSelect"]
                        this.currentOptionInnerA = ["isSelect"]
                        this.col_indexA = []
                        this.currentOption = ["isSelect"]
                        this.currentOptionInner = ["isSelect"]
                        this.col_index = []


                        var optionsVar = (<HTMLSelectElement>document.querySelector('#rankOptA')).options

                        var optionsVarlist = []
                        var selectedoptionsVarlist = []
                        //console.log(<HTMLSelectElement>document.querySelector('#rankOptA'))
                        for (var i = 0; i < optionsVar.length; i++) {
                          optionsVarlist.push(optionsVar[i].value)
                        }
                        for (var i = 0; i < selectedoptionsVar.length; i++) {
                          selectedoptionsVarlist.push(selectedoptionsVar[i])

                        }
                        for (var i = 0; i < optionsVar.length; i++) {
                          if (!this.contains(selectedoptionsVarlist, optionsVarlist[i].substring(0, optionsVar[i].value.length - 1))) {
                            this.rankperference[optionsVar[i].value.substring(0, optionsVar[i].value.length - 1)] = false
                          } else {
                            this.currentOptionA.push(optionsVar[i].value)
                            this.currentOptionInnerA.push(optionsVar[i].innerText)
                            this.currentOption.push(optionsVar[i].value.substring(0, optionsVar[i].value.length - 1))
                            this.currentOptionInner.push(optionsVar[i].innerText)
                            this.rankperference[optionsVar[i].value.substring(0, optionsVar[i].value.length - 1)] = true

                          }
                        }

                        //console.log(this.currentOptionA)
                        this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data3 => {
                          this.col_indexA = data3.col_index
                          this.currentDataA = data3.output
                        })


                        this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data4 => {
                          this.col_index = data4.col_index
                          this.currentData = data4.output

                        })

                        var temPerference = []
                        for (var i = 1; i < this.currentOptionA.length; i++) {
                          temPerference.push(this.currentOptionA[i].substring(0, this.currentOptionA[i].length - 1))
                        }

                        this.Auth.updaterankPerference(this.name, this.teamnumber, this.role, temPerference).subscribe(data => {

                        })
                      })
                      this.getTeamMember()
                      this.getMatchNumber()
                      this.getQuestion()
                      this.getTotal_pit_match()
                      this.lengthh=1
                    }

                    //----only run once-----111111111


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
                  
                    if (this.currentRegionMain !="no event"){
                  //----------select team----------
                  if (this.currentData3!=undefined){
                  var selCurrentSelected=[], selCurrentSelected2=[]
                  for(i=0;i<this.gridApi3.getSelectedRows().length;i++){
                    selCurrentSelected.push(this.gridApi3.getSelectedRows()[i].Team_Number)
                  }
                  for (i = 0; i < this.currentData3.length; i++) {
                    selCurrentSelected2.push(this.currentData3[i].Team_Number)
                  }
                  var currentSquence=[]
                  this.gridApi3.forEachNode(function (rowNode, index) {
                    currentSquence.push(rowNode.data.Team_Number + '/' + index)
                  });
                  if (!this.arraysEqual(this.squence, currentSquence)){
                    this.Auth.updateRankSelectedTeam(this.teamnumber, this.currentRegionMain, currentSquence).subscribe(data=>{
                      //console.log(data)
                    })
                    this.squence = currentSquence
                  }
 
                  //console.log(currentSquence)
                  if (this.arraysEqual(selCurrentSelected, selCurrentSelected2)){
                    //console.log(selCurrentSelected, selCurrentSelected2)
                  }
                }
              }
                  this.Auth.getMatchForm(this.name, this.teamnumber).subscribe(data => {
                    const split = data.m.split('/')
                    var count = 0;
                    for (var i = 0; i < this.bs2.length; i++) {
                      for (var i2 = 0; i2 < split.length; i2++) {
                        if (this.bs2[i].id == split[i2]) {
                          count++;
                        }
                      }
                      if (count > 0) {
                        this.bs2[i].b = false
                      } else {
                        this.bs2[i].b = true
                      }
                      count = 0
                    }
                  })

                  if(!this.editingThethree && !this.editingTeamnumber){
                    if(!this.managerb){
                      this.getHistory(this.name)
                    }else{
                      this.getHistory(this.history_person)
                    }
                  //console.log(this.historybs[0].a20190416)
                  this.matchspinnerb = false
                  this.pitspinner = false
                  }
                  //-------Data Total---------
                  this.select=[]
                  this.allselect=[]
                  this.currentSelect=[]
                  this.currentNotSelect = []

                  if(this.currentData!=undefined){
                  for(var i=0; i<this.currentData.length;i++){
                    if (this.currentData[i].isSelect==1){
                      this.select.push(this.currentData[i].Team_Number)
                    }
                    this.allselect.push(this.currentData[i].Team_Number)
                  }

                  for (var i = 0; i < this.gridApi.getSelectedRows().length;i++){
                    this.currentSelect.push(this.gridApi.getSelectedRows()[i].Team_Number)
                  }
                  for (var i = 0; i < this.allselect.length; i++) {
                    if (!this.contains(this.currentSelect, this.allselect[i])){
                      this.currentNotSelect.push(this.allselect[i])
                    }
                  }
                }
                  if (!this.arraysEqual(this.select, this.currentSelect) && this.currentSelect.length != 0){
                    console.log(this.select, this.currentSelect, this.currentNotSelect)
                    this.selectTeam()
                    this.selectTeamA2()
                  }else{
                    this.selectLoader = false
                    this.gridApi.hideOverlay()
                    this.gridApiA.hideOverlay()
                    this.gridApi3.hideOverlay()
                  }

                  if(this.currentSelect.length==0 && this.select.length==0){
                    this.atleastoneteam=true
                  } else {
                  this.atleastoneteam = false
                  }

                  this.gridApi.forEachNode(function (node) {
                    if (node.data.isSelect ==1) {
                      node.setSelected(true);
                    }
                  }
                  
                  );

                  //-----------data average--------
                  this.selectA = []
                  this.allselectA = []
                  this.currentSelectA = []
                  this.currentNotSelectA = []

                  if(this.currentDataA!=undefined){
                  for (var i = 0; i < this.currentDataA.length; i++) {
                    if (this.currentDataA[i].isSelect == 1) {
                      this.selectA.push(this.currentDataA[i].Team_Number)
                    }
                    this.allselectA.push(this.currentDataA[i].Team_Number)
                  }

                  for (var i = 0; i < this.gridApiA.getSelectedRows().length; i++) {
                    this.currentSelectA.push(this.gridApiA.getSelectedRows()[i].Team_Number)
                  }
                  for (var i = 0; i < this.allselectA.length; i++) {
                    if (!this.contains(this.currentSelectA, this.allselectA[i])) {
                      this.currentNotSelectA.push(this.allselectA[i])
                    }
                  }

                  if (!this.arraysEqual(this.selectA, this.currentSelectA) && this.currentSelectA.length != 0) {
                    console.log(this.selectA, this.currentSelectA, this.currentNotSelectA)
                    this.selectTeamA()
                    this.selectTeam2()
                  } else {
                    this.selectLoaderA = false
                    
                  }
                }
                  if (this.currentSelectA.length == 0 && this.selectA.length == 0) {
                    this.atleastoneteamA = true
                  } else {
                    this.atleastoneteamA = false
                  }
                  
                  this.gridApiA.forEachNode(function (node) {
                    if (node.data.isSelect == 1) {
                      node.setSelected(true)
                    }
                  }
                
                  )
                  //-------team select--------
                  this.gridApi3.forEachNode(function (node) {
                      node.setSelected(true)
                  })


                }
              }
                },7000)
              
              }

  ngOnInit() {
    (<HTMLDivElement>document.querySelector("#start_spinner")).style.display="none"
  }

  getTotal_pit_match(){
    this.Auth.getTotal_pit_match(this.name,this.teamnumber).subscribe(data=>{
      this.total_pit_match=data.m
    })
  }
  //--------manage page function-----\
  signOut(){
    this.lengthh = 0

    this.col_index3 = []
    this.currentData3 = []
    this.gridApi3

    this.selectTeamOption = []
    this.selectTeamOptionInner = []
    this.squence = []

    this.selctedPerference = "General_Ability"

    this.getCurrentRegionCycleCounter = 0

    this.editingCEventCount = 0

    this.loginb = true
    this.scoutb = !true
    this.managerb = !true
  }
  getQuestion(){
    this.Auth.getQuestion(this.teamnumber).subscribe(data => {
      this.match_question=data.m.split('/')[0];
     this.pit_question= data.m.split('/')[1]
    })
  }
  setQuestion(){
    var match = (<HTMLInputElement>document.querySelector("#match_question")).value
    var pit = (<HTMLInputElement>document.querySelector("#pit_question")).value

    this.Auth.setQuestion(this.name,this.teamnumber,match,pit).subscribe(data=>{
      this.getQuestion()
    })

  }
  changeAddMember(e){
    e.preventDefault()
    var namenn=e.target.value
    this.currentAddMember=this.team_member_task[namenn]
  }
  startTask(e){
    this.taskMatchLoader=true
    e.preventDefault()
    var matchnumbe=e.target.innerText.split('_')[0]
    var teamnumbe = e.target.innerText.split('_')[1]
    var regionn="no event"
    this.Auth.getAPI3("events/" + this.currentYear).subscribe(data4 => {
      for (var ele in data4) {
        if (data4[ele].key == this.currentRegionMainId) {
          regionn = data4[ele].short_name
          break
        }
      }

      this.currentTask={
        title:regionn+"-"+matchnumbe,
        region:regionn,
        teamnumber:teamnumbe,
        matchnumber:matchnumbe
      }
      this.taskMatchLoader = false

    })

  }

  startTaskPit(e) {
    this.taskPitLoader=true
    e.preventDefault()
    var teamnumbe = e.target.id.split('_')[1]
   
      this.currentTaskPit={
        teamnumber: teamnumbe
      }
    this.taskPitLoader = false
  }
  type_assign(e){
    e.preventDefault()
    var val=e.target.value
    if (val =="pit_assign"){
      this.type_assignb.pit_assign=true
      this.type_assignb.match_assign=false
    }else{
      this.type_assignb.pit_assign = false
      this.type_assignb.match_assign = true
    }
  }
  getCurrentRegionTeams(){
    
    this.Auth.getAPI3("event/" + this.currentRegionMainId + "/teams").subscribe(data => {
      var tem=[]
      for(var ele in data){
        tem.push(data[ele].key.substring(3, data[ele].key.length))
      }
      this.currentRegionTeams=tem
      //console.log(this.currentRegionTeams)
    })
  }
  editModalOut(e){
    e.preventDefault()
    var thisName=e.target.id
    this.currentEditMember.match = this.team_member_task[thisName]
    this.currentEditMember.pit= this.team_member_task_pit[thisName]
    this.currentEditMemberName=thisName
  }
  getTeamMemberTask(){
    this.yourtask=true
    this.editMemberTaskLoader = true
    this.Auth.getTeamMemberTask(this.teamnumber,this.name).subscribe(data=>{
      this.team_member_task=data.m
      //console.log(this.team_member_task)
      
      this.Auth.getTeamMemberTaskPit(this.teamnumber, this.name).subscribe(data2 => {
        this.team_member_task_pit = data2.m
        console.log(this.team_member_task_pit)
        var tem_list = []
        for (var ele in this.team_member_list) {
          tem_list.push(
            {
              name: this.team_member_list[ele],
              task: this.team_member_task[this.team_member_list[ele]].length + this.team_member_task_pit[this.team_member_list[ele]].length
            })
        }
        this.team_member_task2 = tem_list
        //console.log(this.team_member_task2)
        this.team_member_task2.forEach(element => {
          if(element.name==this.name){
            this.match_scouted = element.task
          }
        })
        this.team_member_task_this = []

        this.Auth.getAPI3("events/" + this.currentYear).subscribe(data4 => {
          for (var ele in data4) {
            if (data4[ele].short_name == this.currentRegionMain) {
              this.currentRegionMainId = data4[ele].key

              break
            }
          }
          this.Auth.getAPI3("event/" + this.currentRegionMainId + "/matches").subscribe(data3 => {
            this.currentTemMatchList=data3

            this.team_member_task[this.name].forEach(element => {
              var addlist = []
              for (var i = element.start; i <= element.end; i++) {
                var teamnnnn
                var alliance = element.pos.substring(0, element.pos.length - 1).toLowerCase()
                var alliance_num = Number(element.pos.substring(element.pos.length - 1, element.pos.length))-1


                for (var ele2 in this.currentTemMatchList) {
                  if (this.currentTemMatchList[ele2].comp_level == "qm") {
                    if (Number(this.currentTemMatchList[ele2].match_number) == i) {
                      
                      teamnnnn = this.currentTemMatchList[ele2].alliances[alliance].team_keys[alliance_num]
                      if(teamnnnn!=undefined){
                        addlist.push(i + "_" + teamnnnn.substring(3, teamnnnn.length))
                      }
                    }
                  }
                }
              }
              this.team_member_task_this.push({
                title: "Q" + element.start + "-" + element.end,
                content: addlist
              })
            });
            console.log(this.team_member_task_this, this.team_member_task_pit)
            this.yourtask = false
            this.editMemberTaskLoader=false
            this.currentAddMember = this.team_member_task[this.name_addTask]
          })
       
        });

      })
    })
    
  }
  getTeamMemberTask_inDeleteMethod(str) {
    this.editMemberTaskLoader = true
    this.yourtask = true

    this.Auth.getTeamMemberTask(this.teamnumber, this.name).subscribe(data => {
      this.team_member_task = data.m
      console.log(this.team_member_task)
      
     
      this.Auth.getTeamMemberTaskPit(this.teamnumber, this.name).subscribe(data2 => {
        this.team_member_task_pit = data2.m
        console.log(this.team_member_task_pit)
        var tem_list = []
        for (var ele in this.team_member_list) {
          tem_list.push(
            {
              name: this.team_member_list[ele],
              task: this.team_member_task[this.team_member_list[ele]].length + this.team_member_task_pit[this.team_member_list[ele]].length
            })
        }
        this.team_member_task2 = tem_list
        this.team_member_task2.forEach(element => {
          if (element.name == this.name) {
            this.match_scouted = element.task
          }
        })
        this.currentEditMember.match = this.team_member_task[str]
        this.currentEditMember.pit = this.team_member_task_pit[str]

        this.team_member_task_this = []

        this.Auth.getAPI3("events/" + this.currentYear).subscribe(data4 => {
          for (var ele in data4) {
            if (data4[ele].short_name == this.currentRegionMain) {
              this.currentRegionMainId = data4[ele].key

              break
            }
          }
          this.Auth.getAPI3("event/" + this.currentRegionMainId + "/matches").subscribe(data3 => {
            this.currentTemMatchList = data3

            this.team_member_task[this.name].forEach(element => {
              var addlist = []
              for (var i = element.start; i <= element.end; i++) {
                var teamnnnn
                var alliance = element.pos.substring(0, element.pos.length - 1).toLowerCase()
                var alliance_num = Number(element.pos.substring(element.pos.length - 1, element.pos.length))


                for (var ele2 in this.currentTemMatchList) {
                  if (this.currentTemMatchList[ele2].comp_level == "qm") {
                    if (Number(this.currentTemMatchList[ele2].match_number) == i) {
                      teamnnnn = this.currentTemMatchList[ele2].alliances[alliance].team_keys[alliance_num]
                      if(teamnnnn!=undefined){
                        addlist.push(i + "-" + teamnnnn.substring(3, teamnnnn.length))
                      }
                    }
                  }
                }
              }
              this.team_member_task_this.push({
                title: "Q" + element.start + "_" + element.end,
                content: addlist
              })
            });
            this.editMemberTaskLoader = false
            this.yourtask = false
            this.currentAddMember = this.team_member_task[this.name_addTask]
          })


        });
        //console.log(this.team_member_task2)
      })
      //console.log(this.team_member_task2)
    })
  }
  taskOut(e){
    e.preventDefault()
    var id=e.target.id

    if ((<HTMLButtonElement>document.querySelector("#" + id + "_task"))!=null){
    if ((<HTMLButtonElement>document.querySelector("#" + id + "_task")).style.display=="none"){
      (<HTMLButtonElement>document.querySelector("#" + id + "_task")).style.display = "inline"
    }else{
      (<HTMLButtonElement>document.querySelector("#" + id + "_task")).style.display = "none"
    }
  }
  }

  taskOut2(e) {
    e.preventDefault()
    var id = e.target.id

    var temm=[]

    this.team_member_task_this.forEach(element => {
      if(element.title==id){
        temm = element.content
      }
    })

    temm.forEach(element2 => {
      if ((<HTMLButtonElement>document.querySelector("#a" + id + "_" + element2)) != null) {
        if ((<HTMLButtonElement>document.querySelector("#a" + id + "_" + element2)).style.display == "none") {

          (<HTMLButtonElement>document.querySelector("#a" + id + "_" + element2)).style.display = "inline"
        } else {
          (<HTMLButtonElement>document.querySelector("#a" + id + "_" + element2)).style.display = "none"
        }
      }
    });
    
  }
  addTask(type){
    if(type=="match"){
     this.name_addTask = (<HTMLSelectElement>document.querySelector("#assign_member")).value
      document.querySelector("#status_warn").className = "badge badge-pill badge-primary"
    var new_v="status"
      var end_val = Number((<HTMLInputElement>document.querySelector("#" + new_v + "_end")).value)
      var start_val = Number((<HTMLInputElement>document.querySelector("#" + new_v + "_start")).value)
      var pos = (<HTMLInputElement>document.querySelector("#" + new_v + "_pos")).value
    var task = this.currentRegionMainId + "/" + start_val + "/" + end_val + "/" + pos
      if (end_val == 0 || start_val == 0 || pos == "P" || this.name_addTask =="For who?") {
      this.addErrorC = this.addError[1]
    } else if (this.currentRegionMainId == 0) {
      this.addErrorC = this.addError[2]
    }
      else if (document.querySelector("#status_warn").className == "badge badge-pill badge-danger"){
        this.addErrorC = this.addError[3]
      }
    else {
      this.addErrorC = this.addError[0]
      this.Auth.addTask(this.teamnumber, this.role, this.name_addTask, task, this.name).subscribe(data => {
        //console.log(data)
        this.getTeamMemberTask()
      })
    }
  }else if(type=="pit"){
       this.name_addTask = (<HTMLSelectElement>document.querySelector("#assign_member_pit")).value
      var task2 = []
      document.querySelector("#status_warn_pit").className = "badge badge-pill badge-primary"
      if (this.name_addTask == "For who?" || this.asssign_pits.length == 0) {
        this.addErrorC = this.addError[1]
      } else if (document.querySelector("#status_warn_pit").className == "badge badge-pill badge-danger") {
        this.addErrorC = this.addError[3]
      }else {
        this.addErrorC = this.addError[0]
        task2=this.asssign_pits
        console.log(task2)
        this.Auth.addTaskPit(this.teamnumber, this.role, this.name_addTask, task2, this.name).subscribe(data => {
        //console.log(data)
        this.getTeamMemberTask()
        })
      }
  }
  }
  enableAssignPit(e){
    e.preventDefault()
    var clsname=e.target.className
    if (clsname =="btn btn-secondary btn-sm"){
      e.target.className ="btn btn-primary btn-sm"
      this.asssign_pits.push(e.target.innerText)
    }else{
      e.target.className = "btn btn-secondary btn-sm"
      this.asssign_pits.splice(this.asssign_pits.indexOf(e.target.innerText))
    }
  }
  deleteTaskMatch(e){
    e.preventDefault()
    var name=e.target.id.split('_')[1]
    this.name_addTask = name
    var num = e.target.id.split('_')[2]

    this.Auth.deleteTaskMatch(this.teamnumber,this.name,name,num).subscribe(data=>{
      this.getTeamMemberTask_inDeleteMethod(name)
      this.currentEditMemberName = name
    })
  }
  deleteTaskPit(e) {
    e.preventDefault()
    var name = e.target.id.split('_')[1]
    this.name_addTask = name
    var num = e.target.id.split('_')[2]

    this.Auth.deleteTaskPit(this.teamnumber, this.name, name, num).subscribe(data => {
      this.getTeamMemberTask_inDeleteMethod(name)
      this.currentEditMemberName = name
    })
  }
  editTask(e,type){
    e.preventDefault()
    var name = e.target.id.split('_')[1]
    this.name_addTask=name
    var num = e.target.id.split('_')[2]
    if (type == "match") {
      var end_val = Number((<HTMLInputElement>document.querySelector("#matchedit_" + name + "_end")).value)
      var start_val = Number((<HTMLInputElement>document.querySelector("#matchedit_" + name + "_start")).value)
      var pos = (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_pos")).value
      var task = this.currentRegionMainId + "/" + start_val + "/" + end_val + "/" + pos
      if (end_val == 0 || start_val == 0 || pos == "P") {
        this.addErrorC = this.addError[1]
      } else if (this.currentRegionMainId==0){
        this.addErrorC = this.addError[2]
      } else if ((<HTMLInputElement>document.querySelector("#matchedit_status_warn")).className =="badge badge-pill badge-danger"){
        this.addErrorC = this.addError[3]
      }
       else {
        console.log(task)
        this.addErrorC = this.addError[0]
        this.Auth.editTaskMatch(this.teamnumber, this.name, name, num , task).subscribe(data => {
          console.log(data)
          this.getTeamMemberTask()
        })
      }
    } else if (type == "pit") {
      var task2 = Number((<HTMLInputElement>document.querySelector("#pitedit_" + name + "_start")).value)

       if ((<HTMLInputElement>document.querySelector("#pitedit_status_warn")).className == "badge badge-pill badge-danger") {
        this.addErrorC = this.addError[3]
      }else{
         this.Auth.editTaskPit(this.teamnumber, this.name, name, num, task2).subscribe(data => {
           console.log(data)
           this.addErrorC = this.addError[0]
           this.getTeamMemberTask()
         })
      }
    }
  }
  checkManageInput2(e){
    e.preventDefault()
    var tem_id = e.target.id
    var val = Number(e.target.value)
    var name = e.target.id.split('_')[1]
    var end_val = Number((<HTMLInputElement>document.querySelector("#matchedit_" + name + "_end")).value)
    var start_val = Number((<HTMLInputElement>document.querySelector("#matchedit_" + name + "_start")).value)
    if (tem_id.split("_")[2] == "start") {
      if (end_val <= val) {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = "Right is smaller than left"
        document.querySelector("#matchedit_status_warn").className = "badge badge-pill badge-danger"
      } else if (val > this.matchnumber_max) {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = "Left can't be greater than " + this.matchnumber_max
        document.querySelector("#matchedit_status_warn").className = "badge badge-pill badge-danger"
      } else if ((<HTMLInputElement>document.querySelector("#matchedit_" + name + "_start")).value == "") {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = "It can't be empty"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      }
      else {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = ""
        document.querySelector("#matchedit_status_warn").className = "badge badge-pill badge-successful"
        //this.Auth.editTaskMatch(this.teamnumber,this.name,name,num)
      }
    } else if (tem_id.split("_")[2] == "end") {
      if (start_val >= val) {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = "Right is smaller than left"
        document.querySelector("#matchedit_status_warn").className = "badge badge-pill badge-danger"
      } else if (val > this.matchnumber_max) {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = "Right can't be greater than " + this.matchnumber_max
        document.querySelector("#matchedit_status_warn").className = "badge badge-pill badge-danger"
      } else if ((<HTMLInputElement>document.querySelector("#matchedit_" + name + "_end")).value == "" || (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_start")).value == "") {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = "It can't be empty"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      }else {
        (<HTMLInputElement>document.querySelector("#matchedit_" + name + "_warn")).innerText = ""
        document.querySelector("#matchedit_status_warn").className = "badge badge-pill badge-successful"
      }
    }
  }
  checkBoundary(arr,st,en){
    var judge=true

    for(var ele in arr){
      if (!(arr[ele].start > en || arr[ele].end < st)){
        judge=false
      }
    }
    return judge
  }
  checkManageInput(e){
    e.preventDefault()
    var tem_id=e.target.id
    var name = tem_id.split("_")[0]
    var val = Number(e.target.value)
    var end_val = Number((<HTMLInputElement>document.querySelector("#" + name + "_end")).value)
    var start_val = Number((<HTMLInputElement>document.querySelector("#" + name + "_start")).value)
    if (tem_id.split("_")[1]=="start"){
      if (end_val<=val){
        (<HTMLInputElement>document.querySelector("#"+name + "_warn")).innerText="Right is smaller than left"
        document.querySelector("#status_warn").className ="badge badge-pill badge-danger"
      } else if (val>this.matchnumber_max){
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "Left can't be greater than "+this.matchnumber_max
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      } else if (!this.checkBoundary(this.currentAddMember,start_val,end_val)){
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "Overlap with current tasks"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      } else if (String(start_val)==""){
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "It can't be empty"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      }
      else{
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = ""
        document.querySelector("#status_warn").className = "badge badge-pill badge-successful"
      }
    } else if (tem_id.split("_")[1] == "end"){
      if (start_val >=val) {
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "Right is smaller than left"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      } else if (val > this.matchnumber_max) {
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "Right can't be greater than " + this.matchnumber_max
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      } else if (!this.checkBoundary(this.currentAddMember, start_val, end_val)) {
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "Overlap with current tasks"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      } else if (String(end_val) == "") {
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = "It can't be empty"
        document.querySelector("#status_warn").className = "badge badge-pill badge-danger"
      }else {
        (<HTMLInputElement>document.querySelector("#" + name + "_warn")).innerText = ""
        document.querySelector("#status_warn").className = "badge badge-pill badge-successful"
      }
    }
  }
  checkManageInputPit(e) {
    e.preventDefault()
    var val = e.target.value

    var tem_id = e.target.id
    var name = tem_id.split("_")[1]

    if(val.length>4){
      (<HTMLInputElement>document.querySelector("#pitedit_" + name + "_warn")).innerText = "Number is too large"
      document.querySelector("#pitedit_status_warn").className = "badge badge-pill badge-danger"
    }else if(val.substring(0,1)=="0"){
      (<HTMLInputElement>document.querySelector("#pitedit_" + name + "_warn")).innerText = "It can't start with '0'"
      document.querySelector("#pitedit_status_warn").className = "badge badge-pill badge-danger"
    } else if (val == "") {
      (<HTMLInputElement>document.querySelector("#pitedit_" + name + "_warn")).innerText = "It can't be empty"
      document.querySelector("#pitedit_status_warn").className = "badge badge-pill badge-danger"
    }else{
      (<HTMLInputElement>document.querySelector("#pitedit_" + name + "_warn")).innerText = ""
      document.querySelector("#pitedit_status_warn").className = "badge badge-pill badge-primary"
    }

  }
  getMatchNumber(){
    this.Auth.getAPI3("events/" + this.currentYear).subscribe(data => {
      var key
      this.matchnumber_max=1
      for (var i in data) {
        if(data[i].short_name==this.currentRegionMain){
          key = data[i].key
        }
      }
      this.Auth.getAPI3("event/" + key+"/matches").subscribe(data2 => {
        for(var ele in data2){
          if (data2[ele].comp_level=="qm"){
            if (Number(data2[ele].match_number)>this.matchnumber_max)
              this.matchnumber_max = Number(data2[ele].match_number)
          }
        }
        //console.log(this.matchnumber_max)
      })

    })
  }
  changeHistoryPerson(e){
    this.historyPersonload=true;
    e.preventDefault()
    this.history_person=e.target.value
  }
  getTeamMember(){
    this.Auth.getTeamMember(this.teamnumber).subscribe(data=>{
      this.team_member_list=data.m;
      this.team_member_list.splice(0,0,this.name)
      //console.log(this.team_member_list)
      this.getTeamMemberTask()
    })
  }
  tipOut(e) {
    e.preventDefault()
    var idd=e.target.id+"b"

    var ch = !this.tipsb[idd]
    this.tipsb[idd] = ch
  }
  //----team selection--------
  getSelectedTeamPerference(){
    this.Auth.getSelectedTeamPerference(this.name,this.teamnumber,this.role).subscribe(data=>{
      //console.log(data.m);
      this.selctedPerference=data.m
      //console.log("dddd" + this.selctedPerference)
      this.updateAndGetSelectTeamElementFirstTime()
    })
  }


  updateAndGetSelectTeamElementFirstTime(){
    const ev = this.selctedPerference
    if (ev == 'General_Ability') {
      //console.log('jj')
      return
    } else if (ev == 'Teleop_Total') {
      this.selectTeamOption = [
        "isSelect", "totalcargo", "totalhatch", "climbpoint",
        "cargolvl1", "cargolvl2", "cargolvl3",
        "hatchlvl1", "hatchlvl2", "hatchlvl3",
        "cargoship", "hatchship"]
      this.selectTeamOptionInner = [
        "isSelect", "Total Cargo", "Total Hatch", "Climb Point",
        "Cargo Level1", "Cargo Level2", "Cargo Level3",
        "Hatch Level1", "Hatch Level2", "Hatch Level3",
        "Cargo Cargoship", "Hatch Cargoship"]
    } else if (ev == 'Teleop_Average') {
      this.selectTeamOption = [
        "isSelect", "totalcargoA", "totalhatchA", "climbpointA",
        "cargolvl1A", "cargolvl2A", "cargolvl3A",
        "hatchlvl1A", "hatchlvl2A", "hatchlvl3A",
        "cargoshipA", "hatchshipA"]
      this.selectTeamOptionInner = [
        "isSelect", "Total Cargo", "Total Hatch", "Climb Point",
        "Cargo Level1", "Cargo Level2", "Cargo Level3",
        "Hatch Level1", "Hatch Level2", "Hatch Level3",
        "Cargo Cargoship", "Hatch Cargoship"]
    } else if (ev == 'Autonomous_Total') {
      this.selectTeamOption = [
        "totalautopoint", "exitplatform"
        , "autohatch", "autocargo"]
      this.selectTeamOptionInner = [
        "Total Auto Pnts", "Exit Plaform pnts"
        , "Hatch in Auto", "Cargo in Auto"]
    } else if (ev == 'Autonomous_Average') {
      this.selectTeamOption = [
        "totalautopointA", "exitplatformA"
        , "autohatchA", "autocargoA"]
      this.selectTeamOptionInner = [
        "Total Auto Pnts", "Exit Plaform pnts"
        , "Hatch in Auto", "Cargo in Auto"]
    }
    this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)
    this.Auth.updateSelectedTeamPerference(this.teamnumber, this.name, this.role, ev).subscribe(data => {
      //console.log(this.selectTeamOption)
    })
  }
  updateAndGetSelectTeamElement(){
    const ev = (<HTMLSelectElement>document.querySelector("#selectTeamElement")).value 
    console.log(ev)
    if (ev =='General_Ability'){
      //console.log('jj')
      return
    } else if (ev == 'Teleop_Total'){
      this.selectTeamOption = [
        "isSelect", "totalcargo", "totalhatch", "climbpoint",
        "cargolvl1","cargolvl2","cargolvl3",
        "hatchlvl1","hatchlvl2","hatchlvl3",
        "cargoship","hatchship"]
      this.selectTeamOptionInner  = [
        "isSelect", "Total Cargo", "Total Hatch", "Climb Point",
        "Cargo Level1", "Cargo Level2", "Cargo Level3",
        "Hatch Level1", "Hatch Level2", "Hatch Level3",
        "Cargo Cargoship", "Hatch Cargoship"]
    } else if (ev == 'Teleop_Average') {
      this.selectTeamOption = [
        "isSelect", "totalcargoA", "totalhatchA", "climbpointA",
        "cargolvl1A", "cargolvl2A", "cargolvl3A",
        "hatchlvl1A", "hatchlvl2A", "hatchlvl3A",
        "cargoshipA", "hatchshipA"]
      this.selectTeamOptionInner  = [
        "isSelect", "Total Cargo", "Total Hatch","Climb Point",
        "Cargo Level1", "Cargo Level2", "Cargo Level3",
        "Hatch Level1", "Hatch Level2", "Hatch Level3",
        "Cargo Cargoship", "Hatch Cargoship"]
    } else if (ev == 'Autonomous_Total') {
      this.selectTeamOption = [
        "totalautopoint","exitplatform"
        ,"autohatch","autocargo"]
      this.selectTeamOptionInner = [
        "Total Auto Pnts", "Exit Plaform pnts"
        , "Hatch in Auto", "Cargo in Auto"]  
    } else if (ev == 'Autonomous_Average') {
      this.selectTeamOption = [
        "totalautopointA", "exitplatformA"
        , "autohatchA", "autocargoA"]
      this.selectTeamOptionInner = [
        "Total Auto Pnts", "Exit Plaform pnts"
        , "Hatch in Auto", "Cargo in Auto"]
    }
    this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)
    this.Auth.updateSelectedTeamPerference(this.teamnumber, this.name, this.role, ev).subscribe(data=>{
      console.log(data)
    })
    //console.log(this.gridApi3.getSelectedRows())
  }
  onGridReady3(params) {
    this.gridApi3 = params.api;
  }

  getSelectedTeam(option, optionInner){
    this.Auth.getSelectedTeam(this.teamnumber, this.currentRegionMain, option, optionInner).subscribe(data=>{
     
      this.col_index3=data.col_index
      this.currentData3=data.output
      //console.log(this.currentData3)
    })
  }


  //-----data------
  textSearch(input){
    if(input=="total"){
      this.gridApi.setQuickFilter((<HTMLInputElement>document.querySelector('#filter-box')).value)
    }
    else if(input=='average'){
      this.gridApiA.setQuickFilter(String((<HTMLInputElement>document.querySelector('#filter-boxA')).value))
    } else if (input == 'select') {
      this.gridApi3.setQuickFilter(String((<HTMLInputElement>document.querySelector('#filter-boxS')).value))
    }
  }
arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }

  return true;
}
  selectTeam(){
    this.selectLoader=true
    this.gridApi.showLoadingOverlay()
    this.gridApiA.showLoadingOverlay()
    this.gridApi3.showLoadingOverlay()
    return this.Auth.selectTeam(this.currentRegionMain, this.teamnumber, this.currentSelect, this.currentNotSelect).subscribe(data=>{
      console.log(data)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data => {
        this.col_index = data.col_index
        this.currentData = data.output
        this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)        
        console.log(this.col_index, this.currentData)
        
      })
    })
  }
  
  selectTeamA() {
    this.selectLoaderA = true
    this.gridApi.showLoadingOverlay()
    this.gridApiA.showLoadingOverlay()
    this.gridApi3.showLoadingOverlay()
    return this.Auth.selectTeam(this.currentRegionMain, this.teamnumber, this.currentSelectA, this.currentNotSelectA).subscribe(data => {
      console.log(data)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data => {
        this.col_indexA = data.col_index
        this.currentDataA = data.output
        this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)
        //console.log(this.col_index, this.currentData)
      })
    })
  }

  selectTeam2() {
    this.selectLoader = true
    return this.Auth.selectTeam(this.currentRegionMain, this.teamnumber, this.currentSelectA, this.currentNotSelectA).subscribe(data => {
      console.log(data)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data => {
        this.col_index = data.col_index
        this.currentData = data.output

        console.log(this.col_index, this.currentData)
      })
    })
  }

  selectTeamA2() {
    this.selectLoaderA = true
    return this.Auth.selectTeam(this.currentRegionMain, this.teamnumber, this.currentSelect, this.currentNotSelect).subscribe(data => {
      console.log(data)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data => {
        this.col_indexA = data.col_index
        this.currentDataA = data.output
        //console.log(this.col_index, this.currentData)
      })
    })
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onGridReadyA(params) {
    this.gridApiA = params.api;
  }
  onBtExport() {
    var params = {
      fileName: (<HTMLInputElement>document.querySelector("#fileName")).value,
      columnSeparator: ','
    };
    //console.log(params)
    this.gridApi.exportDataAsCsv(params);
  }
  onBtExportA() {
    var params = {
      fileName: (<HTMLInputElement>document.querySelector("#fileNameA")).value,
      columnSeparator: ','
    };
    //console.log(params)
    this.gridApiA.exportDataAsCsv(params);
  }

  setcurrentRegionMain(event){ 
    this.currentRegionMain = event.target.currentevent.value
    this.Auth.setMainEvent(this.teamnumber, this.name, this.currentRegionMain ).subscribe(data => {
      //console.log(data)
      this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data3 => {
        this.col_indexA = data3.col_index
        this.currentDataA = data3.output
      })
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data4 => {
        this.col_index = data4.col_index
        this.currentData = data4.output

      })
      this.Auth.getAPI3("events/" + this.currentYear).subscribe(data2 => {
        for (var ele in data2) {
          if (data2[ele].short_name == this.currentRegionMain) {
            this.currentRegionMainId = data2[ele].key
            this.getCurrentRegionTeams()
            break
          }

        }
      })

      this.getMatchNumber()
      
    })
    //console.log(this.currentRegionMain)
  }

  getcurrentRegionMain() {
    this.Auth.getcurrentRegionMain(this.teamnumber, this.name).subscribe(data => {
      this.currentRegionMain=data.m
      console.log(data.m)
      this.Auth.getAPI3("events/" + this.currentYear).subscribe(data2 => {
        for(var ele in data2){
          if (data2[ele].short_name ==this.currentRegionMain){
            this.currentRegionMainId = data2[ele].key
            this.getCurrentRegionTeams()
            break
          }
        }
        
      })
    })
    //console.log(this.currentRegionMain)
  }
 contains(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] ==element) {
      return true;
    }
  }
  return false;
}

  loadrank(){
    this.currentOptionA = ["isSelect"]
    this.currentOptionInnerA = ["isSelect"]
    this.col_indexA = []
    this.currentOption = ["isSelect"]
    this.currentOptionInner = ["isSelect"]
    this.col_index = []
    var optionsVar = (<HTMLSelectElement>document.querySelector('#rankOpt')).options
    var selectedoptionsVar = (<HTMLSelectElement>document.querySelector('#rankOpt')).selectedOptions
    var optionsVarlist = []
    var selectedoptionsVarlist = []

    for (var i = 0; i < optionsVar.length; i++) {
      optionsVarlist.push(optionsVar[i].value)
    }

    for (var i = 0; i < selectedoptionsVar.length; i++) {
      selectedoptionsVarlist.push(selectedoptionsVar[i].value)
    }

    for (var i = 0; i < optionsVar.length; i++) {
      if (!this.contains(selectedoptionsVarlist, optionsVarlist[i])) {
        this.rankperference[optionsVar[i].value] = false
      } else {
        this.currentOptionA.push(String(optionsVar[i].value)+"A")
        this.currentOptionInnerA.push(optionsVar[i].innerText)
        this.currentOption.push(optionsVar[i].value)
        this.currentOptionInner.push(optionsVar[i].innerText)
        this.rankperference[optionsVar[i].value] = true
      }
    }
  
    //console.log(this.currentOption)
    this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data=>{
      
      this.col_index=data.col_index
      this.currentData=data.output
    })

    
    this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data => {
      this.col_indexA = data.col_index
      this.currentDataA = data.output
    })
    
    var temPerference = []
    for(var i=1; i<this.currentOption.length;i++){
      temPerference.push(this.currentOption[i])
    }
    this.Auth.updaterankPerference(this.name, this.teamnumber, this.role, temPerference).subscribe(data => {
      
    })
  }

  loadrankA() {
    this.currentOptionA = ["isSelect"]
    this.currentOptionInnerA = ["isSelect"]
    this.col_indexA = []
    this.currentOption = ["isSelect"]
    this.currentOptionInner = ["isSelect"]
    this.col_index = []
    
    var optionsVar = (<HTMLSelectElement>document.querySelector('#rankOptA')).options
    var selectedoptionsVar = (<HTMLSelectElement>document.querySelector('#rankOptA')).selectedOptions
    
    var optionsVarlist=[]
    var selectedoptionsVarlist=[]
    console.log(<HTMLSelectElement>document.querySelector('#rankOptA'))
    for (var i = 0; i<optionsVar.length;i++){
      optionsVarlist.push(optionsVar[i].value)
    }
    for (var i = 0; i < selectedoptionsVar.length; i++) {
      selectedoptionsVarlist.push(selectedoptionsVar[i].value)
      
    }
    console.log(selectedoptionsVarlist, optionsVarlist)
    for (var i = 0; i < optionsVar.length; i++) {
      if (!this.contains(selectedoptionsVarlist, optionsVarlist[i])){
        this.rankperference[optionsVar[i].value.substring(0, optionsVar[i].value.length - 1)] = false
      }else{
        
        this.currentOptionA.push(optionsVar[i].value)
        this.currentOptionInnerA.push(optionsVar[i].innerText)
        this.currentOption.push(optionsVar[i].value.substring(0, optionsVar[i].value.length - 1))
        this.currentOptionInner.push(optionsVar[i].innerText)
        this.rankperference[optionsVar[i].value.substring(0, optionsVar[i].value.length - 1)] = true
        
    }
  }
    
    /*
    for (var i = 0; i < document.querySelector('#rankOptA').selectedOptions.length; i++) {
      this.currentOptionA.push(document.querySelector('#rankOptA').selectedOptions[i].value)
      this.currentOptionInnerA.push(document.querySelector('#rankOptA').selectedOptions[i].innerText)
      this.rankperference[document.querySelector('#rankOptA').selectedOptions[i].value.substring(0, document.querySelector('#rankOptA').selectedOptions[i].value.length - 1)] = true
    }*/
    //console.log(this.currentOptionA)
    this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data => {
      this.col_indexA = data.col_index
      this.currentDataA = data.output
      //console.log(this.col_index, this.currentData)
    })

    
    this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data => {
      this.col_index = data.col_index
      this.currentData = data.output
      
    })

    var temPerference = []
    for (var i = 1; i < this.currentOptionA.length; i++) {
      temPerference.push(this.currentOptionA[i].substring(0, this.currentOptionA[i].length - 1))
    }
    
    this.Auth.updaterankPerference(this.name, this.teamnumber, this.role, temPerference).subscribe(data => {
      //console.log(temPerference)
      //console.log(data)
    })
  }
  test(event){
    event.preventDefault()
    console.log(event.target.innerText)
  }
  //-----JS replacement function-----
  addhatchlvl3(b: boolean) {
    if (b && this.hatchlvl3 < 4)
      this.hatchlvl3++
    else if(!b){
      if (this.hatchlvl3 > 0)
        this.hatchlvl3--
      else {

      }
    }
    this.Auth.updateMatch("hatchlvl3", this.hatchlvl3, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }

  //--------Edit Match Function---------
  addhatchlvl3Edit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchlvl3Edit')).value)
    if (b && edit_tem_value < 4)
      (<HTMLSelectElement>document.querySelector('#addhatchlvl3Edit')).value = String(edit_tem_value+1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addhatchlvl3Edit')).value = String(edit_tem_value-1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchlvl3Edit')).value)
    this.Auth.updateMatchEdit("hatchlvl3", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    }) 
    //console.log(edit_tem_value)
    
  }

  addhatchlvl2Edit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchlvl2Edit')).value)
    if (b && edit_tem_value < 4)
      (<HTMLSelectElement>document.querySelector('#addhatchlvl2Edit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addhatchlvl2Edit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchlvl2Edit')).value)
    this.Auth.updateMatchEdit("hatchlvl2", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    //console.log(edit_tem_value)

  }

  addhatchlvl1Edit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchlvl1Edit')).value)
    if (b && edit_tem_value < 4)
      (<HTMLSelectElement>document.querySelector('#addhatchlvl1Edit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addhatchlvl1Edit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchlvl1Edit')).value)
    this.Auth.updateMatchEdit("hatchlvl1", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
  //onsole.log(edit_tem_value)

  }

  addcargolvl3Edit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargolvl3Edit')).value)
    if (b && edit_tem_value < 4)
      (<HTMLSelectElement>document.querySelector('#addcargolvl3Edit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addcargolvl3Edit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargolvl3Edit')).value)
    this.Auth.updateMatchEdit("cargolvl3", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
  //console.log(edit_tem_value)

  }

  addcargolvl2Edit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargolvl2Edit')).value)
    if (b && edit_tem_value < 4)
      (<HTMLSelectElement>document.querySelector('#addcargolvl2Edit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addcargolvl2Edit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargolvl2Edit')).value)
    this.Auth.updateMatchEdit("cargolvl2", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
  //console.log(edit_tem_value)

  }

  addcargolvl1Edit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargolvl1Edit')).value)
    if (b && edit_tem_value < 4)
      (<HTMLSelectElement>document.querySelector('#addcargolvl1Edit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addcargolvl1Edit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargolvl1Edit')).value)
    this.Auth.updateMatchEdit("cargolvl1", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    //console.log(edit_tem_value)

  }

  addhatchshipEdit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchshipEdit')).value)
    if (b && edit_tem_value < 8)
      (<HTMLSelectElement>document.querySelector('#addhatchshipEdit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addhatchshipEdit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addhatchshipEdit')).value)
    this.Auth.updateMatchEdit("hatchship", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    //console.log(edit_tem_value)

  }

  addcargoshipEdit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargoshipEdit')).value)
    if (b && edit_tem_value < 8)
      (<HTMLSelectElement>document.querySelector('#addcargoshipEdit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addcargoshipEdit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addcargoshipEdit')).value)
    this.Auth.updateMatchEdit("cargoship", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    //console.log(edit_tem_value)

  }
  addeditdroppieceEdit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditdroppieceEdit')).value)
    if (b)
      (<HTMLSelectElement>document.querySelector('#addeditdroppieceEdit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addeditdroppieceEdit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditdroppieceEdit')).value)
    this.Auth.updateMatchEdit("defensedrop", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    console.log(edit_tem_value)

  }
  addeditblockEdit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditblockEdit')).value)
    if (b)
      (<HTMLSelectElement>document.querySelector('#addeditblockEdit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addeditblockEdit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditblockEdit')).value)
    this.Auth.updateMatchEdit("defenseblock", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    console.log(edit_tem_value)

  }
  addeditdrophatchEdit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditdrophatchEdit')).value)
    if (b)
      (<HTMLSelectElement>document.querySelector('#addeditdrophatchEdit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addeditdrophatchEdit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditdrophatchEdit')).value)
    this.Auth.updateMatchEdit("hatchdrop", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    //console.log(edit_tem_value)

  }
  addeditdropcargoEdit(b: boolean) {
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditdropcargoEdit')).value)
    if (b)
      (<HTMLSelectElement>document.querySelector('#addeditdropcargoEdit')).value = String(edit_tem_value + 1)
    else if (!b) {
      if (edit_tem_value > 0)
        (<HTMLSelectElement>document.querySelector('#addeditdropcargoEdit')).value = String(edit_tem_value - 1)
      else {

      }
    }
    var edit_tem_value = parseInt((<HTMLSelectElement>document.querySelector('#addeditdropcargoEdit')).value)
    this.Auth.updateMatchEdit("cargodrop", edit_tem_value, this.editdata.id).subscribe(data => {
      //console.log(data)
    })
    //console.log(edit_tem_value)

  }

  //--------Edit Match Function---------

  addcargolvl3(b: boolean) {
    if (b && this.cargolvl3 < 4)
      this.cargolvl3++
    else if (!b) {
      if (this.cargolvl3 > 0)
        this.cargolvl3--
      else {

      }
    }
    this.Auth.updateMatch("cargolvl3", this.cargolvl3, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addhatchlvl2(b: boolean) {
    if (b && this.hatchlvl2 < 4)
      this.hatchlvl2++
    else if (!b) {
      if (this.hatchlvl2 > 0)
        this.hatchlvl2--
      else {

      }
    }
    this.Auth.updateMatch("hatchlvl2", this.hatchlvl2, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }

  addcargolvl2(b: boolean) {
    if (b && this.cargolvl2 < 4)
      this.cargolvl2++
    else if (!b) {
      if (this.cargolvl2 > 0)
        this.cargolvl2--
      else {

      }
    }
    this.Auth.updateMatch("cargolvl2", this.cargolvl2, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addhatchlvl1(b: boolean) {
    if (b && this.hatchlvl1 < 4)
      this.hatchlvl1++
    else if (!b) {
      if (this.hatchlvl1 > 0)
        this.hatchlvl1--
      else {

      }
    }
    this.Auth.updateMatch("hatchlvl1", this.hatchlvl1, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addcargolvl1(b: boolean) {
    if (b && this.cargolvl1 < 4)
      this.cargolvl1++
    else if (!b) {
      if (this.cargolvl1 > 0)
        this.cargolvl1--
      else {

      }
    }
    this.Auth.updateMatch("cargolvl1", this.cargolvl1, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addcargoship(b: boolean) {
    if (b && this.cargoship < 8)
      this.cargoship++
    else if (!b) {
      if (this.cargoship > 0)
        this.cargoship--
      else {

      }
    }
    this.Auth.updateMatch("cargoship", this.cargoship, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addhatchship(b: boolean) {
    if (b && this.hatchship < 8)
      this.hatchship++
    else if (!b) {
      if (this.hatchship > 0)
        this.hatchship--
      else {

      }
    }
    this.Auth.updateMatch("hatchship", this.hatchship, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }


  addeditdrophatch2(b: boolean) {
    if (b)
      this.editdrophatch2++
    else {
      if (this.editdrophatch2 > 0)
        this.editdrophatch2--
      else {

      }
    }
  }
  addeditdropcargo2(b: boolean) {
    if (b)
      this.editdropcargo2++
    else {
      if (this.editdropcargo2 > 0)
        this.editdropcargo2--
      else {

      }
    }
  }
  addeditdroppiece2(b: boolean) {
    if (b)
      this.editdroppiece2++
    else {
      if (this.editdroppiece2 > 0)
        this.editdroppiece2--
      else {

      }
    }
  }
  addeditblock2(b: boolean) {
    if (b)
      this.editblock2++
    else {
      if (this.editblock2 > 0)
        this.editblock2--
      else {

      }
    }
  }

  addeditdrophatch(b:boolean){
    if(b)
      this.editdrophatch++
    else{
      if(this.editdrophatch>0)
        this.editdrophatch--
      else{

      }  
    }
    this.Auth.updateMatch("hatchdrop", this.editdrophatch , this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addeditdropcargo(b:boolean) {
    if (b)
      this.editdropcargo++
    else {
      if (this.editdropcargo > 0)
        this.editdropcargo--
      else {

      }
    }
    this.Auth.updateMatch("cargodrop", this.editdropcargo, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addeditdroppiece(b: boolean) {
    if (b)
      this.editdroppiece++
    else {
      if (this.editdroppiece > 0)
        this.editdroppiece--
      else {

      }
    }
    this.Auth.updateMatch("defensedrop", this.editdroppiece, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  addeditblock(b: boolean) {
    if (b)
      this.editblock++
    else {
      if (this.editblock > 0)
        this.editblock--
      else {

      }
    }
    this.Auth.updateMatch("defenseblock", this.editblock, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  //------service request function-----

  //----History----
  setEditingToFalse(){
    this.editingThethree=false
    this.editingTeamnumber=false
  }
  updateMatchEdit(event) {
    event.preventDefault()
    const target = event.target
    if (target.id == 'region' || target.id == 'matchnumber' || target.id == 'teamnumber') {
      this.editingThethree = true
    }
    this.Auth.updateMatchEdit(target.id, target.value, this.editdata.id).subscribe(data => {
      //console.log(data)
    }) 
  }

  updatePitEdit(event) {
    event.preventDefault()
    const target = event.target
    if (target.id == 'teamnumber') {
      this.editingTeamnumber = true
    }
    this.Auth.updatePitEdit(target.id, target.value, this.editdataPit.id).subscribe(data => {
      //console.log(data)
    })
  }
  getEditDataMatch(e){
    this.editMatchLoader = true
    this.editingThethree = false
    const inner = e.target.innerText.split('-')

    if(inner.length==3){
    //console.log(inner)
    this.Auth.getEditDataMatch(this.teamnumber,this.history_person,inner[0],inner[1],inner[2]).subscribe(data=>{
      //console.log(data.m)
      for(var i=0;i<this.editdatastring.length;i++){
        this.editdata[this.editdatastring[i]] = data.m[0][this.editdatastring[i]]  
      }
      this.editMatchLoader = false
      //console.log(this.editdata)
    })
  }else{
      this.Auth.getEditDataMatch(this.teamnumber, this.history_person, inner[0]+"-"+inner[1], inner[2], inner[3]).subscribe(data => {
        //console.log(data.m)
        for (var i = 0; i < this.editdatastring.length; i++) {
          this.editdata[this.editdatastring[i]] = data.m[0][this.editdatastring[i]]
        }
        this.editMatchLoader = false
        //console.log(this.editdata)
      })
  }
  }
  getEditDataMatchPit(e) {
    this.editingTeamnumber = false
    this.editPitLoader=true
    const inner = e.target.innerText
    console.log(inner)
    this.Auth.getEditDataMatchPit(this.teamnumber, this.history_person, inner).subscribe(data => {
      console.log(data.m)
      for (var i = 0; i < this.editdatastringPit.length; i++) {
        this.editdataPit[this.editdatastringPit[i]] = data.m[0][this.editdatastringPit[i]]
      }
      //console.log(this.editdataPit)
      this.editPitLoader = false
    })
  }
  showHistory(date){
    //console.log('a' + date.split('-').join(""))
    return this.historybs[0]['a'+date.split('-').join("")]
  }
  showHistoryPit(date) {
    //console.log('a' + date.split('-').join(""))
    return this.historybs_pit[0]['a' + date.split('-').join("")]
  }
  getHistory(nn){
    this.Auth.getHistory(nn, this.teamnumber).subscribe(data=>{
      if (this.isFirstHistory==0 && this.history==[]){
        this.historyload=true
      }
      //console.log(data)
      if (this.currentHdate != data.currentId){
        this.historybs = data.bs
      } 
      if (this.currentHdate != data.currentId || this.currentHmatch != data.col_name){
        this.history=[]
      this.currentHdate = data.currentId
      this.currentHmatch = data.col_name
      this.date =data.currentId.split("/")
      this.datematch = data.col_name.split("*")
      
      this.dateid=[]

        for (var i = 0; i < this.date.length; i++) {
          this.dateid.push("#" + this.date[i])
        }

      for (var i = 0; i < this.datematch.length;i++){
        this.datematch[i] = this.datematch[i].split("/")
      }

      for (var i = 0; i < this.datematch.length; i++) {
        this.history.push(
          {
            date: this.date[i],
            match:this.datematch[i],
            dateid: this.dateid[i]
        }
        )
      }
      if(this.isFirstHistory==0){
        this.historyload = false
        this.isFirstHistory=1
      }
    }
      if(data.currentId==""){
        this.history=[
          {
          date: "No history",
            dateid: "#No history",
          match: []
          }]
        this.historyload = false
        this.historyPersonload = false;
      }
    })

    this.Auth.getHistoryPit(nn, this.teamnumber).subscribe(data => {
      
      if (this.isFirstHistory_pit == 0 && this.history_pit == []) {
        this.historyload = true
      }
      //console.log(data)
      if (this.currentHdate_pit != data.currentId) {
        this.historybs_pit = data.bs
      }
      if (this.currentHdate_pit != data.currentId || this.currentHmatch_pit != data.col_name) {
        this.history_pit = []
        this.currentHdate_pit = data.currentId
        this.currentHmatch_pit = data.col_name
        this.date_pit = data.currentId.split("/")
        this.datematch_pit = data.col_name.split("*")

        this.dateid_pit = []

        for (var i = 0; i < this.date_pit.length; i++) {
          this.dateid_pit.push("#" + this.date[i])
        }

        for (var i = 0; i < this.datematch_pit.length; i++) {
          this.datematch_pit[i] = this.datematch_pit[i].split("/")
        }

        for (var i = 0; i < this.datematch_pit.length; i++) {
          this.history_pit.push(
            {
              date: this.date_pit[i],
              match: this.datematch_pit[i],
              dateid: this.dateid_pit[i]
            }
          )
        }
        if (this.isFirstHistory_pit == 0) {
          this.historyload_pit = false
          this.isFirstHistory_pit = 1
        }
      }
      if (data.currentId == "") {
        this.history_pit = [
          {
            date: "No history",
            dateid: "#No history",
            match: []
          }]
      }

    })
  }


  openHistory(event){
    event.preventDefault()
    
    const inner = 'a' + event.target.innerText.split(' ')[0].split('-').join("")
    this.historybs[0][inner] = !this.historybs[0][inner]
    //console.log(this.historybs[0][inner])
  }

  openHistoryPit(event) {
    event.preventDefault()

    const inner = 'a' + event.target.innerText.split(' ')[0].split('-').join("")
    this.historybs_pit[0][inner] = !this.historybs_pit[0][inner]
    //console.log(this.historybs_pit[0][inner])
  }
    //-----blue alliance
  getEventVP3(event){
    this.Auth.getAPI3("events/"+this.currentYear).subscribe(data=>{
      var selectedevent=[]
       
        if (event.target.value == "Houston") {
          for (var ele in data) {
            if (data[ele].city == "Houston" && data[ele].event_type_string == "Championship Division") {
              selectedevent.push({
                long: data[ele].name,
                short: data[ele].short_name
             }
                )
            } 
          }
        } else if (event.target.value == "Detroit") {
          for (var ele in data) {
            if (data[ele].city == "Detroit" && data[ele].event_type_string == "Championship Division") {
              selectedevent.push({
                long: data[ele].name,
                short: data[ele].short_name
              })
            }
          }
        } else if (event.target.value == "Offseason"){
          for (var ele in data) {
            if (data[ele].event_type_string == "Offseason") {
              selectedevent.push({
                long: data[ele].name,
                short: data[ele].short_name
              })
            }
          }
        }
        else {
          for (var ele in data) {
            if (data[ele].week == event.target.value - 1) {
            selectedevent.push({
              long: data[ele].name,
              short: data[ele].short_name
            })
          }
        }
      }
      this.editMatchEvent = selectedevent
      //console.log(selectedevent)
      //event.target.value
    })
  }
  //--------end of blue alliance

  resetMatchForm(){
    this.updateTotalVal()
    for (var i = 0; i < this.bs2.length; i++) {
      this.bs2[i].b=false;
    }
    this.currentMatchTeam = "none"
    this.currentRegion = "none"
    this.currentMatchNumber = 0
    this.currentMatch = "none"
    this.matchspinnerb = true
    this.pitspinner = true
    this.thethreereply.mes ="Complete to unlock the rest"
    this.thethreereply.style ="alert alert-danger"
    this.matchLock=false
  }

    //----update pit form-----

  resetPitForm() {
    for (var i = 0; i < this.bs.length; i++) {
      this.bs[i].b = false;
    }
    this.matchspinnerb = true
    this.pitspinner = true
    this.currentPit = "none"
    this.currentPitReceiver = "5805"
    this.currentImage = null
    this.currentImageTitle = "5805"
    this.pitLock=false;
    (<HTMLInputElement>document.querySelector("#manual_add_pit")).style.display = "inline"

  }
  sendcurrentPit(event){
    event.preventDefault()
    this.currentPitReceiver=String(event.target.value)

    var tt = this.currentPitReceiver
    this.currentRegionTeams.forEach(function(value){
      if (value.indexOf(tt) >= 0){
        (<HTMLInputElement>document.querySelector("#a" + value + "_manual_add_pit")).style.display="inline"
      }else{
        (<HTMLInputElement>document.querySelector("#a" + value + "_manual_add_pit")).style.display = "none"
      }
    })
    //console.log(this.currentPitReceiver)
  }

  copyToAddPit(e){
    e.preventDefault()
    var idd=e.target.id
    var lll=idd.split("_")

    var val = lll[0].substring(1, lll[0].length)
    if(lll.length==4){
      (<HTMLInputElement>document.querySelector("#teamnumber_sender")).value = val
      this.currentPitReceiver=val
    }

  }
  
  updatePit(event){
    event.preventDefault()
    const target = event.target
    if (target.id == "sensor" || target.id=="autochoice"){
      var idd="";
      var opts = target.selectedOptions;
      for (var i = 0; i < opts.length; i++) {
        if (i != opts.length-1){
          idd += opts[i].value + "/"
        }else{
          idd += opts[i].value
        }
      }
      
      this.Auth.updatePit(target.id, idd, this.name, this.teamnumber, this.currentPit).subscribe(data => {
        console.log(idd)
        if (data.col_name == "teamnumber") {
          this.editPitError = false
          this.pitLock = true;
          (<HTMLInputElement>document.querySelector("#manual_add_pit")).style.display = "none"
          this.getTotal_pit_match()
        }
        this.currentPit = data.currentId
        //console.log(data.currentId)
      })
    }else{
    this.Auth.updatePit(target.id,target.value,this.name,this.teamnumber,this.currentPit).subscribe(data=>{
      if(data.col_name=="teamnumber"){
        this.editPitError=false
        this.pitLock = true;
        (<HTMLInputElement>document.querySelector("#manual_add_pit")).style.display="none"
        this.getTotal_pit_match()
      }
      this.currentPit=data.currentId
      console.log(data.currentId)
    })
  }
  }

  updatePitTask(event) {
    event.preventDefault()
    const target = event.target
    if (target.id == "sensor" || target.id == "autochoice") {
      var idd = "";
      var opts = target.selectedOptions;
      for (var i = 0; i < opts.length; i++) {
        if (i != opts.length - 1) {
          idd += opts[i].value + "/"
        } else {
          idd += opts[i].value
        }
      }

      this.Auth.updatePit(target.id, idd, this.name, this.teamnumber, this.currentPitTask).subscribe(data => {
        console.log(idd)
        if (data.col_name == "teamnumber") {
          this.editPitError = false
          this.pitLock2 = true;
          (<HTMLInputElement>document.querySelector("#manual_add_pit")).style.display = "none"
          this.getTotal_pit_match()
        }
        this.currentPitTask = data.currentId
        //console.log(data.currentId)
      })
    }else{
    this.Auth.updatePit(target.id, target.value, this.name, this.teamnumber, this.currentPitTask).subscribe(data => {
      if (data.col_name == "teamnumber") {
        this.editPitError = false
        this.pitLock2 = true
        this.getTotal_pit_match()
      }
      this.currentPitTask = data.currentId
      //console.log(data.currentId)
    })
  }
  }
  updatePitForm(){
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
    //console.log(split[0])
  }
  editPit(event){
    event.preventDefault()
    const ids = ['#isTeam','#isWH','#isSensor', '#isImage', '#isAT', '#isAA', '#isTA'
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
      
      //console.log(this.bs)
    })
    
  }

    //-----update match form------
  updateTotalVal(){
    this.Auth.updateTotalVal(this.teamnumber,this.currentRegion, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }
  sendcurrentMatchTeam(event){
    event.preventDefault()
    this.currentMatchTeam=event.target.value
  }

  sendcurrentMatchNumber(event) {
    event.preventDefault()
    this.currentMatchNumber = event.target.value
  }

  sendcurrentRegion(event) {
    event.preventDefault()
    this.currentRegion = event.target.value
  }

  updateMatch(event) {
    event.preventDefault()
    const target = event.target
    if(this.currentRegion=="none"){
      this.currentRegion = String(this.currentRegionMain);
    }
    this.Auth.updateMatch(target.id, target.value, this.name, this.teamnumber, this.currentMatch,this.currentRegion,this.currentMatchNumber,this.currentMatchTeam).subscribe(data => {
      console.log(data)
      if (data.currentId == "Match Already Exist, go to history page to edit" || data.currentId == "Fill in all the part"){
        this.thethreereply.mes = data.currentId
      }else{
        this.matchLock = true
        this.thethreereply.mes="Unlocked!"
        this.thethreereply.style ="alert alert-success"
        this.currentMatch = data.currentId
        this.getTotal_pit_match()
      }
    })
  }

  resetPitLock(){
    this.editPitError = true
    this.pitLock2 = false;
    this.currentPitTask="none";
    (<HTMLInputElement>document.querySelector("#manual_add_pit")).style.display = "inline"
  }

  resetMatchLock() {
    this.matchLock = false
    this.thethreereply = {
      mes: "Complete to unlock the rest",
      style: "alert alert-danger"
    }
  }

  updateMatchTask(event){
    event.preventDefault()
    const target = event.target
    this.currentMatchTeam=this.currentTask.teamnumber
    this.currentMatchNumber=Number(this.currentTask.matchnumber)
    this.currentRegion = this.currentTask.region
    this.Auth.updateMatch(target.id, target.value, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)

      if (data.currentId == "Match Already Exist, go to history page to edit" || data.currentId == "Fill in all the part") {
        this.thethreereply.mes = data.currentId
      } else {
        this.matchLock = true
        this.currentMatch = data.currentId
        this.thethreereply.mes = "Unlocked!"
        this.thethreereply.style = "alert alert-success"
        this.getTotal_pit_match()
      }
    })
  }
  updateMatchCounter(event){
    //if()
    event.preventDefault()
    const target = event.target
    this.Auth.updateMatch(target.id, target.value, this.name, this.teamnumber, this.currentMatch, this.currentRegion, this.currentMatchNumber, this.currentMatchTeam).subscribe(data => {
      console.log(data)
      this.currentMatch = data.currentId
      //console.log(data.currentId)
    })
  }


  editMatch(event) {
    event.preventDefault()
    const ids = ['#isEvent', '#isMatch', '#isTeam', '#isImage', '#isA', '#isAP', '#isTP'
      , '#isDe', '#isEfficient', ,'#isFit','#isEndgame', '#isQ', '#isN']
    const target = event.target
    const falseElement = ids.filter(id => target.querySelector(id).checked == false)
    this.Auth.editMatch(falseElement, this.name, this.teamnumber).subscribe(data => {
      //console.log(data)
      const split = data.m.split('/')
      var count = 0;
      for (var i = 0; i < this.bs2.length; i++) {
        for (var i2 = 0; i2 < split.length; i2++) {
          if (this.bs2[i].id == split[i2]) {
            count++;
          }
        }
        if (count > 0) {
          this.bs2[i].b = false
        } else {
          this.bs2[i].b = true
        }
        count = 0
      }
      //console.log(this.bs2)
    })

  }
  //------image update------

  updatePitImage(){
    
    this.Auth.updatePitImage(this.currentPit,this.currentImage,this.currentImageTitle,this.name,this.teamnumber).subscribe(data=>{
      console.log(data)
      this.currentMatch = data.currentId
   })
  }

  setCurrentImageTitle(event){
    event.preventDefault()
    this.currentImageTitle = event.target.value
  }

  setCurrentImage(event) {
    event.preventDefault()
    //console.log(event.target.files)
    const reader=new FileReader()
    reader.onload=(filedata:any)=>{
      this.currentImage = filedata.target.result
    }
    this.currentImage = event.target.files[0]
    reader.readAsDataURL(event.target.files[0])
  }

  //------login and sign up user-------
  loginUser(event){
    (<HTMLButtonElement>document.querySelector("#loginnnn")).innerText="Logging in"

    event.preventDefault()
    const target = event.target
    const role = target.querySelector('#role').value
    const name = target.querySelector('#name').value
    const team = target.querySelector('#teamnumberr').value
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
      this.getHistory(this.name);
      (<HTMLButtonElement>document.querySelector("#loginnnn")).innerText = "Login"
    })
    //console.log(name, team,password)
  }
}
