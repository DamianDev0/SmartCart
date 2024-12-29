import {useState, useCallback} from 'react';
import {ApiResponse} from '../../../interfaces/apiResponse';
import shoppingListService from '../../../services/shoppinService';
import {ApiError} from '../../../utils/errorHandler';
import {useAuth} from '../../../context/authContext';

const useItemsByDay = () => {
  const [itemsByDay, setItemsByDay] = useState<
    {date: string; status: string; count: number}[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const {token} = useAuth();

  const fetchItemsByDay = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const response = await shoppingListService.getItemsByDay(token);
      if (
        (
          response as ApiResponse<
            {date: string; status: string; count: number}[]
          >
        ).code === 200
      ) {
        setItemsByDay(
          (
            response as ApiResponse<
              {date: string; status: string; count: number}[]
            >
          ).data,
        );
      } else {
        throw response as ApiError;
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [token]);

  return {itemsByDay, loading, error, fetchItemsByDay};
};

export default useItemsByDay;
