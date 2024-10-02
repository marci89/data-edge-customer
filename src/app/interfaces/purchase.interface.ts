


export interface Purchase {
    id: number;
    date: Date;
    purchaseAmount: number;
    cashRegisterId: number;
    partnerId: number;
    shopName: string;
  }
  
  export interface ListPurchaseRequest  {
    id?: number;
    date?: Date;
    purchaseAmount?: number;
    cashRegisterId?: number;
    partnerId?: number;
    shopName: string;
  }

  export interface CreatePurchaseRequest {
    purchaseAmount: number;
    cashRegisterId: number;
    partnerId: number;
  }

  export interface UpdatePurchaseRequest {
    id: number;
    purchaseAmount: number;
    cashRegisterId: number;
    partnerId: number;
  }
  