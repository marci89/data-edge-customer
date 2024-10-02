import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Purchase, UpdatePurchaseRequest } from '../../../interfaces/purchase.interface';
import { PurchaseService } from '../../../services/purchase.service';


@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrl: './purchase-edit.component.css'
})

export class PurchaseEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({})
  purchase: Purchase = {} as Purchase;
  updateRequest: UpdatePurchaseRequest = {} as UpdatePurchaseRequest;
  serverError: string = "";

  constructor(
    private modalService: ModalService,
    private purchaseService: PurchaseService,
    private config: DynamicDialogConfig

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.readPurchase();
  }

  //Get dialog data (id)
  getIdFromDialog(){
    return this.config?.data?.request
  }

  // Init form
  initForm() {
    this.editForm = new FormGroup({
      purchaseAmount: new FormControl('', Validators.required),
      cashRegisterId: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),

    });
  }

   //Add values for editForm
   addValuesToForm() {
    this.editForm.patchValue(this.purchase)
  }
  
   // Read by id
   readPurchase() {
    const id = this.getIdFromDialog();
    this.purchaseService.readById(id).subscribe({
      next: purchase => {
        this.purchase = purchase;
        this.addValuesToForm();
      },
      error: error => {
        this.modalService.openToaster(error.error, false)
      }
    });
  }

  //edit
  editPurchase() {
    this.updateRequest = this.editForm.value;
    this.updateRequest.id = this.getIdFromDialog();

    this.purchaseService.update(this.updateRequest).subscribe({
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

