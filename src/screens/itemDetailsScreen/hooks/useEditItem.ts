import {useState} from 'react';
import {useAuth} from '../../../context/authContext';
import {CustomToast} from '../../../components/customToast';
import itemService from '../../../services/itemService';
import {ItemRequest, ItemResponse} from '../../../interfaces/item.interface';

const useEditItem = (initialData: ItemResponse) => {
  const {token} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemData, setItemData] = useState<Partial<ItemRequest>>({
    name: initialData.name,
    description: initialData.description || '',
    quantity: initialData.quantity,
    category: initialData.category,
    amount: Number(initialData.amount),
    status: initialData.status,
  });

  const editItem = async (id: string, data: Partial<ItemRequest>) => {
    if (!token) {
      setError('Authentication token is missing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await itemService.updateItem(id, data, token);
      if ('error' in response) {
        throw new Error(response.error as string);
      } else if ('data' in response) {
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'Item updated successfully.',
          position: 'top',
        });
        toggleModal();
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

  const handleChange = (field: keyof ItemRequest, value: string | number) => {
    setItemData({...itemData, [field]: value});
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return {
    loading,
    error,
    editItem,
    itemData,
    handleChange,
    modalVisible,
    toggleModal,
  };
};

export default useEditItem;
