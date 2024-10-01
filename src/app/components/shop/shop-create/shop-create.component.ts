import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../../services/shop.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrl: './shop-create.component.css'
})

export class ShopCreateComponent implements OnInit {

  createForm: FormGroup = new FormGroup({})
  serverError: string = "";

  constructor(
    private shopService: ShopService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  //Init form
  initForm() {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
    });
  }

  //word create
  createShop() {
    this.shopService.create(this.createForm.value).subscribe({
      next: _ => {
       // this.toastr.success(this.translate.instant('SaveSuccess'))
        this.createForm.reset();
        //set focus to the first input
       // this.englishTextInput.nativeElement.focus();
      },
      error: error => {
       // this.toastr.error(this.translate.instant(error.error))
      }
    })
  }
  
  // close the dialog modal
  cancel() {
    this.modalService.close();
  }
}
