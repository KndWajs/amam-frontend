import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Globals } from 'src/app/configs/globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public globals: Globals) {

  }

  ngOnInit() {}

  signOut(): void {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}
