import { MatchScoutingL1 } from './../matchScoutingL1';
import { Scouters } from './../scouters';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public ScouterReplay: ReplaySubject<Scouters[]>;
  public MatchL1Replay: ReplaySubject<MatchScoutingL1[]>;


  private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://scouting.team195.com:5000';
  //private apiUrl = 'http://192.168.1.195:23450';  // Dave's House
  //private apiUrl = 'http://10.0.20.195:23450';     // Mark's House


  status: string = "";

  constructor(private http: HttpClient) {
    this.ScouterReplay = new ReplaySubject(1);
    this.MatchL1Replay = new ReplaySubject(1);


    // Automatically load the data once when the application starts
    this.loadData();
  }

  // This loads the data on service initialization, and then makes the data
  //  available as a ReplaySubject.
  loadData(): void {

    // First try to load a fresh copy of the data from the API
    this.http.get<Scouters[]>(this.apiUrl + '/scouters').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.ScouterReplay.next(response as Scouters[]);
      // Might as well store it while we have it
      localStorage.setItem('Scouters', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.ScouterReplay.next(JSON.parse(localStorage.getItem('Scouters')!) as Scouters[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<MatchScoutingL1[]>(this.apiUrl + '/matchscouting').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.MatchL1Replay.next(response as MatchScoutingL1[]);
      // Might as well store it while we have it
      localStorage.setItem('MatchL1', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.MatchL1Replay.next(JSON.parse(localStorage.getItem('MatchL1')!) as MatchScoutingL1[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });





  }








}
