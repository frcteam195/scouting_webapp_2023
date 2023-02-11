import { Component, OnInit } from '@angular/core';
import { Scouters } from '../../scouters';
import { MatchScoutingL1 } from '../../matchScoutingL1';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';



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
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("nodeTable");//find table
    var counter = 1; //variable to count and assign numbers to cells
    /* for(var i = 0; i < 3; i++){ //loop to make rows
        var row = table!.insertRow(i); //insert row into table
        for(var t = 0; t < 9; t++){ //loop to make cells
            var cell = row.insertCell(t); // insert cell into row
            var newNode = document.createElement("button"); //make a button
            newNode.id = "node" + counter; //assign it a name and a id
            newNode.name = "node"; //use the name to format all button in the css code
            if ((t==1 || t==4 || t==7) && i < 2) { //assign buttons a type depending on if they are in the community co op zone
                newNode.classList.add("cube");
            } else if(i < 2) {
                newNode.classList.add("cone");
            } 
            else {
                newNode.classList.add("other");
            }
            //newNode.innerHTML = counter; //set the button text to its number
            //newNode.addEventListener('click', this.assignNodeArray(counter)); //add the function that will happen when the button is clicked, idk what to name it so i called it harish
            cell.appendChild(newNode); //put the button in the cell that we made
            counter++; //increment the number by 1
        }
    } */
    for (var i=0;i < this.nodePositions.length; i++){ //assign vallues to node value array
        this.nodePositions[i] = 0;
    }
    for (i=0;i<this.autoPickup.length;i++){
        this.autoPickup[i]=0;
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

      this.apiMatchL1_filter = [];

      // Sort Matches by MatchNum
      this.apiMatchL1.sort((a, b) => a.matchNum - b.matchNum);
      
      // Filter
      for (const m of this.apiMatchL1) {

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

  getYesNoClass(value: number, actual: number){
    if(value == actual && value == 1) {
        return 'button_green';
      } else if (value == actual && value == 0) {
        return 'button_red';
      } else {
        return 'button_rank';
      }
  }


  stage: number=0; //variable to keep track of what is currently being displayed
  numberBox: number=6; //static value for total number of boxes - 1
  nodePositions:number[] = new Array(4); //array of positions of selected nodes
  nodesSelected: number=0; 
  autoPickup:number[] = new Array(4); //array of which pickup locations selected

  /* incDown(incNumb: string){
    var text=document.getElementById("inc" + incNumb);
    if (Number(text!.innerHTML) > 0){
      text!.innerHTML = toString(Number(text!.innerHTML) - 1);
    }
  } 
  incUp(incNumb: string){
    var text=document.getElementById("inc" + incNumb);
    text!.innerHTML = toString(Number(text!.innerHTML) + 1);
  } */ 


 /*  function pickupSelection(pickupLocation){
      button = document.getElementById("pickup" + pickupLocation);
      if (autoPickup[pickupLocation - 1]==0){
          autoPickup[pickupLocation - 1]=1;
          button.style.backgroundColor="green";
      } else {
          autoPickup[pickupLocation - 1]=0;
          button.style.backgroundColor="gray";
      }
      console.log(autoPickup);
  } */

  assignNodeArray(nodeNumber: number){
  console.log(nodeNumber);
  var button = document.getElementById("node" + (nodeNumber))
  if (this.nodesSelected <= 3){
      if (button!.style.backgroundColor=="green"){//if already selected
          if (button!.classList.contains("cone")){
              button!.style.backgroundColor = "yellow"; //sets it back to cyan if its in the middle
          } else if (button!.classList.contains("cube")){
              button!.style.backgroundColor = "purple";
          } else {
              button!.style.backgroundColor = "gray";//sets it to gray otherwise
          }
          for (var i=0;i<this.nodePositions.length;i++){
              if (this.nodePositions[i]==nodeNumber){
                  this.nodePositions[i]=0;
              }
          }
          this.nodesSelected--;
      } else {
          button!.style.backgroundColor="green";
          for (i=0;i<this.nodePositions.length;i++){
              if (this.nodePositions[i]==0){
                  this.nodePositions[i]=nodeNumber;
                  { break; }
              }
          }
          this.nodesSelected++;
      }
  
  }else {
      if (button!.style.backgroundColor=="green"){//if already selected
          if (button!.classList.contains("cone")){
              button!.style.backgroundColor = "yellow"; //sets it back to cyan if its in the middle
          } else if (button!.classList.contains("cube")){
              button!.style.backgroundColor = "purple";
          } else {
              button!.style.backgroundColor = "gray";//sets it to gray otherwise
          }
          for (i=0;i<this.nodePositions.length;i++){
              if (this.nodePositions[i]==nodeNumber){
                  this.nodePositions[i]=0;
              }
          }
          this.nodesSelected--;
      } else {
          alert("Error, please select less than 5 nodes at a time")
      }
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

}
