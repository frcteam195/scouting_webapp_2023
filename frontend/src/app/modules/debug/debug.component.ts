import { MatchScoutingL1 } from './../../matchScoutingL1';
import { PitScouting } from './../../pitScouting';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatchScoutingL2 } from 'src/app/matchScoutingL2';
import { ApiService } from 'src/app/services/api.service';


export interface MemoryTypes {
  memoryTypeID: string;
  memoryType: string
}

export interface MatchHeader {
  matchScoutingID: number;
  eventID: number;
  matchID: number;
  matchNum: number;
  allianceStationID: number;
  team: string;
  scoutingStatus: number;  
  preNoShow: number;
  scouterID: number;
}

export interface PitHeader {
  team: string;
  eventID: number;
  scoutingStatus: number;
  scouterID: number;
}



@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  apiLevel1: MatchScoutingL1[] = [];
  apiMatchL1: MatchScoutingL1[] = [];
  apiLevel2: MatchScoutingL2[] = [];
  apiMatchL2: MatchScoutingL2[] = [];
  apiFilter1: MatchHeader[] = [];

  apiPit: PitScouting[] = [];
  apiPitFilter: PitHeader[] = [];

  dumpMemory: string = '';
  memoryType: string = '';
  display: number = 1;

  matchSelect: number[] = [];


  memoryTypes: MemoryTypes[] = [{memoryTypeID:"MatchL1",memoryType:"Match Records-Level 1"},
                                {memoryTypeID:"StoredL1",memoryType:"Stored Records-Level 1"},
                                {memoryTypeID:"MatchL2",memoryType:"Match Records-Level 2"},
                                {memoryTypeID:"StoredL2",memoryType:"Stored Records-Level 2"},
                                {memoryTypeID:"Pit",memoryType:"Pit Records"}];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 

    this.apiLevel1 = [];
    this.apiMatchL1 = [];
    this.apiLevel2 = [];
    this.apiMatchL2 = [];
    this.apiFilter1 = [];
    this.apiPit = [];
    this.apiPitFilter = [];
    
    this.apiService.MatchL1Replay.subscribe(match => {
      this.apiMatchL1 = match;
    });

    this.apiService.StoredL1Replay.subscribe(match => {
      this.apiLevel1 = match;
    });

    this.apiService.MatchL2Replay.subscribe(match => {
      this.apiMatchL2 = match;
    });

    this.apiService.StoredL2Replay.subscribe(match => {
      this.apiLevel2 = match;
    });

    this.apiService.PitReplay.subscribe(team => {
      this.apiPit = team;
      // Sort by Team Number
      this.apiPit.sort((a, b) => Number(a.team) - Number(b.team));
    });
    

    this.regenerateFilter();

  }

  ngOnInit(): void {
    this.regenerateFilter();
  }

  select(type: string) {
    this.memoryType = type;
    this.dumpMemory = (localStorage.getItem(this.memoryType)) || "<empty>";

    // Resect matchSelect Array on drop down change
    this.matchSelect = [];

    this.regenerateFilter();
  }


  regenerateFilter() {
    console.log("regenerateFilter: Start: ");

    if (this.memoryType == "StoredL1" && this.apiLevel1) {

      this.apiFilter1 = [];
      this.apiPitFilter = [];
      this.display = 1;

      // Filter
      for (const m of this.apiLevel1) {
        this.apiFilter1.push({matchScoutingID:m.matchScoutingID,
                              eventID:m.eventID,
                              matchID:m.matchID,
                              matchNum:m.matchNum,
                              allianceStationID:m.allianceStationID,
                              team:m.team,
                              scoutingStatus:m.scoutingStatus,
                              preNoShow:m.preNoShow,
                              scouterID:m.scouterID});
      } 
    } else if (this.memoryType == "MatchL1" && this.apiMatchL1) {

      this.apiFilter1 = [];
      this.apiPitFilter = [];
      this.display = 1;

      // Filter
      for (const m of this.apiMatchL1) {
        this.apiFilter1.push({matchScoutingID:m.matchScoutingID,
                              eventID:m.eventID,
                              matchID:m.matchID,
                              matchNum:m.matchNum,
                              allianceStationID:m.allianceStationID,
                              team:m.team,
                              scoutingStatus:m.scoutingStatus,
                              preNoShow:m.preNoShow,
                              scouterID:m.scouterID});
      } 
    } else     if (this.memoryType == "StoredL2" && this.apiLevel2) {

      this.apiFilter1 = [];
      this.apiPitFilter = [];
      this.display = 1;

      // Filter
      for (const m of this.apiLevel2) {
        this.apiFilter1.push({matchScoutingID:m.matchScoutingL2ID,
                              eventID:m.eventID,
                              matchID:m.matchID,
                              matchNum:m.matchNum,
                              allianceStationID:m.allianceStationID,
                              team:m.team,
                              scoutingStatus:m.scoutingStatus,
                              preNoShow:m.preNoShow,
                              scouterID:m.scouterID});
      } 
    } else if (this.memoryType == "MatchL2" && this.apiMatchL2) {

      this.apiFilter1 = [];
      this.apiPitFilter = [];
      this.display = 1;

      // Filter
      for (const m of this.apiMatchL2) {
        this.apiFilter1.push({matchScoutingID:m.matchScoutingL2ID,
                              eventID:m.eventID,
                              matchID:m.matchID,
                              matchNum:m.matchNum,
                              allianceStationID:m.allianceStationID,
                              team:m.team,
                              scoutingStatus:m.scoutingStatus,
                              preNoShow:m.preNoShow,
                              scouterID:m.scouterID});
      }
    } else if (this.memoryType == "Pit" && this.apiPit) {

      this.apiFilter1 = [];
      this.apiPitFilter = [];
      this.display = 2;
      
      // Filter
      for (const t of this.apiPit) {
        this.apiPitFilter.push({team:t.team,
                              eventID:t.eventID,
                              scoutingStatus:t.scoutingStatus,
                              scouterID:t.scouterID});
      } 
    } else {
      this.apiFilter1 = [];
      this.apiPitFilter = [];
    }
  }

  updateCheckedOptions(matchID: number, value: number) {
    console.log("Match ID: ["+matchID+"], Value: [" +value+"], MemoryTYpe: "+this.memoryType);
    if (this.matchSelect.includes(matchID)) {
      const index = this.matchSelect.indexOf(matchID);
      this.matchSelect.splice(index, 1);
    } else {
      this.matchSelect.push(matchID);
    }

    console.log("matchSelect: ", this.matchSelect);
  }

  removeRecord() {

    let i = 0;
    let keepRecords = [];

    if((this.memoryType=='MatchL1')||(this.memoryType=='StoredL1')) {
      const matchRecords = JSON.parse(localStorage.getItem(this.memoryType)!) as MatchScoutingL1[];
      for (const r of matchRecords) {
        if(!this.matchSelect.includes(i)) {
          // console.log("Keep Record: ", i);
          keepRecords.push(r);
        }
        i = i+1;
      }
      localStorage.setItem(this.memoryType, JSON.stringify(keepRecords));
  
      if(this.memoryType == 'MatchL1') { this.apiMatchL1 = keepRecords; }
      else if(this.memoryType == 'StoredL1') { this.apiLevel1 = keepRecords; }

    } else if((this.memoryType=='MatchL2')||(this.memoryType=='StoredL2')) {
      const matchRecords = JSON.parse(localStorage.getItem(this.memoryType)!) as MatchScoutingL2[];
      for (const r of matchRecords) {
        if(!this.matchSelect.includes(i)) {
          // console.log("Keep Record: ", i);
          keepRecords.push(r);
        }
        i = i+1;
      }
      localStorage.setItem(this.memoryType, JSON.stringify(keepRecords));
  
      if(this.memoryType == 'MatchL2') { this.apiMatchL2 = keepRecords; }
      else if(this.memoryType == 'StoredL2') { this.apiLevel2 = keepRecords; }

    }
    this.regenerateFilter();
    
  }
  
  updateRecord() {

    let i = 0;
    let writeRecords = [];

    if(this.memoryType=='StoredL1') {
      const matchRecords = JSON.parse(localStorage.getItem(this.memoryType)!) as MatchScoutingL1[];
      for (const r of matchRecords) {
        if(this.matchSelect.includes(i)) {
          // console.log("Keep Record: ", i);
          writeRecords.push(r);
        }
        i = i+1;
      }

      // API CALL HERE
      this.apiService.saveLevel1Data(writeRecords);

    } else if(this.memoryType=='StoredL2') {
      const matchRecords = JSON.parse(localStorage.getItem(this.memoryType)!) as MatchScoutingL2[];
      for (const r of matchRecords) {
        if(this.matchSelect.includes(i)) {
          // console.log("Keep Record: ", i);
          writeRecords.push(r);
        }
        i = i+1;
      }


      // API CALL HERE
      this.apiService.saveLevel2Data(writeRecords);


    }

    this.regenerateFilter();

  }

}
