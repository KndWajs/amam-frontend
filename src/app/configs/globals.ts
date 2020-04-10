import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    ANGULAR_VERSION = '2.0.0';
    REST_VERSION = 'V1';
    IS_GUEST: boolean;
    signedIn: boolean;
}
