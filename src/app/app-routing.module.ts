import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './components/purchase/purchase-list/purchase-list.component';
import { ShopListComponent } from './components/shop/shop-list/shop-list.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { PurchaseCreateComponent } from './components/purchase/purchase-create/purchase-create.component';
import { ShopCreateComponent } from './components/shop/shop-create/shop-create.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { PurchaseItemListComponent } from './components/purchase-item/purchase-item-list/purchase-item-list.component';


const routes: Routes = [
  { path: '', component: PurchaseListComponent },
  { path: 'purchases', component: PurchaseListComponent },
  { path: 'purchase/:id', component: PurchaseItemListComponent},
  { path: 'shops', component: ShopListComponent },
  { path: 'items', component: ItemListComponent },

  { path: '**', component: PurchaseListComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

