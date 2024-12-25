import apiClient from '../api/apiClient';
import {ApiResponse} from '../interfaces/apiResponse';
import {ItemRequest, ItemResponse} from '../interfaces/item.interface';
import {ApiError, handleApiError} from '../utils/errorHandler';

const itemService = {
  createItem: async (
    data: ItemRequest,
  ): Promise<ApiResponse<ItemResponse> | ApiError> => {
    try {
      const response = await apiClient.post<ApiResponse<ItemResponse>>(
        '/items',
        data,
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      return apiError;
    }
  },
};

export default itemService;
