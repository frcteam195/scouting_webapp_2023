export class Events {
BAeventID: string;
eventID: number;
eventName: string;
currentEvent: number;
eventStartDate: number;
timeZone: string;
eventEndDate: number;
eventLocation: string; 

constructor(
    BAeventID: string,
    eventID: number,
    eventName: string,
    currentEvent: number,
    eventStartDate: number,
    timeZone: string,
    eventEndDate: number,
    eventLocation: string, ){
    this.eventID=eventID;
    this.eventName=eventName;
    this.currentEvent=currentEvent;
    this.eventStartDate=eventStartDate;
    this.timeZone=timeZone;
    this.eventEndDate=eventEndDate;
    this.eventLocation=eventLocation;
    this.BAeventID = BAeventID;
}}
