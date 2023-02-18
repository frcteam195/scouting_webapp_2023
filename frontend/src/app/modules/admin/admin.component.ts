import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllianceStation } from 'src/app/allianceStation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  apiAlliance: AllianceStation[] = [];
  alliance: number = -1;

  constructor (private apiService: ApiService, private formBuilder: FormBuilder) { 
      
    this.apiAlliance = [];

    this.apiService.AllianceReplay.subscribe(types => {
      this.apiAlliance = types;

    });

  }

  select(alliance: number) {
    // Sets Scouter to be passed to next record
    this.alliance = alliance;
    // Write Scouter Number to Browser Cache
    localStorage.setItem('alliance', this.alliance.toString());

    console.log("alliance: [" + this.alliance + "]");

  }

  ngOnInit(): void {
  }

}
