import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';
import { Event } from '../../event'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  apiEvent: Event[] = [];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 

    this.apiEvent = [];

    this.apiService.EventReplay.subscribe(event => {
      this.apiEvent = event;

      for (const e of this.apiEvent) {

        var from_date = new Date(e.eventStartDate);
        var to_date = new Date(e.eventEndDate);

      

          console.log("Start Date: [" + from_date + "]");
          console.log("End Date: [" + from_date.toLocaleString('en-US', {month: 'short'}) + "]");
          console.log("End Date: [" + ((from_date.getDate() > 9) ? from_date.getDate() : ('0' + from_date.getDate())) + "]");

          console.log("To Date: [" + to_date + "]");
          console.log("End Date: [" + to_date.toLocaleString('en-US', {month: 'short'}) + "]");
          console.log("End Date: [" + ((to_date.getDate() > 9) ? to_date.getDate() : ('0' + to_date.getDate())) + "]");
          console.log("End Date: [" + to_date.getFullYear() + "]");

       }


        

    });

  }

  ngOnInit(): void {
  }

}
