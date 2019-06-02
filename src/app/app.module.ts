import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { AroundTheWorldComponent } from './components/around-the-world/around-the-world.component';
import { HomeComponent } from './components/home/home.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './components/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'search', component: SearchComponent },
  { path: 'around-the-world', component: AroundTheWorldComponent },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AroundTheWorldComponent,
    HomeComponent,
    UploadComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forRoot(routes),
    NgCircleProgressModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
