

export interface Shop {
    id: number;
    name: string;
    partnerId: number;
  }
  
  export interface ListShopRequest  {
    id?: number;
    name: string;
    partnerId?: number;
  }

  export interface CreateShopRequest {
    name: string;
    partnerId: number;
  }

  export interface UpdateShopRequest {
    id: number;
    name: string;
    partnerId: number;
  }
  