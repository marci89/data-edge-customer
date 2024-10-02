import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ShopListComponent } from './components/shop/shop-list/shop-list.component';
import { ShopCreateComponent } from './components/shop/shop-create/shop-create.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { PurchaseListComponent } from './components/purchase/purchase-list/purchase-list.component';
import { PurchaseCreateComponent } from './components/purchase/purchase-create/purchase-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShopEditComponent } from './components/shop/shop-edit/shop-edit.component';
import { PurchaseEditComponent } from './components/purchase/purchase-edit/purchase-edit.component';
import { ItemEditComponent } from './components/item/item-edit/item-edit.component';
import { PurchaseItemEditComponent } from './components/purchase-item/purchase-item-edit/purchase-item-edit.component';
import { PurchaseItemCreateComponent } from './components/purchase-item/purchase-item-create/purchase-item-create.component';
import { PurchaseItemListComponent } from './components/purchase-item/purchase-item-list/purchase-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopListComponent,
    ShopCreateComponent,
    ItemCreateComponent,
    ItemListComponent,
    PurchaseListComponent,
    PurchaseCreateComponent,
    ShopEditComponent,
    PurchaseEditComponent,
    ItemEditComponent,
    PurchaseItemEditComponent,
    PurchaseItemCreateComponent,
    PurchaseItemListComponent
  ],
  imports: [

    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
  
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    DropdownModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    PasswordModule,
    InputTextModule,
    TabViewModule,
    FileUploadModule,
    ToggleButtonModule,
    InputMaskModule,
    CheckboxModule,
  
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


