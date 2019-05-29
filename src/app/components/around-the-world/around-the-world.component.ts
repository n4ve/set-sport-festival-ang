import { Aroundworld } from './../../models/response/aroundworld';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CircleProgressComponent } from 'ng-circle-progress';

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

  API_URL = 'http://localhost:5000/api/around-the-world';


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

  constructor(private httpClient: HttpClient) {
    this.steps = 0;
    this.percent = 0;
    this.setGraphColor('RED');
  }

  ngOnInit() {
    this.onSelectTeam('RED');
  }

  ngAfterViewInit() {
    this.progress.animate(0, this.percent);
  }

  onSelectTeam(team) {
    this.setGraphColor(team);
    let params = new HttpParams();
    params = params.append('team', team);
    this.httpClient.get<Aroundworld>(this.API_URL, {params: params}).subscribe(
      (response) => {
        this.setSteps(response.total);
      },
      (err) => console.log(err)
    );
  }

}
