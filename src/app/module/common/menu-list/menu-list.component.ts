import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Menu } from "src/app/shared/models/menu";
import { MenusService } from "src/app/core/services/menus.service";
import { Subscription } from "rxjs";
import { MenuMeal } from "src/app/shared/models/menu-meals";
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: "app-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.css"]
})
export class MenuListComponent implements OnInit {
  @Input() menu: Menu; 
  @Input() autoExpandAll: boolean;
  
  @Output() readonly deleteMenuEvent = new EventEmitter<Menu>();
  @Output() readonly updateMenuEvent = new EventEmitter<Menu>();

  addMeal: boolean;

  private deleteMenuSubscription: Subscription;
  private deleteMenuMealSubscription: Subscription;

  constructor(private readonly menusService: MenusService, 
    private readonly alertService: AlertService) {
  }

  ngOnInit() {
    if(this.autoExpandAll == null){
      this.autoExpandAll = true;
    }
  }

  deleteMenu(menu: Menu): void {
    this.deleteMenuSubscription = this.menusService
      .deleteMenu(menu.id)
      .subscribe(
        menu => {
          this.alertService.warn(`menu ${menu.name} was deleted`, {
            autoClose: true
          });
          this.deleteMenuEvent.emit(menu);
        },
        error => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
          error,
          "Delete menu"
        );
        }
      );
  }

  addMealToMenu(menuMeal: MenuMeal, menu: Menu): void {
    let newMenu = new Menu(menu);
    newMenu.meals.push(menuMeal);
    this.menu = newMenu;

    this.updateMenu(newMenu, null);
  }

  onRowRemoving(menu: any, e: any): void {
    let newMenu = new Menu(menu);
    const indexMealToDelete = newMenu.meals.findIndex(
      menuMeal =>
        menuMeal.dayNumber == e.data.dayNumber &&
        menuMeal.meal.id == e.data.meal.id
    );
    newMenu.meals.splice(indexMealToDelete, 1);

    this.updateMenu(newMenu, e);
  }

  updateMenu(menu: Menu, e: any) {
    let newMenu = new Menu(menu);
    newMenu.id = null;

    if (menu.id != null) {
      let answer = new Promise((resolve, reject) => {
        this.deleteMenuMealSubscription = this.menusService
          .addMenu(newMenu)
          .subscribe(
            m => {
              this.alertService.success(`menu ${m.name} was updated`, {
                autoClose: true
              });
              this.deleteMenu(menu);
              this.updateMenuEvent.emit(m);
              resolve();
            },
            error => {
              this.alertService.createErrorMessageForHttpResponseWithTitle(
                error,
                "Update menu"
              );
            }
          );
      });      
      if (e != null) {
        e.cancel = answer;
      }
    } else {      
      this.updateMenuEvent.emit(menu);
    }
  }

  onRowClick(e) {
    if (e.rowType == "data") {
      if (e.isExpanded) {
        e.component.collapseRow(e.key);
      } else {
        e.component.collapseAll(-1);
        e.component.expandRow(e.key);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.deleteMenuMealSubscription) {
      this.deleteMenuMealSubscription.unsubscribe();
    }
    if (this.deleteMenuSubscription) {
      this.deleteMenuSubscription.unsubscribe();
    }
  }
}
