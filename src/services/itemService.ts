import apiClient from '../api/apiClient';
import {ApiResponse} from '../interfaces/apiResponse';
import {ItemRequest, ItemResponse} from '../interfaces/item.interface';
import {ApiError, handleApiError} from '../utils/errorHandler';

const itemService = {
  createItem: async (
    data: ItemRequest,
    token: string,
  ): Promise<ApiResponse<ItemResponse> | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<ItemResponse>>(
        '/items',
        data,
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

  updateItem: async (
    id: string,
    data: Partial<ItemRequest>,
    token: string,
  ): Promise<ApiResponse<ItemResponse> | ApiError> => {
    try {
      const response = await apiClient.patch<ApiResponse<ItemResponse>>(
        `/items/${id}`,
        data,
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

  deleteItem: async (
    id: string,
    token: string,
  ): Promise<ApiResponse<null> | ApiError> => {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/items/${id}`,
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

export default itemService;
