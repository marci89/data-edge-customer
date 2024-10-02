

export interface PurchaseItem {
    id: number;
    partnerCtID: number;
    purchaseID: number;
    quantity: number;
    gross: number;
    partnerId: number;

  }
  
  export interface ListPurchaseItemRequest  {
    id?: number;
    partnerCtID?: number;
    purchaseID?: number;
    quantity?: number;
    gross?: number;
    partnerId?: number;
  }

  export interface CreatePurchaseItemRequest {
    partnerCtID: number;
    purchaseID: number;
    quantity: number;
    gross: number;
    partnerId: number;
  }

  export interface UpdatePurchaseItemRequest {
    id: number;
    partnerCtID: number;
    purchaseID: number;
    quantity: number;
    gross: number;
    partnerId: number;
  }
  