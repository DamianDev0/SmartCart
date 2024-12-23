// shoppingListService.ts
import apiClient from '../api/apiClient';
import { ApiResponse } from '../interfaces/apiResponse';
import {
  ShoppingListRequest,
  ShoppingListResponse,
} from '../interfaces/shoppinList.interface';
import { ApiError, handleApiError } from '../utils/errorHandler';

const shoppingListService = {
  createShoppingList: async (
    data: ShoppingListRequest,
  ): Promise<ApiResponse<ShoppingListResponse> | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<ShoppingListResponse>>(
        '/shopping',
        data,
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getShoppingLists: async (
    token: string,
  ): Promise<ApiResponse<ShoppingListResponse[]> | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<ShoppingListResponse[]>>(
        '/shopping',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default shoppingListService;
