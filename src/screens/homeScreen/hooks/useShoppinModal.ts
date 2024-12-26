/* eslint-disable no-catch-shadow */
import {useState} from 'react';
import {
  ShoppingListRequest,
  ShoppingListResponse,
} from '../../../interfaces/shoppinList.interface';
import {useAuth} from '../../../context/authContext';
import {ApiError, handleApiError} from '../../../utils/errorHandler';
import shoppingListService from '../../../services/shoppinService';
import {ApiResponse} from '../../../interfaces/apiResponse';
import {CustomToast} from '../../../components/customToast';

const useCreateShoppingList = () => {
  const {token} = useAuth();
  const [formState, setFormState] = useState<{name: string; context: string}>({
    name: '',
    context: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ShoppingListResponse | null>(null);

  const validateForm = () => {
    if (!formState.name || !formState.context) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in both fields.',
      });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormState({name: '', context: ''});
  };

  const createShoppingList = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    if (!token) {
      setError('Invalid token');
      setLoading(false);
      CustomToast({
        type: 'error',
        text1: 'Invalid token',
      });
      return;
    }

    const listData: ShoppingListRequest = {
      name: formState.name,
      context: formState.context,
    };

    try {
      const response = await shoppingListService.createShoppingList(
        listData,
        token,
      );

      if ((response as ApiError).statusCode) {
        const errorMessage = (response as ApiError).message;
        setError(errorMessage);
        CustomToast({
          type: 'error',
          text1: 'Error creating shopping list',
          text2: errorMessage,
        });
      } else {
        const data = (response as ApiResponse<ShoppingListResponse>).data;
        setData(data);
        CustomToast({
          type: 'success',
          text1: 'Shopping list created',
          text2: 'Your shopping list has been successfully created.',
        });
        resetForm();
      }
    } catch (error) {
      const apiError = handleApiError(error as unknown as Error);
      setError(apiError.message);
      CustomToast({
        type: 'error',
        text1: 'Error creating shopping list',
        text2: apiError.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return {
    formState,
    handleChange,
    createShoppingList,
    data,
    loading,
    error,
  };
};

export default useCreateShoppingList;
