import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})

export class ItemCreateComponent implements OnInit {

  createForm: FormGroup = new FormGroup({})
  serverError: string = "";

  constructor(
    private itemService: ItemService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  //Init form
  initForm() {
    this.createForm = new FormGroup({
      articleNumber: new FormControl('', Validators.required),
      barcode: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      quantitativeUnit: new FormControl('', Validators.required),
      netPrice: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),

    });
  }

  // create
  createItem() {
    this.itemService.create(this.createForm.value).subscribe({
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
