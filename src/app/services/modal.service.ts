import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public dialogRef: any;

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) { }

  // Opening a modal with any component. Size is in px. Request is the dialog data.
  openDialog(component: any, size: number, request?: any,) {
    const dialogSize = size || 600;

    this.dialogRef = this.dialogService.open(component, {
      width: `${dialogSize}px`,
      baseZIndex: 10000,
      showHeader: false,
      modal: true,
      data: {
        request: request
      }
    });
  }

  

  // Opening a custom confirmation popoup with any method
  openCustomConfirmation(
    id: number,
    //Handle this any component method to use the appropriate services to do the action
    method: (id: number) => any,
    header: string,
    message: string,
    itemName?: string,
  ) {
    var text = message;
    if (itemName) {
      text += '<br>' + itemName
    }

    this.confirmationService.confirm({
      message: text,
      header: header,
      acceptLabel: 'Igen',
      rejectLabel: 'Nem',
      acceptButtonStyleClass: 'confirmation-yes-button',
      rejectButtonStyleClass: 'confirmation-no-button',

      accept: () => {
        method(id);
      },
      reject: (type: ConfirmEventType) => {
        switch (type as ConfirmEventType) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }

  // close modal method
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

