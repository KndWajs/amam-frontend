import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from 'src/app/shared/models/menu';
import { MenusService } from 'src/app/core/services/menus.service';
import { Subscription } from 'rxjs';
import { MenuMeal } from 'src/app/shared/models/menu-meals';
import { AlertService } from 'src/app/core/services/alert.service';
import { ShoppingListsService } from 'src/app/core/services/shopping-lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Input() menu: Menu;
  @Input() autoExpandAll: boolean;

  @Output() readonly deleteMenuEvent = new EventEmitter<Menu>();
  @Output() readonly updateMenuEvent = new EventEmitter<Menu>();

  addMeal: boolean;
  creatingShoppingList: boolean;

  private deleteMenuSubscription: Subscription;
  private deleteMenuMealSubscription: Subscription;
  private createShoppingListSubscription: Subscription;

  constructor(
    private readonly menusService: MenusService,
    private readonly shoppingListsService: ShoppingListsService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.autoExpandAll == null) {
      this.autoExpandAll = true;
    }
  }

  deleteMenu(menu: Menu): void {
    this.deleteMenuSubscription = this.menusService
      .deleteMenu(menu.id)
      .subscribe(
        deletedMenu => {
          this.alertService.warn(`menu ${deletedMenu.name} was deleted`, {
            autoClose: true
          });
          this.deleteMenuEvent.emit(deletedMenu);
        },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Delete menu'
          );
        }
      );
  }

  addMealToMenu(menuMeal: MenuMeal, menu: Menu): void {
    const newMenu = new Menu(menu);
    newMenu.meals.push(menuMeal);
    this.menu = newMenu;

    this.updateMenu(newMenu);
  }

  onRowRemoving(menu: any, e: any): void {
    const newMenu = new Menu(menu);
    const indexMealToDelete = newMenu.meals.findIndex(
      menuMeal =>
        menuMeal.dayNumber === e.data.dayNumber &&
        menuMeal.meal.id === e.data.meal.id
    );
    newMenu.meals.splice(indexMealToDelete, 1);

    this.updateMenu(newMenu);
  }

  createShoppingList(menu: Menu, e: any) {
    this.creatingShoppingList = true;
    this.createShoppingListSubscription = this.shoppingListsService
      .createShoppingList(menu)
      .subscribe(
        m => {
          this.creatingShoppingList = false;
          this.router.navigate(['/shopping-lists']);
        },
        error => {
          this.creatingShoppingList = false;
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Create Shopping list'
          );
        }
      );
  }

  updateMenu(menu: Menu) {
    if (menu.id != null) {
      this.deleteMenuMealSubscription = this.menusService
        .updateMenu(menu)
        .subscribe(
          m => {
            this.alertService.success(`menu ${m.name} was updated`, {
              autoClose: true
            });
            this.updateMenuEvent.emit(m);
          },
          error => {
            this.alertService.createErrorMessageForHttpResponseWithTitle(
              error,
              'Update menu'
            );
          }
        );
    } else {
      this.updateMenuEvent.emit(menu);
    }
  }

  onRowClick(e) {
    if (e.rowType === 'data') {
      if (e.isExpanded) {
        e.component.collapseRow(e.key);
      } else {
        e.component.collapseAll(-1);
        e.component.expandRow(e.key);
      }
    }
  }

  changeArchivalFlag(menu: Menu, e: any): void {
    const newMenu = new Menu(menu);
    newMenu.archival = e.target.checked;
    this.updateMenu(newMenu);
  }

  createShoppingListSubscriptionngOnDestroy(): void {
    if (this.deleteMenuMealSubscription) {
      this.deleteMenuMealSubscription.unsubscribe();
    }
    if (this.createShoppingListSubscription) {
      this.createShoppingListSubscription.unsubscribe();
    }
    if (this.deleteMenuSubscription) {
      this.deleteMenuSubscription.unsubscribe();
    }
  }
}
