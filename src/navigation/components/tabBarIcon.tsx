import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

interface TabBarIconProps {
  routeName: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({routeName}) => {
  let iconName: string;

  switch (routeName) {
    case 'HomeTab':
      iconName = 'home';
      break;
    case 'FormItem':
      iconName = 'shopping-bag';
      break;
    default:
      iconName = 'alert-circle';
  }

  return <Icon name={iconName} size={25} color={'#000'} />;
};

export default TabBarIcon;
