import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrl: './purchase-create.component.css'
})

export class PurchaseCreateComponent implements OnInit {

  createForm: FormGroup = new FormGroup({})
  serverError: string = "";

  constructor(
    private purchaseService: PurchaseService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  //Init form
  initForm() {
    this.createForm = new FormGroup({
      purchaseAmount: new FormControl('', Validators.required),
      cashRegisterId: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
    });
  }

  // create
  createPurchase() {
    this.purchaseService.create(this.createForm.value).subscribe({
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
  
  // close the dialog modal
  cancel() {
    this.modalService.close();
  }
}
