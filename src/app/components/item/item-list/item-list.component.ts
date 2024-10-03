import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item, ListItemRequest } from '../../../interfaces/item.interface';
import { Subscription } from 'rxjs';
import { ItemService } from '../../../services/item.service';
import { ModalService } from '../../../services/modal.service';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { ItemCreateComponent } from '../item-create/item-create.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})

export class ItemListComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  itemListSubscription$: Subscription | undefined;
  filter: ListItemRequest = {} as ListItemRequest;

  constructor(
    private itemService: ItemService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.itemListSubscription$ = this.itemService.filteredList$.subscribe({
      next: items => {
        this.items = items ?? [];
      }
    });

    this.listItem();
  }

  // list
  listItem() {
    this.itemService.list(this.filter).subscribe({
      next: _ => {},
      error: error => {
      this.modalService.openToaster(error.error, false);
      }
    })
  }

  // Edit popup
  openEditDialog(id: number) {
    this.modalService.openDialog(ItemEditComponent, 600, id);
  }

   // Create popup
   openCreateDialog() {
    this.modalService.openDialog(ItemCreateComponent, 600);
  }

    // reseting filter inputs
    resetFilters() {

      this.filter.id = undefined;
      this.filter.barcode = "";
      this.filter.articleNumber = "";
      this.filter.name = "";
      this.filter.quantitativeUnit = "";
      this.filter.netPrice = undefined;
      this.filter.version = undefined;
      this.filter.partnerId = undefined;
      this.listItem();
    }

    //excel export
    exportToCSV() {
      let csvContent = 'Azonosító,Cikkszám,Vonalkód,Név,Mennyiségi összeg,Nettó egységár,Verzió,Partner azonosító\n'; 
  
      this.items.forEach(item => {
        csvContent += `${item.id},${item.articleNumber},${item.barcode},${item.name},${item.quantitativeUnit},${item.netPrice},${item.version},${item.partnerId}\n`; 
      });
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'items.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    }

  ngOnDestroy() {
    if (this.itemListSubscription$) {
      this.itemListSubscription$.unsubscribe();
    }
  }
}
