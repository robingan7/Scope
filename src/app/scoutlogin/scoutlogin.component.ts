import { Component, OnInit, ViewChild } from '@angular/core';
import { ScoutloginServiceService } from '../scoutlogin-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { fullWidthCellRenderer } from '../full-width-col/full-width-col.component'
declare var $;

@Component({
  selector: 'scoutlogin',
  templateUrl: './scoutlogin.component.html',
  styleUrls: ['./scoutlogin.component.css']
})

export class ScoutloginComponent implements OnInit {
  
  @ViewChild('addpit') public addpit:NgForm

  
  //-----oninit---------

  lengthh = 0
  //---------team selection-------
  frameworkComponents:any;
  isFullWidthCell:any;
  fullWidthCellRenderer:any;

  col_index3=[]
  currentData3=[]
  gridApi3

  selectTeamOption=[]
  selectTeamOptionInner=[]
  
  //----Page Control & Error Boolean----
  error = "No error so far"
  loginb = !true
  scoutb = true
  managerb = true
  editPitError=true
  alerttype = "alert alert-success alert-dismissible fade show"

  matchspinnerb=false
  pitspinner=false

  thethreereply="Complete to unlock the rest"

  selectLoader = false
  selectLoaderA = false
  //--------User Info----
  name="Robin"
  role="M"
  match_scouted=3
  teamnumber = "5805"
  currentRegionMain ="Hopper Division"

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
  currentPitReceiver="5805"
  currentImage=null
  currentImageTitle="5805"

  currentMatchTeam = "none"
  currentRegion="none"
  currentMatchNumber=0
  currentMatch="none"
  //--------Team List----------

  select2 = []
  allselect2 = []

  currentSelect2 = []
  currentNotSelect2 = []

  //-------history--------
  date=[]
  datematch=[]
  currentHdate=""
  currentHmatch=""
  history=[]
  dateid=[]

