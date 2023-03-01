import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PitScouting } from '../../pitScouting';
import { Scouters } from '../../scouters';

@Component({
  selector: 'app-pit-list',
  templateUrl: './pit-list.component.html',
  styleUrls: ['./pit-list.component.scss']
})
export class PitListComponent implements OnInit {

  apiPit: PitScouting[] = []
  apiScouters: Scouters[] = [];
  team: string = '195';
  scouter: number = -1;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {

    //this.apiService.getPitRecords();

    this.apiPit = [];
    
    this.apiService.PitReplay.subscribe(team => {
      this.apiPit = team;
      // Sort by Team Number
      this.apiPit.sort((a, b) => Number(a.team) - Number(b.team));
    });


    this.apiService.ScouterReplay.subscribe(types => {
      this.apiScouters = types;
    });
  

   }

  ngOnInit(): void {

    this.scouter = Number(localStorage.getItem('scouter')) || -1;

  }

  select(scouter: number) {
    // Sets Scouter to be passed to next record
    this.scouter = scouter;
    // Write Scouter Number to Browser Cache
    localStorage.setItem('scouter', this.scouter.toString());

    console.log("Scouter: [" + this.scouter + "]");

  }


refreshData() {
  //console.log("Refreshing Pit List");
  this.apiService.getPitRecords();
}



pitPage(team: string, scouter: number, status: number) {

  if (status == 3) {
  // do nothing if status is 2 (complete)
  }
  else if (scouter < 1) {
    alert("Please select a Scouter Name");

  } else {
  
    //console.log("Calling Pit Scouting Page with: team and scouterID)
    //this.router.navigateByUrl('/pit/team/scouter);
    // Opens in New Tab
    //this.router.navigate([]).then(result => { window.open('/pit/'+team, '_blank'); }); 
    //this.router.navigate([]).then(result => { window.open('#/pit/'+team); });
    // Opens in Existing Tab
    this.router.navigate(["pit", team, scouter]); 
  }
}

}
