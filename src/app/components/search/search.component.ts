import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { Lastupdate } from './../../models/response/lastupdate';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  selected: { startDate: Moment, endDate: Moment } = {
    startDate: moment(),
    endDate: moment()
  };
  team: String = 'RED';

  LAST_UPDATE_API_URL = `${environment.baseUrl}/api/last-updated`;
  lastUpdated: string;

  isShowSelectedTeam: boolean;
  private sub: any;

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  constructor(private httpClient: HttpClient,  private route: ActivatedRoute) {
    this.lastUpdated = '';
    this.sub = this.route.queryParamMap.subscribe(params => {
      this.team = params.get('team');
      if (this.team == null || this.team === '') {
        this.team = 'RED';
        this.isShowSelectedTeam = true;
      } else {
        this.isShowSelectedTeam = false;
      }
   });
  }


  ngOnInit() {
    this.dtOptions = {
      searching: true,
      order: [[3, 'dsc'], [2, 'dsc']],
      data: [],
      ajax: {
        url: '/api/score',
        data: (d: any) => {
            d.startDate = this.selected.startDate != null ? this.selected.startDate.format('YYYY-MM-DD') : null;
            d.endDate = this.selected.endDate != null ? this.selected.endDate.format('YYYY-MM-DD') : null;
            d.team = this.team;
        },
        dataSrc: '',
      },
        columns: [
          { title: 'Team', data: 'team' },
          { title: 'Name', data: 'fullname' },
          { title: 'Score', data: 'score', render: $.fn.dataTable.render.number(',', '.', 0) },
          { title: 'Date', data: 'date' }
        ],
      };
      this.httpClient.get<Lastupdate>(this.LAST_UPDATE_API_URL).subscribe(
        (response) => {
          this.lastUpdated = response.lastUpdated;
        },
        (err) => console.log(err)
      );
    }

    modeOnClick(mode: String) {
      this.team = mode;
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
        dtInstance.draw();
      });
    }

    dateOnChange() {
      console.log(this.selected);
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
        dtInstance.draw();
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

  }
