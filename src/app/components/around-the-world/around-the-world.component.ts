import { Lastupdate } from './../../models/response/lastupdate';
import { Aroundworld } from './../../models/response/aroundworld';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CircleProgressComponent } from 'ng-circle-progress';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-around-the-world',
  templateUrl: './around-the-world.component.html',
  styleUrls: ['./around-the-world.component.css']
})
export class AroundTheWorldComponent implements OnInit, AfterViewInit {
  @ViewChild('progress') progress: CircleProgressComponent;

  steps: number;
  percent: number;
  graphColor: string;

  lastUpdated: string;

  team: string;
  private sub: any;

  isShowSelectedTeam: boolean;

  LAST_UPDATE_API_URL = `${environment.baseUrl}/api/last-updated`;
  AROUND_WORLD_API_URL = `${environment.baseUrl}/api/around-the-world`;


  setSteps(steps: number) {
    if (steps == null) {
      this.steps = 0;
      this.percent = 0;
      this.progress.animate(0, this.percent);
      return;
    }
    this.steps = steps;
    this.percent = (steps / 58933823) * 100;
    this.progress.animate(0, this.percent);
  }

  setGraphColor(team: string) {
    if (team === 'RED') {
      this.graphColor = '#fd2913';
    } else if (team === 'BLUE') {
      this.graphColor = '#4882c2';
    } else if (team === 'YELLOW') {
      this.graphColor = '#ffbc00';
    } else if (team === 'GREEN') {
      this.graphColor = '#009529';
    }
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.team = '';
    this.clearStep();
    this.lastUpdated = '';
    this.isShowSelectedTeam = true;
    this.sub = this.route.queryParamMap.subscribe(params => {
      this.team = params.get('team');
      if (this.team != null) {
        this.setGraphColor(this.team);
        this.isShowSelectedTeam = false;
      } else {
        this.setGraphColor('RED');
        this.isShowSelectedTeam = true;
      }
   });
  }

  ngOnInit() {
    this.onSelectTeam('RED');
    this.httpClient.get<Lastupdate>(this.LAST_UPDATE_API_URL).subscribe(
      (response) => {
        this.lastUpdated = response.lastUpdated;
      },
      (err) => console.log(err)
    );
  }

  ngAfterViewInit() {
    this.progress.animate(0, this.percent);
  }

  onSelectTeam(team) {
    this.clearStep();
    this.setGraphColor(team);
    let params = new HttpParams();
    params = params.append('team', team);
    this.httpClient.get<Aroundworld>(this.AROUND_WORLD_API_URL, {params: params}).subscribe(
      (response) => {
        this.setSteps(response.total);
      },
      (err) => console.log(err)
    );
  }

  clearStep() {
    this.steps = 0;
    this.percent = 0;
  }

}
