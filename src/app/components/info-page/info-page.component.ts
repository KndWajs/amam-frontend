import { Component, OnInit } from '@angular/core';

import { Globals } from '../../globals'

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {


  constructor(public globals: Globals) {
  }

  ngOnInit() {

  }

}
