import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';
import { Event } from '../../event'
import { AllianceStation } from 'src/app/allianceStation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allianceStationID = Number(localStorage.getItem('alliance')) || -1;

  apiEvent: Event[] = [];
  apiAlliance: AllianceStation[] = [];
  eventDate: string = "";

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 

    this.apiEvent = [];
    this.apiAlliance = [];

    this.apiService.AllianceReplay.subscribe(types => {
      this.apiAlliance = types;
    });

    this.apiService.EventReplay.subscribe(event => {
      this.apiEvent = event;
    
    
      for (const e of this.apiEvent) {

        var from_date = new Date(e.eventStartDate);
        var to_date = new Date(e.eventEndDate);

      
        // Logic to display date formats to console log for testing
        // Set a variable to put the date in Mon 1 - Mon 3, year (ex: "Jan 24 - Jan 25, 2023")
        // console.log("Start Date: [" + from_date + "]");
        // console.log("End Date: [" + from_date.toLocaleString('en-US', {month: 'short'}) + "]");
        // console.log("End Date: [" + ((from_date.getDate() > 9) ? from_date.getDate() : ('0' + from_date.getDate())) + "]");

        // console.log("To Date: [" + to_date + "]");
        // console.log("End Date: [" + to_date.toLocaleString('en-US', {month: 'short'}) + "]");
        // console.log("End Date: [" + ((to_date.getDate() > 9) ? to_date.getDate() : ('0' + to_date.getDate())) + "]");
        // console.log("EndDate: [" + to_date.getFullYear() + "]");
        this.eventDate = from_date.toLocaleString('en-US', {month: 'short'}) + " " + ((from_date.getDate() > 9) ? from_date.getDate() : ('0' + from_date.getDate())) + " - " + to_date.toLocaleString('en-US', {month: 'short'}) + " " + ((to_date.getDate() > 9) ? to_date.getDate() : ('0' + to_date.getDate())) + ", " + to_date.getFullYear();

        console.log("eventDate [" + this.eventDate + "]");
        //e.eventStartDate = from_date.toLocaleString('en-US', {month: 'short'});
       }  
    });
  }

  getClassColor(value: number) {

    if(value > 3) {
      return 'blue_all';
    } else {
      return 'red_all';
    }

  }

  ngOnInit(): void {
  }
}
