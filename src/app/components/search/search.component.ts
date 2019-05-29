import { Component, OnInit, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  selected: { startDate: Moment, endDate: Moment } = {
    startDate: moment(),
    endDate: moment()
  };
  team: String = 'RED';

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  constructor() {
  }


  ngOnInit() {
    this.dtOptions = {
      searching: true,
      order: [[3, 'dsc']],
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

  }
