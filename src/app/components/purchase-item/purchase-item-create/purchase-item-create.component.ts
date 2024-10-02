import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../../services/shop.service';
import { ModalService } from '../../../services/modal.service';
import { PurchaseItemService } from '../../../services/purchase-item.service';
import { Item, ListItemRequest } from '../../../interfaces/item.interface';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-purchase-item-create',
  templateUrl: './purchase-item-create.component.html',
  styleUrl: './purchase-item-create.component.css'
})
export class PurchaseItemCreateComponent implements OnInit {

  createForm: FormGroup = new FormGroup({})
  serverError: string = "";
  filter: ListItemRequest = {} as ListItemRequest;
  items: Item[] = [];
  

  constructor(
    private purchaseItemService: PurchaseItemService,
    private itemService: ItemService,
    private modalService: ModalService,
    private config: DynamicDialogConfig

  ) { }

  ngOnInit(): void {
    this.listItem();
    this.initForm();
  }

    //Get dialog data (id)
    getIdFromDialog(){
      return this.config?.data?.request
    }

  //Init form
  initForm() {

    var id = this.getIdFromDialog();
    this.createForm = new FormGroup({
      partnerCtID: new FormControl('', Validators.required),
      purchaseID: new FormControl(id),
      quantity: new FormControl('', Validators.required),
      gross: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
    });
  }

  // create
  createPurchaseItem() {
    this.purchaseItemService.create(this.createForm.value).subscribe({
      next: _ => {
        this.modalService.openToaster('Sikeres létrehozás!', true)
        this.createForm.reset();
        this.modalService.close();

      },
      error: error => {
        this.modalService.openToaster(error.error, false)
      }
    })
  }

  // list
  listItem() {
    this.itemService.listForDDL(this.filter).subscribe({
      next: items => {
        this.items = items

      },
      error: error => {
      this.modalService.openToaster(error.error, false);
      }
    })
  }
  
  // close the dialog modal
  cancel() {
    this.modalService.close();
  }
}
