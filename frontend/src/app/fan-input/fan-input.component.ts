import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Matches } from '../matches';

@Component({
  selector: 'app-fan-input',
  templateUrl: './fan-input.component.html',
  styleUrls: ['./fan-input.component.scss']
})
export class FanInputComponent implements OnInit {

  apiMatchList: Matches[] = [];
  apiMatchList_filter: Matches[] = [];
  matchNum: number = 1;
  rankR1: number = 0;
  rankR2: number = 0;
  rankR3: number = 0;
  rankB1: number = 0;
  rankB2: number = 0;
  rankB3: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      // this.regenerateFilter();
    });

  }

  ngOnInit(): void {
  }



getClass(rank: number, value: number) {
  if (rank == value && rank == -1 ) {
    return 'button_red';
  } else if (rank == value && rank == 1 ) {
    return 'button_green';
  } 
  return 'button_gray';

}


  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNum=match;
    this.regenerateFilter();
  }

  regenerateFilter() {

    // console.log("Made it to Filter with [" + this.matchNum + "]");
    if (this.apiMatchList) {
      this.apiMatchList_filter = [];
      for (const m of this.apiMatchList) {
        console.log("Match: [" + m.matchNum + "], selected: [" + this.matchNum + "]");
        if (m.matchNum == this.matchNum) {
          this.apiMatchList_filter.push(m);
          break;
        }
      }
    } else {
      console.log("Match List Not Found");
      // this.apiMatchList_filter = [];
    }

  }

}
