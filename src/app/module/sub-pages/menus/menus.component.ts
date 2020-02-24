import { Component, OnInit, Input } from "@angular/core";
import { Menu } from "src/app/shared/models/menu";
import { MenusService } from "src/app/core/services/menus.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-menu-view",
  templateUrl: "./menus.component.html",
  styleUrls: ["./menus.component.css"]
})
export class MenusComponent implements OnInit {
  @Input() menus: Array<Menu>;

  private getMenuSubscription: Subscription;

  constructor(private readonly menusService: MenusService) {
  }

  ngOnInit() {
      this.getMenu();
  }

  getMenu(): void {
    this.getMenuSubscription = this.menusService.getMenusFromHttp().subscribe(
      menu => {
        this.menus = menu;
        // if (!book) {
        //   this.errorMessage = `book with isbn: ${isbn} does not exist`;
        // } else {
        //   this.book = book;
        // }
      },
      error => {
        console.log("there is no menu");
      }
    );

    return;
  }

  deleteMenu(menu: Menu): void {
    this.getMenu();
  }

  ngOnDestroy(): void {
    if (this.getMenuSubscription) {
      this.getMenuSubscription.unsubscribe();
    }
  }
}
