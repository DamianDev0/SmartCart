import {CustomToast} from '../../../components/customToast';
import {useAuth} from '../../../context/authContext';

const useHeader = () => {
  const {signOut} = useAuth();
  const handleLogOut = async () => {
    CustomToast({
      type: 'info',
      text1: 'Session ended',
      text2: 'You have been signed out successfully.',
      position: 'top',
    });
    await signOut();
  };

  return {handleLogOut};
};

export default useHeader;
