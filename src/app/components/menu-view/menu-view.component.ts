import { Component, OnInit, Input } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenusService } from 'src/app/services/menus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {
  @Input() menus: Array<Menu>;

  private getMenuSubscription: Subscription;
  private deleteMenuSubscription: Subscription;

  constructor(private readonly menusService: MenusService) {

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
        console.log(this.menus);
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

  deleteMenu(menu: Menu, numberOnList: number): void {
    this.deleteMenuSubscription = this.menusService.deleteMenu(menu.id).subscribe(
      (menu) => {
         console.log("menu deleted");
         console.log(menu);
         this.menus.splice(numberOnList);

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



  ngOnDestroy(): void {
    if (this.getMenuSubscription) {
        this.getMenuSubscription.unsubscribe();
    }
    if (this.deleteMenuSubscription) {
      this.deleteMenuSubscription.unsubscribe();
  }
}

}
