import {CustomToast} from '../../../components/customToast';
import {useAuth} from '../../../context/authContext';
import useNavigation from '../../../hooks/useNavigation';

const useHeader = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation();

  const handleLogOut = () => {
    CustomToast({
      type: 'info',
      text1: 'Session ended',
      text2: 'You have been signed out successfully.',
      position: 'top',
    });
    signOut();
    navigation.navigate('Auth');
  };

  return {handleLogOut};
};

export default useHeader;
