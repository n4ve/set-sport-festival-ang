import { Lastupdate } from './../../models/response/lastupdate';
import { Aroundworld } from './../../models/response/aroundworld';
import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CircleProgressComponent } from 'ng-circle-progress';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-around-the-world',
  templateUrl: './around-the-world.component.html',
  styleUrls: ['./around-the-world.component.css']
})
export class AroundTheWorldComponent implements OnInit, AfterContentInit {
  @ViewChild('progressRed') progressRed: CircleProgressComponent;
  @ViewChild('progressGreen') progressGreen: CircleProgressComponent;
  @ViewChild('progressBlue') progressBlue: CircleProgressComponent;
  @ViewChild('progressYellow') progressYellow: CircleProgressComponent;


  stepsRed: number;
  stepsGreen: number;
  stepsBlue: number;
  stepsYellow: number;

  stepsRedM1: number;
  stepsRedM2: number;
  stepsGreenM1: number;
  stepsGreenM2: number;
  stepsBlueM1: number;
  stepsBlueM2: number;
  stepsYellowM1: number;
  stepsYellowM2: number;


  percentRed: number;
  percentGreen: number;
  percentBlue: number;
  percentYellow: number;

  lastUpdated: string;

  team: String;
  sub;

  isShowSelectedTeam: boolean;

  LAST_UPDATE_API_URL = `${environment.baseUrl}/api/last-updated`;
  AROUND_WORLD_API_URL = `${environment.baseUrl}/api/around-the-world`;
  MONTH1_API_URL = `${environment.baseUrl}/api/month/1`;
  MONTH2_API_URL = `${environment.baseUrl}/api/month/2`;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.team = '';
    this.lastUpdated = '';
    this.isShowSelectedTeam = true;
  }

  ngOnInit() {

    this.httpClient.get<Lastupdate>(this.LAST_UPDATE_API_URL).subscribe(
      (response) => {
        this.lastUpdated = response.lastUpdated;
      },
      (err) => console.log(err)
    );

    let redParams = new HttpParams();
    redParams = redParams.append('team', 'RED');
    this.httpClient.get<Aroundworld>(this.AROUND_WORLD_API_URL, {params: redParams}).subscribe(
      (response) => {
        this.stepsRed = response.total;
        this.percentRed = (this.stepsRed / 58933823) * 100;
        this.onSelectTeam('RED');
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH1_API_URL, {params: redParams}).subscribe(
      (response) => {
        this.stepsRedM1 = response.total;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH2_API_URL, {params: redParams}).subscribe(
      (response) => {
        this.stepsRedM2 = response.total;
      },
      (err) => console.log(err)
    );

    let greenParams = new HttpParams();
    greenParams = greenParams.append('team', 'GREEN');
    this.httpClient.get<Aroundworld>(this.AROUND_WORLD_API_URL, {params: greenParams}).subscribe(
      (response) => {
        this.stepsGreen = response.total;
        this.percentGreen = (this.stepsGreen / 58933823) * 100;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH1_API_URL, {params: greenParams}).subscribe(
      (response) => {
        this.stepsGreenM1 = response.total;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH2_API_URL, {params: greenParams}).subscribe(
      (response) => {
        this.stepsGreenM2 = response.total;
      },
      (err) => console.log(err)
    );

    let blueParams = new HttpParams();
    blueParams = blueParams.append('team', 'BLUE');

    this.httpClient.get<Aroundworld>(this.AROUND_WORLD_API_URL, {params: blueParams}).subscribe(
      (response) => {
        this.stepsBlue = response.total;
        this.percentBlue = (this.stepsBlue / 58933823) * 100;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH1_API_URL, {params: blueParams}).subscribe(
      (response) => {
        this.stepsBlueM1 = response.total;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH2_API_URL, {params: blueParams}).subscribe(
      (response) => {
        this.stepsBlueM2 = response.total;
      },
      (err) => console.log(err)
    );

    let yellowParams = new HttpParams();
    yellowParams = yellowParams.append('team', 'YELLOW');

    this.httpClient.get<Aroundworld>(this.AROUND_WORLD_API_URL, {params: yellowParams}).subscribe(
      (response) => {
        this.stepsYellow = response.total;
        this.percentYellow = (this.stepsYellow / 58933823) * 100;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH1_API_URL, {params: yellowParams}).subscribe(
      (response) => {
        this.stepsYellowM1 = response.total;
      },
      (err) => console.log(err)
    );
    this.httpClient.get<Aroundworld>(this.MONTH2_API_URL, {params: yellowParams}).subscribe(
      (response) => {
        this.stepsYellowM2 = response.total;
      },
      (err) => console.log(err)
    );

  }

  ngAfterContentInit() {


    this.sub = this.route.queryParamMap.subscribe(params => {
      this.team = params.get('team');
      if (this.team == null || this.team === '' || this.team === undefined) {
        this.onSelectTeam('RED');
        this.isShowSelectedTeam = true;
      } else {
        this.onSelectTeam(this.team);
        this.isShowSelectedTeam = false;
      }
   });
  }

  onSelectTeam(team) {
    this.team = team;
    console.log(team);
    setTimeout( () => {
      if (team === 'RED') {
        this.progressRed.animate(0, this.percentRed);
      } else if (team === 'GREEN') {
        this.progressGreen.animate(0, this.percentGreen);
      } else if (team === 'BLUE') {
        this.progressBlue.animate(0, this.percentBlue);
      } else if (team === 'YELLOW') {
        this.progressYellow.animate(0, this.percentYellow);
      }
    }, 0);
  }

}
