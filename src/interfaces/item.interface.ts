export interface ItemRequest {
  shoppingListId: string;
  name: string;
  quantity: number;
  description: string;
  amount: number;
  status: string;
}

export interface ItemResponse {
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  category: string;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  shoppingList: {
    id: string;
    name: string;
    context: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      email: string;
      name: string;
      fingerprintId: string;
    };
  };
}


