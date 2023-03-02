import * as appconstantsdev from './app.constants.development.json';
import * as appconstantsprod from './app.constants.production.json';

import { Injectable } from '@angular/core';

interface Environment {
  TaskTrackerApiUrl: string
}

@Injectable()
export class Configuration {
    public AppConstants: Environment;

    constructor() {
        if (window.location.origin.indexOf('//localhost') >= 0) {
            this.AppConstants = appconstantsdev;
        }
        else {
            this.AppConstants = appconstantsprod;
        }
    }
}
