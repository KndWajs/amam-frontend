import { Component, OnInit, Input } from "@angular/core";
import { Menu } from "src/app/shared/models/menu";
import { MenusService } from "src/app/core/services/menus.service";
import { Subscription } from "rxjs";
import { AlertService } from "src/app/core/services/alert.service";

@Component({
  selector: "app-menu-view",
  templateUrl: "./menus.component.html",
  styleUrls: ["./menus.component.css"]
})
export class MenusComponent implements OnInit {
  @Input() menus: Array<Menu>;

  private getMenuSubscription: Subscription;

  constructor(
    private readonly menusService: MenusService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.getMenuSubscription = this.menusService.getMenusFromHttp().subscribe(
      menus => {
        if (!menus) {
          this.alertService.warn("User don't have any menus!", {
            autoClose: true
          });
          this.menus = new Array();
        } else {
          this.menus = menus;
        }
      },
      error => {
        this.alertService.createErrorMessageForHttpResponseWithTitle(error, "Getting menus");
        this.menus = new Array();
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
