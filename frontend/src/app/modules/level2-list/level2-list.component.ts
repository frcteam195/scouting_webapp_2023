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
  }

}
