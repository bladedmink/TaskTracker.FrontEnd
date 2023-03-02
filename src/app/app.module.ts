import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskTrackerHttpClient, TASK_TRACKER_API_BASE_URL } from './services/TaskTrackerHttpClient';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { TaskTrackerComponent } from './components/task-tracker/task-tracker.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    TaskTrackerComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Configuration,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {
      provide: TASK_TRACKER_API_BASE_URL,
      useFactory: (configuration: Configuration) => {
        return configuration.AppConstants.TaskTrackerApiUrl;
      },
      deps: [Configuration],
    },
    TaskTrackerHttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
