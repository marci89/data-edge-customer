import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PurchaseItem, UpdatePurchaseItemRequest } from '../../../interfaces/purchase-item.interface';
import { PurchaseItemService } from '../../../services/purchase-item.service';
import { Item, ListItemRequest } from '../../../interfaces/item.interface';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-purchase-item-edit',
  templateUrl: './purchase-item-edit.component.html',
  styleUrl: './purchase-item-edit.component.css'
})
export class PurchaseItemEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({})
  purchaseItem: PurchaseItem = {} as PurchaseItem;
  updateRequest: UpdatePurchaseItemRequest = {} as UpdatePurchaseItemRequest;
  serverError: string = "";
  filter: ListItemRequest = {} as ListItemRequest;
  items: Item[] = [];

  constructor(
    private modalService: ModalService,
    private purchaseItemService: PurchaseItemService,
    private config: DynamicDialogConfig,
    private itemService: ItemService,

  ) { }

  ngOnInit(): void {
    this.listItem();
    this.initForm();
    this.readPurchaseItem();
 
  }

  //Get dialog data (id)
  getIdFromDialog(){
    return this.config?.data?.request
  }

  // Init form
  initForm() {
    this.editForm = new FormGroup({
      partnerCtID: new FormControl('', Validators.required),
      purchaseID: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      gross: new FormControl('', Validators.required),
      partnerID: new FormControl('', Validators.required),
    });
  }

   //Add values for editForm
   addValuesToForm() {
    this.editForm.patchValue(this.purchaseItem)
  }

   // Read by id
   readPurchaseItem() {
    const id = this.getIdFromDialog();
    this.purchaseItemService.readById(id).subscribe({
      next: purchaseItem => {
        this.purchaseItem = purchaseItem;
        this.addValuesToForm();
      },
      error: error => {
        this.modalService.openToaster(error.error, false)
      }
    });
  }

  //edit
  editPurchaseItem() {
    this.updateRequest = this.editForm.value;
    this.updateRequest.id = this.getIdFromDialog();
    this.updateRequest.purchaseID = this.purchaseItem.id;

    this.purchaseItemService.update(this.updateRequest).subscribe({
      next: _ => {

        this.modalService.openToaster('Sikeres szerkesztés!', true)
        this.modalService.close();
      },
      error: error => {
        this.serverError = error.error;
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

