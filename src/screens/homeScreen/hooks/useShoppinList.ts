// useShoppingLists.ts
import {useState, useEffect} from 'react';
import shoppingListService from '../../../services/shoppinService';
import {useAuth} from '../../../context/authContext';
import {ShoppingListResponse} from '../../../interfaces/shoppinList.interface';
import {ApiError} from '../../../utils/errorHandler';
import {ApiResponse} from '../../../interfaces/apiResponse';

const useShoppingLists = () => {
  const {token} = useAuth();
  const [shoppingLists, setShoppingLists] = useState<ShoppingListResponse[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      setLoading(true);
      if (token) {
        const response = await shoppingListService.getShoppingLists(token);

        if ((response as ApiError).statusCode) {
          setError((response as ApiError).message);
        } else {
          const data = (response as ApiResponse<ShoppingListResponse[]>).data;

          setShoppingLists(data);
        }
      }
      setLoading(false);
    };

    fetchShoppingLists();
  }, [token]);

  return {shoppingLists, loading, error};
};

export default useShoppingLists;
