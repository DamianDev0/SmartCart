import { useState, useCallback } from 'react';
import shoppingListService from '../../../services/shoppinService';
import { ItemResponse } from '../../../interfaces/item.interface';
import { useAuth } from '../../../context/authContext';
import { ApiResponse } from '../../../interfaces/apiResponse';
import { ApiError } from '../../../utils/errorHandler';

const useRecentItems = () => {
  const { token } = useAuth();
  const [recentItems, setRecentItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentItems = useCallback(async () => {
    if (!token) {
      setError('Token is required');
      setLoading(false);
      return;
    }

    setLoading(true);
    const response: unknown = await shoppingListService.getRecentItems(token);

    if ((response as ApiError).statusCode) {
      setError((response as ApiError).message);
    } else {
      const data = (response as ApiResponse<ItemResponse[]>).data;
      setRecentItems(data);
    }

    setLoading(false);
  }, [token]);

  return { recentItems, loading, error, fetchRecentItems };
};

export default useRecentItems;
