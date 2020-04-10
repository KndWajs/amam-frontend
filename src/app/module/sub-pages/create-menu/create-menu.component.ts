import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/shared/models/menu';
import { MenusService } from 'src/app/core/services/menus.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit, OnDestroy {
  private saveMenuSubscription: Subscription;
  menu: Menu;
  savingMenu: boolean;

  constructor(
    private readonly menusService: MenusService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {}

  addMenu(menu: Menu) {
    this.menu = menu;
  }

  saveMenu(): void {
    this.savingMenu = true;
    this.saveMenuSubscription = this.menusService.addMenu(this.menu).subscribe(
      menu => {
        this.savingMenu = false;
        this.router.navigate(['/menus']);
      },
      error => {
        this.savingMenu = false;
        this.alertService.createErrorMessageForHttpResponseWithTitle(
          error,
          'Save menu'
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.saveMenuSubscription) {
      this.saveMenuSubscription.unsubscribe();
    }
  }
}
