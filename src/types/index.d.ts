interface IProduct {
  id: string;
  productImageUrl: string | undefined;
  productName: string | undefined;
  quantity: number;
  unitPrice: number;
}

interface IResponse {
  response: {
    data: any;
  };
}

interface IProductInput {
  id: string;
  qty: number;
}
