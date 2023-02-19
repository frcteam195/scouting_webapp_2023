import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AllianceStation } from 'src/app/allianceStation';
import { ApiService } from 'src/app/services/api.service';
import { Scouters } from '../../scouters';

@Component({
  selector: 'app-level2-list',
  templateUrl: './level2-list.component.html',
  styleUrls: ['./level2-list.component.scss']
})
export class Level2ListComponent implements OnInit {

  
  apiScouters: Scouters[] = [];
  apiAlliance: AllianceStation[] = [];
  scouter: number = -1;
  alliance: number = -1;
  darkmode: number = 0;



  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { 


    this.apiService.ScouterReplay.subscribe(types => {
      this.apiScouters = types;
    });

    this.apiService.AllianceReplay.subscribe(types => {
      this.apiAlliance = types;
    });
  }

  select(scouter: number) {
    // Sets Scouter to be passed to next record
    this.scouter = scouter;
    // Write Scouter Number to Browser Cache
    localStorage.setItem('scouter', this.scouter.toString());

    console.log("Scouter: [" + this.scouter + "]");

  }
  select1(alliance: number) {
    // Sets Scouter to be passed to next record
    this.alliance = alliance;
    // Write Scouter Number to Browser Cache
    localStorage.setItem('alliance', this.alliance.toString());

    console.log("Scouter: [" + this.scouter + "]");

  }


  ngOnInit(): void {
    // Get Scouter Number from Browser Cache
    this.scouter = Number(localStorage.getItem('scouter')) || -1;
    this.alliance = Number(localStorage.getItem('alliance')) || -1;
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


level2Page( alliance: number, scouter: number) {

  if (scouter < 1) {
    alert("Please select a Scouter Name");
  }

  else if (alliance < 1) {
    alert("Please select an alliance")
  

  } else {
  
    //console.log("Calling Pit Scouting Page with: team and scouterID)
    //this.router.navigateByUrl('/pit/team/scouter);
    // Opens in New Tab
    //this.router.navigate([]).then(result => { window.open('/pit/'+team, '_blank'); }); 
    //this.router.navigate([]).then(result => { window.open('#/pit/'+team); });
    // Opens in Existing Tab
    this.router.navigate(["level2", alliance, scouter]); 
  }
}

}
