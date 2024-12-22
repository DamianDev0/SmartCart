import {useNavigation as useReactNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AllRoutes} from '../types/navigation.types';

const useNavigation = () => {
  return useReactNavigation<NativeStackNavigationProp<AllRoutes>>();
};

export default useNavigation;
