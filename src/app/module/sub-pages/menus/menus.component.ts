import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Menu } from "src/app/shared/models/menu";
import { MenusService } from "src/app/core/services/menus.service";
import { Subscription } from "rxjs";
import { AlertService } from "src/app/core/services/alert.service";

@Component({
  selector: "app-menu-view",
  templateUrl: "./menus.component.html",
  styleUrls: ["./menus.component.css"]
})
export class MenusComponent implements OnInit, OnDestroy {
  @Input() menus: Array<Menu>;

  archival: boolean;

  private getMenuSubscription: Subscription;

  constructor(
    private readonly menusService: MenusService,
    private readonly alertService: AlertService
  ) {
    this.archival = false;
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.getMenuSubscription = this.menusService.getMenusFromHttp(this.archival).subscribe(
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
