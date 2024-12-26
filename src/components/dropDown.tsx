import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

interface GenericDropdownProps {
  data: { label?: string; value: string; iconUrl?: string }[];
  selectedValue: string | null;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder?: string;
  width?: number ;
  height?: number;
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  data,
  selectedValue,
  setSelectedValue,
  placeholder = 'Select',
  width = screenWidth * 0.89,
  height = 50,
}) => {
  const containerStyle = StyleSheet.flatten([styles.dropdownContainer, { width }]);
  const dropdownStyle = StyleSheet.flatten([styles.dropdown, { height }]);

  return (
    <View style={containerStyle}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onChange={(item) => setSelectedValue(item.value)}
        style={dropdownStyle}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.selectedText}
        iconColor="#fff"
        renderItem={(item) => (
          <View style={styles.dropdownItem}>
            {item.iconUrl && (
              <Image
                source={{ uri: item.iconUrl }}
                style={styles.dropdownItemImage}
              />
            )}
            <Text style={styles.dropdownItemText}>{item.label}</Text>
          </View>
        )}
        containerStyle={styles.dropdownContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: screenWidth * 0.89,
  },
  dropdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  selectedText: {
    color: '#fff',
  },
  dropdownContainerStyle: {
    backgroundColor: '#000',
    borderColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemImage: {
    width: screenWidth * 0.1,
    height: screenHeight * 0.06,
    marginRight: 10,
  },
  dropdownItemText: {
    color: '#fff',
    flex: 1,
    textAlign: 'left',
  },
});

export default GenericDropdown;
