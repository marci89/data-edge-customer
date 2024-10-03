import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListShopRequest, Shop } from '../../../interfaces/shop.interface';
import { Subscription } from 'rxjs';
import { ShopService } from '../../../services/shop.service';
import { ModalService } from '../../../services/modal.service';
import { ShopCreateComponent } from '../shop-create/shop-create.component';
import { ShopEditComponent } from '../shop-edit/shop-edit.component';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css'
})

export class ShopListComponent implements OnInit, OnDestroy {

  shops: Shop[] = [];
  shopListSubscription$: Subscription | undefined;
  filter: ListShopRequest = {} as ListShopRequest;

  constructor(
    private shopService: ShopService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.shopListSubscription$ = this.shopService.filteredList$.subscribe({
      next: shops => {
        this.shops = shops ?? [];
      }
    });

    this.listShop();
  }

  // list  from server
  listShop() {
    debugger;
    this.shopService.list(this.filter).subscribe({
      next: _ => {},
      error: error => {
      this.modalService.openToaster(error.error, false);
      }
    })
  }

  // Edit popup
  openEditDialog(id: number) {
    this.modalService.openDialog(ShopEditComponent, 600, id);
  }

   // Create popup
   openCreateDialog() {
    this.modalService.openDialog(ShopCreateComponent, 600);
  }

    // reseting filter inputs
    resetFilters() {
      this.filter.id = undefined;
      this.filter.name = "";
      this.filter.partnerId = undefined;
      this.listShop();
    }

    //excel export
    exportToCSV() {
      let csvContent = 'Azonosító,Név,Partner azonosító\n'; 
  
      this.shops.forEach(shop => {
        csvContent += `${shop.id},${shop.name},${shop.partnerId}\n`; 
      });
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'shops.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    }

  ngOnDestroy() {
    if (this.shopListSubscription$) {
      this.shopListSubscription$.unsubscribe();
    }
  }
}
