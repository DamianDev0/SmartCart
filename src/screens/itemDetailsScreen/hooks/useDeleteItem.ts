import {useState} from 'react';
import {useAuth} from '../../../context/authContext';
import itemService from '../../../services/itemService';
import {CustomToast} from '../../../components/customToast';
import useNavigation from '../../../hooks/useNavigation';

const useDeleteItem = () => {
  const {token} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const deleteItem = async (id: string) => {
    if (!token) {
      setError('Authentication token is missing.');
      return;
    }

    setLoading(true);
    setError(null);
    console.log('Deleting item with id:', id);

    try {
      const response = await itemService.deleteItem(id, token);
      console.log('Response from itemService:', response);

      if (response.message === 'Data retrieved successfully') {
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'Item deleted successfully.',
          position: 'top',
        });
        navigation.goBack();
      } else if ('error' in response) {
        throw new Error(response.error as string);
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
      console.log('Loading state set to false');
    }
  };

  return {
    loading,
    error,
    deleteItem,
  };
};

export default useDeleteItem;
