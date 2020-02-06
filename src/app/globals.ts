import { Injectable } from '@angular/core';

@Injectable() 
export class Globals {
    ANGULAR_VERSION = "1.1";
    REST_VERSION = "V1";
    IS_GUEST: boolean;
    signedIn: boolean;
} 

