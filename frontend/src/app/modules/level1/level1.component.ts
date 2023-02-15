import { Component, OnInit } from '@angular/core';
import { Scouters } from '../../scouters';
import { MatchScoutingL1 } from '../../matchScoutingL1';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';



@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.scss']
})
export class Level1Component implements OnInit {



  apiScouters: Scouters[] = [];
  apiMatchL1: MatchScoutingL1[] = [];
  apiMatchL1_filter: MatchScoutingL1[] = [];
  scouter: number = 0;
  orientation: string="show";
  darkmode: boolean=false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {

    this.apiMatchL1_filter = [];
    this.apiMatchL1 = [];
    
    this.apiService.MatchL1Replay.subscribe(match => {
      this.apiMatchL1 = match;
      this.regenerateFilter();
    });

    this.apiService.ScouterReplay.subscribe(types => {
      this.apiScouters = types;
    });


  }

  

  ngOnInit(): void { 
  }

  setDarkMode(){
    if (this.darkmode) {
        this.darkmode = false;
    } else {
        this.darkmode = true;
    }
  }

  getDarkMode(){
    if (this.darkmode){
        return "darkMode";
    } else {
        return "lightMode";
    }
  }

  ngOnChanges() {
    this.regenerateFilter();
  }

  select(scouterID: number) {
      this.scouter = scouterID;
  }

  regenerateFilter() {
    console.log("regenerateFilter: Start: ");

    if (this.apiMatchL1) {
        console.log("hello");
      this.apiMatchL1_filter = [];
      console.log("hello2");
      // Sort Matches by MatchNum
      this.apiMatchL1.sort((a, b) => a.matchNum - b.matchNum);
      console.log("hello3");
      // Filter
      for (const m of this.apiMatchL1) {
        console.log("hi");
        if (m.scoutingStatus === null ) { 
          //Break out of for loop once the first unscouted record is found
          this.apiMatchL1_filter.push(m);
          break;
        }
       } 
    } else {
      this.apiMatchL1_filter = [];
    }
  }

  getLetterColor(team: string){
    for (let m of this.apiMatchL1_filter){
        if (team==m.red1 || team==m.red2 || team==m.red3){
            return "redLetter";
        } else if (team==m.blue1 || team==m.blue2 || team==m.blue3){
            return "blueLetter";
        }
    }
    return "broken";
  }

  getColor(team: string){
    for (let m of this.apiMatchL1_filter){
        if (team==m.red1 || team==m.red2 || team==m.red3){
            return "red";
        } else if (team==m.blue1 || team==m.blue2 || team==m.blue3){
            return "blue";
        }
    }
    return "broken";
  }

  showPre(type: string){
    for (let m of this.apiMatchL1_filter){
        if (this.getColor(m.team)=="red" && type=="RNorm" && this.orientation=="show"){
            return "show";
        } else if (this.getColor(m.team)=="red" && type=="RInv" && this.orientation=="hide"){
            return "show";
        } else if (this.getColor(m.team)=="blue" && type=="BNorm" && this.orientation=="show"){
            return "show";
        } else if (this.getColor(m.team)=="blue" && type=="BInv" && this.orientation=="hide"){
            return "show";
        } else {
            return "hide";
        }
    }
    return "hide";
  }

  getYesNoClass(value: number, actual: number){
    if(value == actual && value == 1) {
        return 'button_green';
      } else if (value == actual && value == 0) {
        return 'button_red';
      } else {
        return 'button_rank';
      }
  }

  getRankClass(value: number, acutal: number){
    if(value == acutal) {
        return 'button_green';
      } else {
        return 'button_rank';
      }
  }

  numPad(numb: string){
    for(let m of this.apiMatchL1_filter){
        if(m.rampStartTime==null){
            m.rampStartTime=Number(numb);
        } else {
            m.rampStartTime = Number(m.rampStartTime.toString() + numb);
        }
        this.updateNumPad();
    }
  }

  remNumPad(){
    for(let m of this.apiMatchL1_filter){
        if(m.rampStartTime){
            m.rampStartTime = Number(m.rampStartTime.toString().substring(0, m.rampStartTime.toString().length - 1));
        } 
        this.updateNumPad();
    }
  }

