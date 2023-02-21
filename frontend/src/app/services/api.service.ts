import { MatchScoutingL1 } from '../matchScoutingL1';
import { MatchScoutingL2 } from '../matchScoutingL2';
import { Scouters } from './../scouters';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Event } from '../event';
import { PitScouting } from '../pitScouting';
import { DriveBaseTypes } from '../drivebasetypes';
import { DriveMotorTypes } from '../drivemotortypes';
import { ManipulatorTypes } from '../manipulatortypes';
import { SuperClimbTypes } from '../superClimbTypes';
import { BuildTypes } from '../buildTypes';
import { CenterGravityTypes } from '../centerGravityTypes';
import { AllianceStation } from '../allianceStation';
 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public ScouterReplay: ReplaySubject<Scouters[]>;
  public MatchL1Replay: ReplaySubject<MatchScoutingL1[]>;
  public MatchL2Replay: ReplaySubject<MatchScoutingL2[]>;
  public EventReplay: ReplaySubject<Event[]>;
  public PitReplay: ReplaySubject<PitScouting[]>;
  public DriveBaseTypesReplay: ReplaySubject<DriveBaseTypes[]>;
  public DriveMotorTypesReplay: ReplaySubject<DriveMotorTypes[]>;
  public ManipulatorTypesReplay: ReplaySubject<ManipulatorTypes[]>;
  public SuperClimbTypesReplay: ReplaySubject<SuperClimbTypes[]>;
  public BuildTypesReplay: ReplaySubject<BuildTypes[]>;
  public CenterGravityTypesReplay: ReplaySubject<CenterGravityTypes[]>;
  public AllianceReplay: ReplaySubject<AllianceStation[]>;

  public StoredL1Replay: ReplaySubject<MatchScoutingL1[]>;
  public StoredL2Replay: ReplaySubject<MatchScoutingL2[]>;

  alliance: number = -1;


  private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://scouting.team195.com:5000';
  //private apiUrl = 'http://192.168.1.195:23450';  // Dave's House
  //private apiUrl = 'http://10.0.20.195:23450';     // Mark's House


  status: string = "";

  constructor(private http: HttpClient) {
    this.ScouterReplay = new ReplaySubject(1);
    this.MatchL1Replay = new ReplaySubject(1);
    this.MatchL2Replay = new ReplaySubject(1);
    this.EventReplay = new ReplaySubject(1);
    this.PitReplay = new ReplaySubject(1);
    this.DriveBaseTypesReplay = new ReplaySubject(1);
    this.DriveMotorTypesReplay = new ReplaySubject(1);
    this.ManipulatorTypesReplay = new ReplaySubject(1);
    this.SuperClimbTypesReplay = new ReplaySubject(1);
    this.BuildTypesReplay = new ReplaySubject(1);
    this.CenterGravityTypesReplay = new ReplaySubject(1);
    this.AllianceReplay = new ReplaySubject(1);

    this.StoredL1Replay = new ReplaySubject(1);
    this.StoredL2Replay = new ReplaySubject(1);


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

    this.http.get<DriveBaseTypes[]>(this.apiUrl + '/drivebasetypes').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.DriveBaseTypesReplay.next(response as DriveBaseTypes[]);
      // Might as well store it while we have it
      localStorage.setItem('DriveBaseTypes', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.DriveBaseTypesReplay.next(JSON.parse(localStorage.getItem('DriveBaseTypes')!) as DriveBaseTypes[]);
      } catch (err) {
        console.error('Could not load Drive Base Types data from server or cache!');
      }
    });

    this.http.get<AllianceStation[]>(this.apiUrl + '/alliance').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.AllianceReplay.next(response as AllianceStation[]);
      // Might as well store it while we have it
      localStorage.setItem('AllianceStation', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.AllianceReplay.next(JSON.parse(localStorage.getItem('AllianceStation')!) as AllianceStation[]);
      } catch (err) {
        console.error('Could not load Drive Base Types data from server or cache!');
      }
    });

    this.http.get<DriveMotorTypes[]>(this.apiUrl + '/drivemotortypes').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.DriveMotorTypesReplay.next(response as DriveMotorTypes[]);
      // Might as well store it while we have it
      localStorage.setItem('DriveMotorTypes', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.DriveMotorTypesReplay.next(JSON.parse(localStorage.getItem('DriveMotorTypes')!) as DriveMotorTypes[]);
      } catch (err) {
        console.error('Could not load Drive Motor Types data from server or cache!');
      }
    });

    this.http.get<ManipulatorTypes[]>(this.apiUrl + '/manipulatortypes').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.ManipulatorTypesReplay.next(response as ManipulatorTypes[]);
      // Might as well store it while we have it
      localStorage.setItem('ManipulatorTypes', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.ManipulatorTypesReplay.next(JSON.parse(localStorage.getItem('ManipulatorTypes')!) as ManipulatorTypes[]);
      } catch (err) {
        console.error('Could not load Manipulator Types data from server or cache!');
      }
    });

    this.http.get<SuperClimbTypes[]>(this.apiUrl + '/superclimbtypes').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.SuperClimbTypesReplay.next(response as SuperClimbTypes[]);
      // Might as well store it while we have it
      localStorage.setItem('SuperClimbTypes', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.SuperClimbTypesReplay.next(JSON.parse(localStorage.getItem('SuperClimbTypes')!) as SuperClimbTypes[]);
      } catch (err) {
        console.error('Could not load Super Climb Types data from server or cache!');
      }
    });

    this.http.get<BuildTypes[]>(this.apiUrl + '/buildtypes').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.BuildTypesReplay.next(response as BuildTypes[]);
      // Might as well store it while we have it
      localStorage.setItem('BuildTypes', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.BuildTypesReplay.next(JSON.parse(localStorage.getItem('BuildTypes')!) as BuildTypes[]);
      } catch (err) {
        console.error('Could not load Build Types data from server or cache!');
      }
    });

    this.http.get<CenterGravityTypes[]>(this.apiUrl + '/cgtypes').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CenterGravityTypesReplay.next(response as CenterGravityTypes[]);
      // Might as well store it while we have it
      localStorage.setItem('CenterGravityTypes', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CenterGravityTypesReplay.next(JSON.parse(localStorage.getItem('CenterGravityTypes')!) as CenterGravityTypes[]);
      } catch (err) {
        console.error('Could not load Center of Gravity Types data from server or cache!');
      }
    });

    this.http.get<Event[]>(this.apiUrl + '/event').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.EventReplay.next(response as Event[]);
      // Might as well store it while we have it
      localStorage.setItem('Event', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.EventReplay.next(JSON.parse(localStorage.getItem('Event')!) as Event[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });


    this.http.get<PitScouting[]>(this.apiUrl + '/pitscouting').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.PitReplay.next(response as PitScouting[]);
      // Might as well store it while we have it
      localStorage.setItem('Pit', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.PitReplay.next(JSON.parse(localStorage.getItem('Pit')!) as PitScouting[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

  }


  getLevel1Records() {
    this.alliance = Number(localStorage.getItem('alliance'));
    if(this.alliance > 0) {
        // First try to load a fresh copy of the data from the API
        this.http.get<MatchScoutingL1[]>(this.apiUrl + '/matchscouting/'+this.alliance).subscribe(response => {
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


  getLevel2Records() {
    this.alliance = Number(localStorage.getItem('alliance'));
    if(this.alliance > 0)  {

      this.http.get<MatchScoutingL2[]>(this.apiUrl + '/matchscoutingl2/'+this.alliance).subscribe(response => {
        // Store the response in the ReplaySubject, which components can use to access the data
        this.MatchL2Replay.next(response as MatchScoutingL2[]);
        // Might as well store it while we have it
        localStorage.setItem('MatchL2', JSON.stringify(response));
      }, () => {
        try {
          // Send the cached data
          this.MatchL2Replay.next(JSON.parse(localStorage.getItem('MatchL2')!) as MatchScoutingL2[]);
        } catch (err) {
          console.error('Could not load Matches data from server or cache!');
        }
      });
  }
  }



  updatePitStatus(pit: PitScouting[]){
    //localStorage.setItem('Pit', JSON.stringify(pit));

    console.log("made it to pit status update!!!");

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<PitScouting[]>(this.apiUrl + '/pit-status', JSON.stringify(pit), options).subscribe();

    console.log("Updating Pit Status Records");
  }


  savePitData(pit: PitScouting[]){
    localStorage.setItem('Pit', JSON.stringify(pit));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<PitScouting[]>(this.apiUrl + '/pit-update', JSON.stringify(pit), options).subscribe();

    console.log("Updating Pit Scouting Records");

  }



  saveLevel2Data(level2: MatchScoutingL2[]){
    //localStorage.setItem('Level2', JSON.stringify(level2));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<MatchScoutingL2[]>(this.apiUrl + '/level2-update', JSON.stringify(level2), options).subscribe();

    console.log("Updating Level 2 Scouting Records");

    let result = localStorage.getItem(('Level2'));

    console.log(result);

  }



  saveLevel1Data(level1: MatchScoutingL1[]){
    //localStorage.setItem('Level1', JSON.stringify(level1));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<MatchScoutingL1[]>(this.apiUrl + '/level1-update', JSON.stringify(level1), options).subscribe();

    console.log("Updating Level 1 Scouting Records");

    let result = localStorage.getItem(('Level1'));

    console.log(result);

  }



  syncLevel1Data(alliance: number) {

    // First try to load a fresh copy of the data from the API
    this.http.get<MatchScoutingL1[]>(this.apiUrl + '/matchscouting/'+alliance).subscribe(response => {
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