  historyb=true
  historybs=[]
  historybscount=0
  
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
  constructor(private Auth: ScoutloginServiceService,
              private router: Router) { 
    this.frameworkComponents = { fullWidthCellRenderer: fullWidthCellRenderer };
    this.isFullWidthCell = function (rowNode) {
      return true;
    };
    
    this.getSelectedTeam(this.selectTeamOption,this.selectTeamOptionInner)
    this.fullWidthCellRenderer = "fullWidthCellRenderer";
                //this.loadrank()
                setInterval(()=>{
                  this.Auth.getPitForm(this.name, this.teamnumber).subscribe(data => {
                    if(this.lengthh==0){
                      this.loadrankA()
                      this.lengthh=1
                    }
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

                  //----------select team----------
                  var selCurrentSelected=[], selCurrentSelected2=[]
                  for(i=0;i<this.gridApi3.getSelectedRows().length;i++){
                    selCurrentSelected.push(this.gridApi3.getSelectedRows()[i].Team_Number)
                  }
                  for (i = 0; i < this.currentData3.length; i++) {
                    selCurrentSelected2.push(this.currentData3[i].Team_Number)
                  }

                  //console.log(this.gridApi3.gridCore.gridOptions.rowData)
                  //console.log(<HTMLTableElement>document.querySelector('#tableid'))
                  console.log(this.gridApi3)
                  if (this.arraysEqual(selCurrentSelected, selCurrentSelected2)){
                    //console.log(selCurrentSelected, selCurrentSelected2)
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

                  this.getHistory()
                  //console.log(this.historybs[0].a20190416)
                  this.matchspinnerb = false
                  this.pitspinner = false

                  //-------Data Total---------
                  this.select=[]
                  this.allselect=[]
                  this.currentSelect=[]
                  this.currentNotSelect = []
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
                  
                  if (!this.arraysEqual(this.select, this.currentSelect) && this.currentSelect.length != 0){
                    console.log(this.select, this.currentSelect, this.currentNotSelect)
                    this.selectTeam()
                    this.selectTeamA2()
                    this.selectLoader = true
                    this.selectLoaderA=true
                  }else{
                    this.selectLoader = false
                    this.selectLoaderA = false
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
                    this.selectLoaderA = true
                    this.selectLoader=true
                  } else {
                    this.selectLoaderA = false
                    this.selectLoader = false
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
                  
                },2000)
              }

  ngOnInit() {
    this.Auth.getRankPerference(this.name, this.teamnumber, this.role).subscribe(data=>{
      
      this.currentOption=data.m.split("/")
      for (var ele in this.currentOption)
      {
        this.rankperference[this.currentOption[ele]]=true
      }
      this.currentOptionA = data.m.split("/")
      for (var ele in this.currentOptionA) {
        this.rankperference[this.currentOptionA[ele]] = true
      }
      
    })
    
  }

  //----team selection--------
  getselectTeamElement(){
    const ev = (<HTMLInputElement>document.querySelector("#selectTeamElement")).value
    if (ev =='General Ability'){
      //console.log('jj')
      return
    } else if (ev == 'Teleop(total)'){
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
    } else if (ev == 'Teleop(average)') {
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
    } else if (ev == 'Autonomous(total)') {
      this.selectTeamOption = [
        "totalautopoint","exitplatform"
        ,"autohatch","autocargo"]
      this.selectTeamOptionInner = [
        "Total Auto Pnts", "Exit Plaform pnts"
        , "Hatch in Auto", "Cargo in Auto"]  
    } else if (ev == 'Autonomous(average)') {
      this.selectTeamOption = [
        "totalautopointA", "exitplatformA"
        , "autohatchA", "autocargoA"]
      this.selectTeamOptionInner = [
        "Total Auto Pnts", "Exit Plaform pnts"
        , "Hatch in Auto", "Cargo in Auto"]
    }
    this.getSelectedTeam(this.selectTeamOption, this.selectTeamOptionInner)
    console.log(this.gridApi3.getSelectedRows())
  }
  onGridReady3(params) {
    this.gridApi3 = params.api;
  }

  getSelectedTeam(option, optionInner){
    this.Auth.getSelectedTeam(this.teamnumber, this.currentRegionMain, option, optionInner).subscribe(data=>{
     
      this.col_index3=data.col_index
      this.currentData3=data.output
      console.log(this.currentData3)
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
    return this.Auth.selectTeam(this.currentRegionMain, this.teamnumber, this.currentSelect, this.currentNotSelect).subscribe(data=>{
      console.log(data)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOption, this.currentOptionInner).subscribe(data => {
        this.col_index = data.col_index
        this.currentData = data.output
        
        console.log(this.col_index, this.currentData)
      })
    })
  }
  
  selectTeamA() {
    this.selectLoaderA = true
    return this.Auth.selectTeam(this.currentRegionMain, this.teamnumber, this.currentSelectA, this.currentNotSelectA).subscribe(data => {
      console.log(data)
      this.Auth.loadrank(this.teamnumber, this.currentRegionMain, this.currentOptionA, this.currentOptionInnerA).subscribe(data => {
        this.col_indexA = data.col_index
        this.currentDataA = data.output

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
    console.log(this.currentRegionMain)
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

    for (var i = 0; i<optionsVar.length;i++){
      optionsVarlist.push(optionsVar[i].value)
    }

    for (var i = 0; i < selectedoptionsVar.length; i++) {
      selectedoptionsVarlist.push(selectedoptionsVar[i].value)
    }
    //console.log(selectedoptionsVarlist)
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
  showHistory(date){
    //console.log('a' + date.split('-').join(""))
    return this.historybs[0]['a'+date.split('-').join("")]
  }
  getHistory(){
    this.Auth.getHistory(this.name, this.teamnumber).subscribe(data=>{
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
 
    }
    
    })
  }
  openHistory(event){
    event.preventDefault()
    
    const inner = 'a' + event.target.innerText.split(' ')[0].split('-').join("")
    this.historybs[0][inner] = !this.historybs[0][inner]
    //console.log(this.historybs[0][inner])
  }
    //-----blue alliance
  getEventVP3(event){
    this.Auth.getAPI3("events/2019").subscribe(data=>{
      var selectedevent=[]
      for(var i=0;i<207;i++){
        if (event.target.value =="Houston"){
          if (data[i].city == "Houston" && data[i].event_type_string == "Championship Division"){
            selectedevent.push(data[i].name)
          }
        } else if (event.target.value == "Detroit"){
          if (data[i].city == "Detroit" && data[i].event_type_string == "Championship Division") {
            selectedevent.push(data[i].name)
          }
        }
        else if (data[i].week == event.target.value-1){
          selectedevent.push(data[i].name)
        }
      }
      this.editMatchEvent = selectedevent
      //console.log(selectedevent)
      //event.target.value
    })
  }

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
    this.thethreereply ="Complete to unlock the rest"
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
  }
  sendcurrentPit(event){
    event.preventDefault()
    this.currentPitReceiver=event.target.value
    //console.log(this.currentPitReceiver)
  }

  
  updatePit(event){
    event.preventDefault()
    const target = event.target
    this.Auth.updatePit(target.id,target.value,this.name,this.teamnumber,this.currentPit).subscribe(data=>{
      if(data.col_name=="teamnumber"){
        this.editPitError=false
      }
      this.currentPit=data.currentId
      //console.log(data.currentId)
    })
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
    this.Auth.updateMatch(target.id, target.value, this.name, this.teamnumber, this.currentMatch,this.currentRegion,this.currentMatchNumber,this.currentMatchTeam).subscribe(data => {
      console.log(data)
      
      this.currentMatch = data.currentId
      if (data.currentId == "Match Already Exist" || data.currentId == "Fill in all the part"){
        this.thethreereply = data.currentId
      }
      console.log(this.thethreereply)
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
