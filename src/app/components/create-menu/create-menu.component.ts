import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { MenusService } from 'src/app/services/menus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  private saveMenuSubscription: Subscription;
  menu: Array<Menu>;
  waitingForMenu: boolean;

  constructor(private readonly menusService: MenusService, private readonly router: Router) {

  }

  ngOnInit(): void {
  }

  addMenu(menu: Menu) {
    this.menu = new Array<Menu>(menu);
  }

  saveMenu(): void {
      this.saveMenuSubscription =
        this.menusService.addMenu(this.menu[0]).subscribe((menu) => {
            console.log("menu added succesfully");
            console.log(menu);
            this.router.navigate(['/show-menu']);
         },
         error => {
             console.log(error);
         });
    }

    ngOnDestroy(): void {
      if (this.saveMenuSubscription) {
        this.saveMenuSubscription.unsubscribe();
      }
    }

}
