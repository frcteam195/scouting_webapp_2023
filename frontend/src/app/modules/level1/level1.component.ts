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

}
