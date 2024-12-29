import {useState, useCallback} from 'react';
import {ApiResponse} from '../../../interfaces/apiResponse';
import shoppingListService from '../../../services/shoppinService';
import {ApiError} from '../../../utils/errorHandler';
import {useAuth} from '../../../context/authContext';

const useShoppingStatistics = () => {
  const [statistics, setStatistics] = useState<{
    pending: number;
    purchased: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const {token} = useAuth();

  const fetchStatistics = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const response = await shoppingListService.getShoppingStatistics(token);
      if (
        (response as ApiResponse<{pending: number; purchased: number}>).code ===
        200
      ) {
        setStatistics(
          (response as ApiResponse<{pending: number; purchased: number}>).data,
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
  return {statistics, loading, error, fetchStatistics};
};

export default useShoppingStatistics;
