import {useState} from 'react';
import {useAuth} from '../../../context/authContext';
import {CustomToast} from '../../../components/customToast';
import {ApiResponse} from '../../../interfaces/apiResponse';
import {ApiError} from '../../../utils/errorHandler';
import shoppingListService from '../../../services/shoppinService';
import useNavigation from '../../../hooks/useNavigation';

const useDeleteShoppingList = (shoppingListId: string) => {
  const {token} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigation = useNavigation();

  const deleteShoppingList = async () => {
    if (!token) {
      setError('Authentication token is missing.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response: ApiResponse<null> | ApiError =
        await shoppingListService.deleteShoppingList(shoppingListId, token);

      if ('code' in response && response.code === 200) {
        setSuccess(true);
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'Shopping list deleted successfully.',
          position: 'top',
        });
        navigation.navigate('Home');
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

  return {
    loading,
    error,
    success,
    deleteShoppingList,
  };
};

export default useDeleteShoppingList;
