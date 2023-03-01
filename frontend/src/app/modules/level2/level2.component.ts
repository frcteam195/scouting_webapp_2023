import { Params } from '@angular/router';
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
  missing: number = 0;

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

  changeDisplay(d_value: number, matchID: number, preNoShow: number) {
    
    // Check for completed fields if moving to next page
    // Should be allowed to move back a page.
    if (this.checkRequired(this.display,matchID) > 0 && d_value > 0) {
      // if a check is failed do not advance display
      return;
    }

    if((preNoShow == 1) && (this.display == 1)) {
      const response = confirm("Selecting Team Did Not Show will bring you to the save page.");
      if (response) {
        this.display = 5;
      } else { 
        this.display = 1;
      }
      return;
    }

    if(this.display > 5) {
      this.display = 1;
      return
    }
        
    this.display = this.display + d_value;  
  }

  checkRequired(display: number, record: number) {
    this.missing = 0;
    for (const x of this.apiMatchL2) {
      if (x.matchScoutingL2ID == record) {
        // Checking values on Page 1
        if (display == 1) {
          if (x.preNoShow === null) {
            this.missing = 11;
            return 2;
          }
        }
        // Checking values on Page 2
        else if (display == 2) {
          if (x.speed === null) {
            this.missing = 21;
            return 2;
          }
          else if (x.maneuverability === null) {
            this.missing = 22;
            return 2;
          }
          else if (x.sturdiness === null) {
            this.missing = 23;
            return 2;
          }
          else if (x.climb === null) {
            this.missing = 24;
            return 2;
          }
          else if (x.effort === null) {
            this.missing = 25;
            return 2;
          }
          else if (x.scoringEff === null) {
            this.missing = 26;
            return 2;
          }
          else if (x.intakeEff === null) {
            this.missing = 27;
            return 2;
          }
          
        }
        // Checking values on Page 3
        else if (display == 3) {
          if (x.goodOffBot === null) {
            this.missing = 31;
            return 2;
          }
          
        }
        // Checking values on Page 4
        else if (display == 4) {
          if (x.goodDefBot === null) {
            this.missing = 41;
            return 2;
          }
          else if (x.defCommunity === null) {
            this.missing = 42;
            return 2;
          }
          else if (x.defCenter === null) {
            this.missing = 43;
            return 2;
          }
          else if (x.defLZ === null) {
            this.missing = 44;
            return 2;
          }
          
        }
      }

    }
    return 0;
  }

getAlertClass(element: number) {
  if (element == this.missing) {
    return 'td_alert';
  } else {
    return 'td_normal';
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
