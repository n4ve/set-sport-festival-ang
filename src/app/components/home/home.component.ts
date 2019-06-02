import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  team: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {
    this.team = '';
    this.sub = this.route.queryParamMap.subscribe(params => {
      this.team = params.get('team');
      console.log(this.team);
   });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
