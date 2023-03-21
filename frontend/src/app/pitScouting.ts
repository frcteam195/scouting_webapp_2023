export class PitScouting {
    buildComments: string;
    buildQuality: number;
    buildTypeID: number;
    centerGravityTypeID: number;
    dedicatedGroundIntake: number;
    driveBaseTypeID: number;
    driveMotorTypeID: number;
    electricalComments: string;
    electricalQuality: number;
    eventID: number;
    generalComments: string;
    imageLink: string;
    manipulatorTypeID: number;
    robotDurability: number;
    robotHeight: number;
    robotLength: number;
    robotWidth: number;
    robotWeight: number;
    scouterID: number;
    scoutingStatus: number;
    superClimbTypeID: number;
    team: string;
    teamName: string;

constructor(
    buildComments: string,
    buildQuality: number,
    buildTypeID: number,
    centerGravityTypeID: number,
    dedicatedGroundIntake: number,
    driveBaseTypeID: number,
    driveMotorTypeID: number,
    electricalComments: string,
    electricalQuality: number,
    eventID: number,
    generalComments: string,
    imageLink: string,
    manipulatorTypeID: number,
    robotDurability: number,
    robotLength: number,
    robotHeight: number,
    robotWidth: number,
    robotWeight: number, 
    scouterID: number,
    scoutingStatus: number,
    superClimbTypeID: number,
    team: string,
    teamName: string){
    this.buildComments = buildComments
    this.buildQuality = buildQuality
    this.buildTypeID = buildTypeID
    this.centerGravityTypeID = centerGravityTypeID
    this.dedicatedGroundIntake = dedicatedGroundIntake
    this.driveBaseTypeID = driveBaseTypeID
    this.driveMotorTypeID = driveMotorTypeID
    this.electricalComments = electricalComments
    this.electricalQuality = electricalQuality
    this.eventID = eventID
    this.generalComments = generalComments
    this.imageLink = imageLink
    this.manipulatorTypeID = manipulatorTypeID
    this.robotDurability = robotDurability
    this.robotHeight = robotHeight
    this.robotLength = robotLength
    this.robotWidth = robotWidth
    this.robotWeight = robotWeight 
    this.scouterID = scouterID
    this.scoutingStatus = scoutingStatus
    this.superClimbTypeID = superClimbTypeID
    this.team = team
    this.teamName = teamName
    }

}