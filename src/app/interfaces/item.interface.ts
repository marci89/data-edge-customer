



export interface Item {
    id: number;
    articleNumber: string;
    barcode: string;
    name: string;
    quantitativeUnit: string;
    netPrice: number;
    version: number;
    partnerId: number;
  }
  
  export interface ListItemRequest  {
    id?: number;
    articleNumber: string;
    barcode: string;
    name: string;
    quantitativeUnit: string;
    netPrice?: number;
    version?: number;
    partnerId?: number;
  }

  export interface CreateItemRequest {
    articleNumber: string;
    barcode: string;
    name: string;
    quantitativeUnit: string;
    netPrice: number;
    version: number;
    partnerId: number;
  }

  export interface UpdateItemRequest {
    id: number;
    articleNumber: string;
    barcode: string;
    name: string;
    quantitativeUnit: string;
    netPrice: number;
    version: number;
    partnerId: number;
  }
  