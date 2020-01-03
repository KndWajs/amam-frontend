import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
   ngOnInit(): void {

  }

  // newMenuForm: FormGroup;
  // private addMenuSubscription: Subscription;
  // menu: Menu;
  // addMenuMessage: string;

  // constructor(private readonly menuService: MenusService, private readonly formBuilder: FormBuilder) {
  // }


  // ngOnInit(): void {

  //   this.newMenuForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     menuUnit: ['', Validators.required]
  //   });
  // }

  // saveNewMenu(newMenuForm): void {
  //   this.menu = new Menu(newMenuForm);
  //   this.addMenuSubscription =
  //     this.menuService.addMenu(this.menu).subscribe((menu) => {
  //       console.log("menu added succesfully");
  //       console.log(menu);
  //       this.addMenuMessage = "Success!"
  //     },
  //       error => {
  //         let errorDetails = '';
  //         if (typeof error.error === 'string' || error.error instanceof String) {
  //           errorDetails = ' --- ' + error.error;
  //         }
  //         this.addMenuMessage = (`${error.message} ${errorDetails}`);
  //         console.log(error);
  //       });
  // }

  // ngOnDestroy(): void {
  //   if (this.addMenuSubscription) {
  //     this.addMenuSubscription.unsubscribe();
  //   }
  // }
}
