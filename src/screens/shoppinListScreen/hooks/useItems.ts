import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/authContext';
import { CustomToast } from '../../../components/customToast';
import { ApiResponse } from '../../../interfaces/apiResponse';
import { ItemResponse } from '../../../interfaces/item.interface';
import { ApiError } from '../../../utils/errorHandler';
import shoppingListService from '../../../services/shoppinService';

const useFetchItems = (shoppingListId: string) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response: ApiResponse<ItemResponse[]> | ApiError =
          await shoppingListService.getItemsByShoppingListId(
            shoppingListId,
            token,
          );

        if ('code' in response && response.code === 200) {
          setItems(response.data);
        } else if ('code' in response && response.code !== 200) {
          throw new Error(response.message);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          CustomToast({
            type: 'error',
            text1: 'Error',
            text2: err.message,
            position: 'top',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [token, shoppingListId]);

  return {
    loading,
    items,
    error,
  };
};

export default useFetchItems;
