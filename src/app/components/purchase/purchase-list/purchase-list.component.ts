import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListPurchaseRequest, Purchase } from '../../../interfaces/purchase.interface';
import { Subscription } from 'rxjs';
import { PurchaseService } from '../../../services/purchase.service';
import { ModalService } from '../../../services/modal.service';
import { PurchaseEditComponent } from '../purchase-edit/purchase-edit.component';
import { PurchaseCreateComponent } from '../purchase-create/purchase-create.component';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css'
})

export class PurchaseListComponent implements OnInit, OnDestroy {


  purchases: Purchase[] = [];
  purchaseListSubscription$: Subscription | undefined;
  filter: ListPurchaseRequest = {} as ListPurchaseRequest;


  constructor(
    private purchaseService: PurchaseService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    //subscribe word list to update the table from different components
    this.purchaseListSubscription$ = this.purchaseService.filteredList$.subscribe({
      next: purchase => {
        this.purchases = purchase ?? [];
      }
    });



    this.listpurchase();
  }

  // list words from server
  listpurchase() {

    this.purchaseService.list(this.filter).subscribe({
      next: _ => {},
      error: error => {
        this.resetFilters();
   
      }
    })
  }

  // Edit popup
  openEditDialog(id: number) {
    this.modalService.openDialog(PurchaseEditComponent, 600, id);
  }

   // Create popup
   openCreateDialog() {
    this.modalService.openDialog(PurchaseCreateComponent, 600);
  }

    // reseting filter inputs
    resetFilters() {
      this.filter.id = undefined;
      this.filter.date = undefined;
      this.filter.purchaseAmount = undefined;
      this.filter.cashRegisterId = undefined;
      this.filter.purchaseAmount = undefined;
      this.filter.partnerId = undefined;
      this.filter.shopName = "";

      this.listpurchase();

    }

    //excel export
    exportToCSV() {
      let csvContent = 'Azonosító,Dátum,Vásárlás összeg,Pénztárgép azonosító,Partner azonosító, Bolt neve\n'; 
  
      this.purchases.forEach(purchase => {
        csvContent += `${purchase.id},${purchase.date},${purchase.purchaseAmount},${purchase.cashRegisterId},${purchase.partnerId},${purchase.shopName}\n`; 
      });
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'purchases.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    }

  

  ngOnDestroy() {
    if (this.purchaseListSubscription$) {
      this.purchaseListSubscription$.unsubscribe();
    }
  }
}
