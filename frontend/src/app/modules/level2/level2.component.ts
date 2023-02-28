import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatchScoutingL2 } from '../../matchScoutingL2';
import { Scouters } from '../../scouters';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss']
})
export class Level2Component implements OnInit {

  apiScouters: Scouters[] = [];
  apiMatchL2: MatchScoutingL2[] = [];
  apiMatchL2_filter: MatchScoutingL2[] = [];
  scouter: number = -1;
  display: number = 1;
  darkmode: number = 0;
  matchComp: number[] = [];

  apiStoreL2: MatchScoutingL2[] = [];


  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef) {

    this.apiMatchL2_filter = [];
    this.apiMatchL2 = [];

    this.apiService.StoredL2Replay.subscribe(match => {
      this.apiStoreL2 = match;
      this.getMatchComp();
    });
 
    
    this.apiService.MatchL2Replay.subscribe(match => {
      this.apiMatchL2 = match;
      this.regenerateFilter();
    });

    this.apiService.ScouterReplay.subscribe(types => {
      this.apiScouters = types;
    });

   }

  ngOnInit(): void {
    // Get Scouter Number from Browser Cache
    this.scouter = Number(localStorage.getItem('scouter')) || -1;
    this.darkmode = Number(localStorage.getItem('darkmode')) || 0;
  }
  setDarkMode(){
    if (this.darkmode == 1) {
        this.darkmode = 0;
    } else {
        this.darkmode = 1;
    }
    localStorage.setItem('darkmode', this.darkmode.toString());
  }

  getDarkMode(){
    if (this.darkmode){
        return "darkMode";
    } else {
        return "lightMode";
    }
  }

  select(scouter: number) {
    // Sets Scouter to be passed to next record
    this.scouter = scouter;

    // Write Scouter Number to Browser Cache
    localStorage.setItem('scouter', this.scouter.toString());    

  }

  changeDisplay(d_value: number, scouter: number, preNoShow: number) {
    this.display = this.display + d_value;  
    
    console.log("display; "+ this.display);
    if(this.display > 1 && scouter < 1) {
      alert("Please select a Scouter Name");
      this.display = 1;
    }
    if(this.display > 5) {
      this.display = 1;
    }
    if(preNoShow == 1) {
      this.display = 5;
    }
  }

save(matchScoutingL2ID: number) {

  // Update status in apiMatch record
  for (const x of this.apiMatchL2) {

    if (x.matchScoutingL2ID == matchScoutingL2ID ) { 
      // Set Status to 2
      x.scoutingStatus = 2;
    }
  } 



  if (!localStorage.getItem('StoredL2')) {
    console.log("No Level 2 Records in Local Storage");
    this.apiStoreL2 = [];
  } else {

    // Get responses from memory
    this.apiService.StoredL2Replay.next(JSON.parse(localStorage.getItem('StoredL2')!) as MatchScoutingL2[]);
    
    
    //######################################################
    // Start - Console Log Dump
    
    // Loop through to print localStorage
    this.apiService.StoredL2Replay.subscribe(match => {
      this.apiStoreL2 = match;
    });

    for (const q of this.apiStoreL2) {
      console.log("Match: " + q.matchNum + ", Team: " + q.team + ", Status: " + q.scoutingStatus);
    }
    // End - Console Log Dump
    //######################################################

  }

  for (const o of this.apiMatchL2_filter) {
    // Add the matchScoutingL2 value to the matchComp array (May not need)
        //this.matchComp.push(o.matchScoutingL2ID);
        //console.log("Completed Matches: [" + this.matchComp + "]");

    // Add the scouted match to the stored level2 array
    this.apiStoreL2.push(o);
  }

  // Write record to Local Storage
  this.apiService.StoredL2Replay.next(this.apiStoreL2 as MatchScoutingL2[]);
  localStorage.setItem('StoredL2', JSON.stringify(this.apiStoreL2));

  // Write record to output filter  (Will need to move this to the "refresh" function later)
  this.apiService.saveLevel2Data(this.apiStoreL2);

  // run regenerate filter
  this.regenerateFilter();

  // Set Display back to 1
  this.display = 1;

}

  getClass(value: number, b_type: number) {

    if(value == b_type) {
      return 'button_green';
    } else {
      return 'button_rank';
    }

  }
  getYesNoClass(value: number, actual: number){
    if(value == actual && value == 0) {
        return 'button_green';
      } else if (value == actual && value == 1) {
        return 'button_red';
      } else {
        return 'button_rank';
      }
  }
  getClass2(value: number, b_type: number) {

    if(value == b_type && value == 1) {
      return 'button_green';
    } else if (value == b_type && value == 0) {
      return 'button_red';
    } else {
      return 'button_rank';
    }

  }

  getClass3(value: number) {

    if(value > 3) {
      return 'blue_all';
    } else {
      return 'red_all';
    }

  }

  getMatchComp() {
    console.log("Getting list of Completed Matches");
    if (this.apiStoreL2) {

      this.matchComp = [];

      for (const s of this.apiStoreL2) {
        this.matchComp.push(s.matchScoutingL2ID);
      }
    } else {
      this.matchComp = [];
    }

    console.log("Completed Matches: [" + this.matchComp + "]");
  }



  regenerateFilter() {
    console.log("regenerateFilter: Start: ");

    if (this.apiMatchL2) {

      this.apiMatchL2_filter = [];

      // Sort Matches by MatchNum
      this.apiMatchL2.sort((a, b) => a.matchNum - b.matchNum);
      
      // Filter
      for (const m of this.apiMatchL2) {

        if (m.scoutingStatus === null ) { 

          // Verify Match is not in the Completed Matches List
          if(!this.matchComp.includes(m.matchScoutingL2ID)) {
            // Set scouter to existing scouter value
            m.scouterID = Number(localStorage.getItem('scouter')) || -1;
            this.apiMatchL2_filter.push(m);
            //Break out of for loop once the first unscouted record is found
            break;
          }
        }
       } 
    } else {
      this.apiMatchL2_filter = [];
    }
  }


}
