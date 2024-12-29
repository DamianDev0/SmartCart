import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../../components/modal.component';
import useSuggestItems from '../hooks/useSuggestItems';
import {
  fontSubtitleBold,
  fontTitle,
  height,
  primaryColor,
  width,
} from '../../../utils/styles';

interface SuggestItemsModalProps {
  shoppingListId: string;
}

const SuggestItems: React.FC<SuggestItemsModalProps> = ({shoppingListId}) => {
  const {loading, suggestions, isVisible, suggestItems, closeModal} =
    useSuggestItems();

  const handlePress = () => {
    suggestItems(shoppingListId);
  };

  const renderItem = ({item}: {item: string}) => (
    <View style={styles.itemContainer}>
      <Icon name="cart-outline" size={24} color="#000" />
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderSuggestions = () => {
    if (suggestions.includes('Please provide the context')) {
      return <Text style={styles.specialText}>{suggestions}</Text>;
    }

    return (
      <FlatList
        data={suggestions.split(',').map(item => item.trim())}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={1}
        scrollEnabled={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={loading}
        style={styles.button}>
        <Icon name="robot-love-outline" size={30} color={loading ? '#ccc' : '#000'} />
        <Text style={styles.buttonText}>IA Suggest</Text>
      </TouchableOpacity>

      <BottomSheet
        isVisible={isVisible}
        onClose={closeModal}
        height={750}
        backgroundColor={primaryColor}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/img/suggest.png')}
            style={styles.image}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            renderSuggestions()
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#000',
    fontFamily: fontSubtitleBold,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 20,
  },
  list: {
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.78,
    justifyContent: 'flex-start',
    height: height * 0.08,
  },
  itemText: {
    flex: 1,
    fontSize: 12,
    fontFamily: fontTitle,
    color: '#000',
    marginLeft: 10,
  },
  specialText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    fontFamily: fontSubtitleBold,
  },
});

export default SuggestItems;
