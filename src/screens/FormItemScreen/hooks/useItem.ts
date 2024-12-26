import {useState, useEffect} from 'react';
import {useAuth} from '../../../context/authContext';
import itemService from '../../../services/itemService';
import shoppingListService from '../../../services/shoppinService';
import {CustomToast} from '../../../components/customToast';
import {ShoppingListResponseNamesIds} from '../../../interfaces/shoppinList.interface';
import useNavigation from '../../../hooks/useNavigation';

const useCreateItem = () => {
  const {token} = useAuth();
  const navigation = useNavigation();
  const [itemData, setItemData] = useState({
    shoppingListId: '',
    name: '',
    quantity: '',
    description: '',
    amount: '',
    status: '',
  });
  const [shoppingLists, setShoppingLists] = useState<
    ShoppingListResponseNamesIds[]
  >([]);
  const [statusOptions] = useState([
    {label: 'Pending', value: 'pending'},
    {label: 'Purchased', value: 'purchased'},
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      if (token) {
        setLoading(true);
        const response = await shoppingListService.getShoppingListsNamesAndIds(
          token,
        );
        if ('data' in response) {
          setShoppingLists(response.data);
        } else {
          setError(response.message);
        }
        setLoading(false);
      }
    };
    fetchShoppingLists();
  }, [token]);

  const handleChange = (field: string, value: any) => {
    setItemData(prevState => ({...prevState, [field]: value}));
  };

  const handleCreateItem = async () => {
    if (
      !itemData.shoppingListId ||
      !itemData.name ||
      !itemData.description ||
      !itemData.status
    ) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all the fields.',
      });
      return;
    }

    if (!token) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Authentication token is missing.',
      });
      return;
    }

    const itemDataToSend = {
      ...itemData,
      quantity: Number(itemData.quantity),
      amount: Number(itemData.amount),
    };

    setLoading(true);
    const response = await itemService.createItem(itemDataToSend, token);
    setLoading(false);

    if ('data' in response) {
      CustomToast({
        type: 'success',
        text1: 'Item created',
        text2: 'Your item has been successfully created.',
      });
      setItemData({
        shoppingListId: '',
        name: '',
        quantity: '',
        description: '',
        amount: '',
        status: '',
      });
      navigation.navigate('Home');
    } else {
      CustomToast({
        type: 'error',
        text1: 'Error creating item',
        text2: response.message,
      });
    }
  };

  return {
    itemData,
    shoppingLists,
    statusOptions,
    handleChange,
    handleCreateItem,
    loading,
    error,
  };
};

export default useCreateItem;
