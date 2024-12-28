import apiClient from '../api/apiClient';
import {ApiResponse} from '../interfaces/apiResponse';
import {ItemResponse} from '../interfaces/item.interface';
import {
  ShoppingListRequest,
  ShoppingListResponse,
  ShoppingListResponseNamesIds,
} from '../interfaces/shoppinList.interface';
import {ApiError, handleApiError} from '../utils/errorHandler';

const shoppingListService = {
  createShoppingList: async (
    data: ShoppingListRequest,
    token: string,
  ): Promise<ApiResponse<ShoppingListResponse> | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<ShoppingListResponse>>(
        '/shopping',
        data,
        {headers: {Authorization: `Bearer ${token}`}},
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

      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getShoppingListsNamesAndIds: async (
    token: string,
  ): Promise<ApiResponse<ShoppingListResponseNamesIds[]> | ApiError> => {
    try {
      const response = await apiClient.get<
        ApiResponse<ShoppingListResponseNamesIds[]>
      >('/shopping/namesAndIds', {headers: {Authorization: `Bearer ${token}`}});
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
  getRecentItems: async (
    token: string,
  ): Promise<ApiResponse<ItemResponse[]> | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<ItemResponse[]>>(
        '/shopping/items/recent',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default shoppingListService;