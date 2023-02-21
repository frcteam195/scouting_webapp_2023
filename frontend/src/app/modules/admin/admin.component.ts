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
  orientation: string = "show";

  constructor (private apiService: ApiService, private formBuilder: FormBuilder) { 
      
    this.apiAlliance = [];

    this.apiService.AllianceReplay.subscribe(types => {
      this.apiAlliance = types;

    
    });

  }

  select(alliance: number) {
    this.alliance = alliance;
    localStorage.setItem('alliance', this.alliance.toString());

    console.log("alliance: [" + this.alliance + "]");

    // Get Level 1 records specific to alliance station
    this.apiService.getLevel1Records();

  }

  show(num: string){
    if (num=="normal"){
        if(this.orientation=="show"){
            return "show";
        } else if (this.orientation=="hide") {
            return "hide";
        }
    }
    if (num=="inverted"){
        if(this.orientation=="show"){
            return "hide";
        } else if (this.orientation=="hide") {
            return "show";
        }
    }
    return "show";
  }

  toggle() {
    if(this.orientation=="show"){
      this.orientation="hide";
  } else {
      this.orientation="show";
  }
}
  ngOnInit(): void {
    // Get Alliance Station from Memory if it exists
    this.alliance = Number(localStorage.getItem('alliance')) || -1;
  }

}
