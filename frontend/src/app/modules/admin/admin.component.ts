import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllianceStation } from 'src/app/allianceStation';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  apiAlliance: AllianceStation[] = [];
  alliance: number = -1;
  orientation: string;
  orientText: string;

  constructor (private apiService: ApiService, private formBuilder: FormBuilder) { 
      
    this.apiAlliance = [];

    this.apiService.AllianceReplay.subscribe(types => {
      this.apiAlliance = types;
    });

    this.orientation = localStorage.getItem('orientation') || 'L';
    this.orientText = this.getOrientText(this.orientation);
  }

  select(alliance: number) {
    this.alliance = alliance;
    localStorage.setItem('alliance', this.alliance.toString());

    console.log("alliance: [" + this.alliance + "]");

    // Get Level 1 records specific to alliance station
    this.apiService.getLevel1Records();

  }

  toggle() {
    if(this.orientation=="show"){
      this.orientation="hide";
    } else {
        this.orientation="show";
    }
  }

  clearLocalStorage(node: string) {

    //localStorage.setItem('alliance', this.alliance.toString());
    const response = confirm("Are you sure you want to clear " + node + " local storage?");
    

    if (response) {
        // add code if the user pressed the Ok button
        alert(node + " local storage was cleared.");
        console.log("Ok was pressed");
        localStorage.setItem(node, "");
    } else {
        // add code if the user pressed the Cancel button
        console.log("Cancel was pressed");
    } 

  }


  orientToggle(side: string) {
    
    if(side == 'L') {
        this.orientation = 'R';
        this.orientText = "Red on Right";
    } else {
      this.orientation = 'L';
      this.orientText = "Red on Left";
    }
    localStorage.setItem('orientation', this.orientation);
  }

  getOrientText(side: string) {
    
    if(side == 'L') {
        return "Red on Left";
    } else {
      return "Red on Right";
    }
  }

  ngOnInit(): void {
    // Get Alliance Station from Memory if it exists
    this.alliance = Number(localStorage.getItem('alliance')) || -1;
    this.orientation = localStorage.getItem('orientation') || 'L';
    this.orientText = this.getOrientText(this.orientation);
  }


  saveFile(value: string) {

    const response = confirm("Are you sure you want to download " + value + " data?");
    if (!response) {
      return;
    }

    let now = new Date();
    let date = formatDate(now, 'MMddhhmm', 'en-US');

    let filename = value + '.' + date + '.txt';
    let fileContent = localStorage.getItem(value) || '';
    const file = new Blob([fileContent], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = filename;
    link.click();
    link.remove();
  }

}
