import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Shop, UpdateShopRequest } from '../../../interfaces/shop.interface';
import { ShopService } from '../../../services/shop.service';
import { ModalService } from '../../../services/modal.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrl: './shop-edit.component.css'
})
export class ShopEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({})
  shop: Shop = {} as Shop;
  updateRequest: UpdateShopRequest = {} as UpdateShopRequest;
  serverError: string = "";

  constructor(
    private modalService: ModalService,
    private shopService: ShopService,
    private config: DynamicDialogConfig

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.readShop();
  }

  //Get dialog data (id)
  getIdFromDialog(){
    return this.config?.data?.request
  }

  // Init form
  initForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
    });
  }

   //Add values for editForm
   addValuesToForm() {
    this.editForm.patchValue(this.shop)
  }

   // Read by id
   readShop() {
    const id = this.getIdFromDialog();
    this.shopService.readById(id).subscribe({
      next: shop => {
        this.shop = shop;
        this.addValuesToForm();
      },
      error: error => {
      //  this.toastr.error(this.translate.instant(error.error))
      }
    });
  }

  //edit
  editShop() {
    this.updateRequest = this.editForm.value;
    this.updateRequest.id = this.getIdFromDialog();

    this.shopService.update(this.updateRequest).subscribe({
      next: _ => {
      //  this.toastr.success(this.translate.instant('EditSuccess'))
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

