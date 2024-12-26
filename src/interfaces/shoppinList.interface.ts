export interface ShoppingListRequest {
  name: string;
  context: string;
}
export interface ShoppingListResponse {
  name: string;
  context: string;
  user: {id: string};
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface ShoppingListResponseNamesIds {
  id: string;
  name: string;
}
