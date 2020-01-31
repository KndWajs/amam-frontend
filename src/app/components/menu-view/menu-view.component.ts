import { Component, OnInit, Input } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenusService } from 'src/app/services/menus.service';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { MenuMeal } from 'src/app/models/menu-meals';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {
  @Input() menus: Array<Menu>;

  addMeal:String;

  private getMenuSubscription: Subscription;
  private deleteMenuSubscription: Subscription;
  private deleteMenuMealSubscription: Subscription;


  constructor(private readonly menusService: MenusService) {
    this.addMeal = null;
  }

  ngOnInit() {
    if (!this.menus) {
      this.getMenu();
    }
  }


  getMenu(): void {
    this.getMenuSubscription = this.menusService.getMenusFromHttp().subscribe
      (menu => {
        this.menus = menu;
        // if (!book) {
        //   this.errorMessage = `book with isbn: ${isbn} does not exist`;
        // } else {
        //   this.book = book;
        // }
      },
        error => {
          console.log('there is no menu');
        });

    return;
  }

  deleteMenu(menu: Menu): void {
    this.deleteMenuSubscription = this.menusService.deleteMenu(menu.id).subscribe(
      (menu) => {
        console.log("menu deleted");
        console.log(menu);
        this.getMenu();
      },
      error => {
        console.log(error);
        // let errorDetails = '';
        // if (typeof error.error === 'string' || error.error instanceof String) {
        //     errorDetails = ' --- ' + error.error;
        // }
        // reject(`${error.message} ${errorDetails}`);
      });
  }

  addMealToMenu(menuMeal: MenuMeal, menu: Menu, menuId: number): void {
    let newMenu = new Menu(menu);
    newMenu.meals.push(menuMeal);
    this.menus[menuId] = newMenu;

    this.updateMenu(newMenu, null);
  }

  onRowRemoving(menu: any, e: any): void {

    let newMenu = new Menu(menu);
    const indexMealToDelete = newMenu.meals.findIndex(menuMeal=> menuMeal.dayNumber == e.data.dayNumber && menuMeal.meal.id == e.data.meal.id);
    newMenu.meals.splice(indexMealToDelete, 1);

    this.updateMenu(newMenu, e);
  }

  updateMenu(menu: Menu, e: any){
    let newMenu = new Menu(menu);
    newMenu.id = null;

    if(menu.id != null){      
       let answer = new Promise((resolve, reject) => {
        this.deleteMenuMealSubscription =  this.menusService.addMenu(newMenu).subscribe(
          (m) => {
            console.log("done adding");
            this.deleteMenu(menu);          
            resolve();
          },
          error => {
            console.log(error);
            let errorDetails = '';
            if (typeof error.error === 'string' || error.error instanceof String) {
              errorDetails = ' --- ' + error.error;
            }
            reject(`${error.message} ${errorDetails}`);
          });
      });
      if(e!=null){
        e.cancel = answer;
      }      
    }  
  }

   findMeal(pips: number): boolean{
    return pips === 1 || pips === 2 || pips === 3 ||
      pips === 4 || pips === 5 || pips === 6;
  }



  ngOnDestroy(): void {
    if (this.getMenuSubscription) {
      this.getMenuSubscription.unsubscribe();
    }
    if (this.deleteMenuMealSubscription) {
      this.deleteMenuMealSubscription.unsubscribe();
    }
    if (this.deleteMenuSubscription) {
      this.deleteMenuSubscription.unsubscribe();
    }
  }

}
