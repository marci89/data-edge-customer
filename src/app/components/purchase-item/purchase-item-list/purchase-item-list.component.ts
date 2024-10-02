import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../services/modal.service';
import { ListPurchaseItemRequest, PurchaseItem } from '../../../interfaces/purchase-item.interface';
import { PurchaseItemService } from '../../../services/purchase-item.service';
import { PurchaseItemEditComponent } from '../purchase-item-edit/purchase-item-edit.component';
import { PurchaseItemCreateComponent } from '../purchase-item-create/purchase-item-create.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-purchase-item-list',
  templateUrl: './purchase-item-list.component.html',
  styleUrl: './purchase-item-list.component.css'
})

export class PurchaseItemListComponent implements OnInit, OnDestroy {


  purchaseItems: PurchaseItem[] = [];
  purchaseItemListSubscription$: Subscription | undefined;
  filter: ListPurchaseItemRequest = {} as ListPurchaseItemRequest;


  constructor(
    private purchaseItemService: PurchaseItemService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.purchaseItemListSubscription$ = this.purchaseItemService.filteredList$.subscribe({
      next: purchaseItems => {
        this.purchaseItems = purchaseItems ?? [];
      }
    });



    this.listPurchaseItem();
  }

  // list  from server
  listPurchaseItem() {
    this.filter.purchaseID = this.route.snapshot.params['id'],

    this.purchaseItemService.list(this.filter).subscribe({
      next: _ => {},
      error: error => {
      this.modalService.openToaster(error.error, false);
      }
    })
  }

  // Edit popup
  openEditDialog(id: number) {
    this.modalService.openDialog(PurchaseItemEditComponent, 600, id);
  }

   // Create popup
   openCreateDialog() {

    this.modalService.openDialog(PurchaseItemCreateComponent, 600, this.route.snapshot.params['id']);
  }

    // reseting filter inputs
    resetFilters() {
      this.filter.id = undefined;
      this.filter.partnerCtID = undefined;
      this.filter.purchaseID = undefined;
      this.filter.quantity = undefined;
      this.filter.gross = undefined;
      this.filter.partnerId = undefined;
    
      this.listPurchaseItem();
    }

    //excel export
    exportToCSV() {
      let csvContent = 'Azonosító,Cikk ID, Vásárlás ID, Mennyiség, Bruttó,Partner azonosító\n'; 
  
      this.purchaseItems.forEach(item => {
        csvContent += `${item.id},${item.partnerCtID},${item.purchaseID},${item.quantity},${item.gross},${item.partnerId}\n`; 
      });
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'purchaseItem.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    }

  

  ngOnDestroy() {
    if (this.purchaseItemListSubscription$) {
      this.purchaseItemListSubscription$.unsubscribe();
    }
  }
}
