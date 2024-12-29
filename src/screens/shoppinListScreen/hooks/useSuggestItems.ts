import {useState, useRef} from 'react';
import {useAuth} from '../../../context/authContext';
import shoppingListService from '../../../services/shoppinService';
import {CustomToast} from '../../../components/customToast';
import {ApiResponse} from '../../../interfaces/apiResponse';
import {ApiError} from '../../../utils/errorHandler';

const useSuggestItemsWithModal = () => {
  const {token} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [pressCount, setPressCount] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const suggestItems = async (shoppingListId: string) => {
    if (!token) {
      setError('Authentication token is missing.');
      console.error('Token is missing.');
      return;
    }

    if (pressCount >= 2) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Request limit reached. Please try again later.',
        position: 'top',
      });
      return;
    }
    setLoading(true);
    setError(null);
    setPressCount(pressCount + 1);

    try {
      const response: ApiResponse<string> | ApiError =
        await shoppingListService.suggestItems(shoppingListId, token);

      if ('code' in response && response.code === 201) {
        setSuggestions(response.data);
      } else if ('code' in response && response.code !== 201) {
        throw new Error(response.message);
      }
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Error:', err.message);
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: err.message,
          position: 'top',
        });
      }
    } finally {
      setLoading(false);
      setIsVisible(true);

      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          setPressCount(0);
          timeoutRef.current = null;
        }, 180000);
      }
    }
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    console.log('Modal closed');
  };

  return {
    loading,
    suggestions,
    error,
    isVisible,
    suggestItems,
    openModal,
    closeModal,
  };
};

export default useSuggestItemsWithModal;
