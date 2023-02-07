export class MatchScoutingL2 {
    allianceStationID: number;
    blue1: string;
    blue2: string;
    blue3: string;
    climb: number;
    commentOff: string;
    commentDef: String;
    defCommunity: number;
    defCenter: number;
    defLZ: number;
    effort: number;
    eventID: number;
    goodOffBot: number;
    goodDefBot: number;
    intakeEff: number;
    matchID: number;
    matchNum: number;
    matchScoutingL2ID: number;
    maneuverability: number;
    red1: string;
    red2: string;
    red3: string;
    scouterID: number;
    scoutingStatus: number;
    synced2MS: number;
    speed: number;
    sturdiness: number;
    scoringEff: number;
    team: string;
    teamMatchNum: number;

constructor(allianceStationID: number,
    blue1: string,
    blue2: string,
    blue3: string,
    climb: number,
    commentOff: string,
    commentDef: string,
    defCommunity: number,
    defCenter: number,
    defLZ: number,
    effort: number,
    eventID: number,
    goodOffBot: number,
    goodDefBot: number,
    intakeEff: number,
    matchID: number,
    matchNum: number,
    matchScoutingL2ID: number,
    maneuverability: number,
    red1: string,
    red2: string,
    red3: string,
    scouterID: number,
    scoutingStatus: number,
    synced2MS: number,
    speed: number,
    sturdiness: number,
    scoringEff: number,
    team: string,
    teamMatchNum: number,){
    this.allianceStationID=allianceStationID;
    this.blue1 = blue1
    this.blue2 = blue2
    this.blue3 = blue3
    this.climb = climb
    this.commentOff = commentOff
    this.commentDef = commentDef
    this.defCommunity = defCommunity
    this.defCenter = defCenter
    this.defLZ = defLZ
    this.effort = effort
    this.eventID = eventID
    this.goodOffBot = goodOffBot
    this.goodDefBot = goodDefBot
    this.intakeEff = intakeEff
    this.matchID = matchID
    this.matchNum = matchNum
    this.matchScoutingL2ID = matchScoutingL2ID
    this.maneuverability = maneuverability
    this.red1 = red1
    this.red2 = red2
    this.red3 = red3
    this.scouterID = scouterID
    this.scoutingStatus = scoutingStatus
    this.synced2MS = synced2MS
    this.speed = speed
    this.sturdiness = sturdiness
    this.scoringEff = scoringEff
    this.team = team
    this.teamMatchNum = teamMatchNum
}}