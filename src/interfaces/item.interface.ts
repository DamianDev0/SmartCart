export interface ItemRequest {
  shoppingListId: string;
  name: string;
  quantity: number;
  description: string;
  amount: number;
  status: string;
  category?: string;
}

export interface ItemResponse {
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  category?: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}


