import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item, UpdateItemRequest } from '../../../interfaces/item.interface';
import { ModalService } from '../../../services/modal.service';
import { ItemService } from '../../../services/item.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})

export class ItemEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({})
  item: Item = {} as Item;
  updateRequest: UpdateItemRequest = {} as UpdateItemRequest;
  serverError: string = "";

  constructor(
    private modalService: ModalService,
    private itemService: ItemService,
    private config: DynamicDialogConfig

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.readItem();
  }

  //Get dialog data (id)
  getIdFromDialog(){
    return this.config?.data?.request
  }

  // Init form
  initForm() {
    this.editForm = new FormGroup({
      articleNumber: new FormControl('', Validators.required),
      barcode: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      quantitativeUnit: new FormControl('', Validators.required),
      netPrice: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
    });
  }

   //Add values for editForm
   addValuesToForm() {
    this.editForm.patchValue(this.item)
  }

   // Read by id
   readItem() {
    const id = this.getIdFromDialog();
    this.itemService.readById(id).subscribe({
      next: item => {
        this.item = item;
        this.addValuesToForm();
      },
      error: error => {
        this.modalService.openToaster(error.error, false)
      }
    });
  }

  //edit
  editItem() {
    this.updateRequest = this.editForm.value;
    this.updateRequest.id = this.getIdFromDialog();

    this.itemService.update(this.updateRequest).subscribe({
      next: _ => {

        this.modalService.openToaster('Sikeres szerkesztés!', true)
        this.modalService.close();
      },
      error: error => {
        this.serverError = error.error;
      }
    })
  }

  // close the dialog modal
  cancel() {
    this.modalService.close();
  }
}