  show(num: string){
    if (num=="normal"){
        if(this.orientation=="show"){
            return "show";
        } else if (this.orientation=="hide") {
            return "hide";
        }
    }
    if (num=="inverted"){
        if(this.orientation=="show"){
            return "hide";
        } else if (this.orientation=="hide") {
            return "show";
        }
    }
    return "show";
  }

  showHide(){
    if(this.orientation=="show"){
        this.orientation="hide";
    } else {
        this.orientation="show";
    }
  }

  updateNumPad(){
    for(let m of this.apiMatchL1_filter){
        const box: HTMLElement = document.getElementById("numPadBox") as HTMLElement;
        box!.innerHTML = m.rampStartTime.toString();
    }
  }

  nextBox(){ //increment stage by one till a max and update boxes
    this.stage++;
    if (this.stage > this.numberBox){
        this.stage = this.numberBox;
    }
    console.log(this.stage);
    this.updateBox();
}

lastBox(){ //de increment stage by one till 0 and updates boxes
    this.stage--;
    if (this.stage < 0){
        this.stage = 0;
    }
    this.updateBox();
}

returnBox(){
    this.stage = 0;
    this.updateBox();
} 

updateBox(){
  var homeBox = document.getElementById("home"); //get each box object
  var preBox = document.getElementById("pre");
  var autoBox = document.getElementById("auto");
  var teleBox = document.getElementById("tele");
  var endBox = document.getElementById("end");
  var postBox = document.getElementById("post");
  var finalBox = document.getElementById("final");
  var header = document.getElementById("header");
  var headerText = document.getElementById("headerText");
  homeBox!.style.display = "none"; //set each box invisible
  preBox!.style.display = "none";
  autoBox!.style.display = "none";
  teleBox!.style.display = "none"; 
  endBox!.style.display = "none";
  postBox!.style.display = "none";
  finalBox!.style.display = "none";
  if (this.stage == 0){ //make one box visible
      homeBox!.style.display = "block";
      header!.style.display = "none"; //hide header
  } else if(this.stage == 1){
      preBox!.style.display = "block";
      header!.style.display = "block"; //show header
      headerText!.innerHTML = "Pre Game"; //set header text
  } else if(this.stage == 2){
      autoBox!.style.display = "block";
      headerText!.innerHTML = "Auto";
  } else if(this.stage == 3){
      teleBox!.style.display = "block";
      headerText!.innerHTML = "Tele";
  } else if(this.stage == 4){
      endBox!.style.display = "block";
      headerText!.innerHTML = "End Game";
  } else if(this.stage == 5){
      postBox!.style.display = "block";
      headerText!.innerHTML = "Post Game";
  } else if(this.stage == 6){
      finalBox!.style.display = "block";
      header!.style.display = "none"; //hide header
  }
}

  stage: number=0; //variable to keep track of what is currently being displayed
  numberBox: number=6; //static value for total number of boxes - 1
  nodePositions:number[] = new Array(4); //array of positions of selected nodes
  nodesSelected: number=0; 

  pickupSelection(loc: number){
    for (let m of this.apiMatchL1_filter){
        if (loc==1){
            if(m.autoGamePiece1==1){
                m.autoGamePiece1=0;
            } else {
                m.autoGamePiece1=1;
            }
        }
        if (loc==2){
            if(m.autoGamePiece2==1){
                m.autoGamePiece2=0;
            } else {
                m.autoGamePiece2=1;
            }
        }
        if (loc==3){
            if(m.autoGamePiece3==1){
                m.autoGamePiece3=0;
            } else {
                m.autoGamePiece3=1;
            }
        }
        if (loc==4){
            if(m.autoGamePiece4==1){
                m.autoGamePiece4=0;
            } else {
                m.autoGamePiece4=1;
            }
        }
    }
  }
  pickupClass(loc: number){
    for (let m of this.apiMatchL1_filter){
        if (loc==1){
            if(m.autoGamePiece1==0){
                return "pickup";
            } else {
                return "pickedup";
            }
        }
        else if (loc==2){
            if(m.autoGamePiece2==0){
                return "pickup";
            } else {
                return "pickedup";
            }
        }
        else if (loc==3){
            if(m.autoGamePiece3==0){
                return "pickup";
            } else {
                return "pickedup";
            }
        }
        else if (loc==4){
            if(m.autoGamePiece4==0){
                return "pickup";
            } else {
                return "pickedup";
            }
        }
    }
    return "blue";
  }
}
