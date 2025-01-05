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

  getItemsByShoppingListId: async (
    shoppingListId: string,
    token: string,
  ): Promise<ApiResponse<ItemResponse[]> | ApiError> => {
    try {
      const response = await apiClient.get<ApiResponse<ItemResponse[]>>(
        `/shopping/${shoppingListId}/items`,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  suggestItems: async (
    shoppingListId: string,
    token: string,
  ): Promise<ApiResponse<string> | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<string>>(
        `/shopping/${shoppingListId}/suggest-items`,
        {},
        {headers: {Authorization: `Bearer ${token}`}},
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getShoppingStatistics: async (
    token: string,
  ): Promise<ApiResponse<{pending: number; purchased: number}> | ApiError> => {
    try {
      const response = await apiClient.get<
        ApiResponse<{pending: number; purchased: number}>
      >('/shopping/statistics', {headers: {Authorization: `Bearer ${token}`}});
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  getItemsByDay: async (
    token: string,
  ): Promise<
    ApiResponse<{date: string; status: string; count: number}[]> | ApiError
  > => {
    try {
      const response = await apiClient.get<
        ApiResponse<{date: string; status: string; count: number}[]>
      >('/shopping/items/by-day', {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },

  deleteShoppingList: async (
    shoppingListId: string,
    token: string,
  ): Promise<ApiResponse<null> | ApiError> => {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/shopping/${shoppingListId}`,
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
