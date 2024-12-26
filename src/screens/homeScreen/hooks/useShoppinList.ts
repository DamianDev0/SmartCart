import { useState, useEffect, useCallback } from 'react';
import shoppingListService from '../../../services/shoppinService';
import { useAuth } from '../../../context/authContext';
import { ShoppingListResponse } from '../../../interfaces/shoppinList.interface';
import { ApiError } from '../../../utils/errorHandler';
import { ApiResponse } from '../../../interfaces/apiResponse';

const useShoppingLists = () => {
  const { token } = useAuth();
  const [shoppingLists, setShoppingLists] = useState<ShoppingListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShoppingLists = useCallback(async () => {
    setLoading(true);
    if (token) {
      try {
        const response = await shoppingListService.getShoppingLists(token);
        if ((response as ApiError).statusCode) {
          setError((response as ApiError).message);
        } else {
          const data = (response as ApiResponse<ShoppingListResponse[]>).data;
          setShoppingLists(data);
        }
      } catch (err) {
        setError('Error fetching shopping lists.');
      } finally {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchShoppingLists();
  }, [fetchShoppingLists]);

  return { shoppingLists, loading, error, fetchShoppingLists };
};

export default useShoppingLists;
