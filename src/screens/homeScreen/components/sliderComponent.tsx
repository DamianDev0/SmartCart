import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useRecentItems from '../hooks/useSlider';
import {ItemResponse} from '../../../interfaces/item.interface';
import {
  fontSubtitleBold,
  fontTextLigth,
  fontTitle,
} from '../../../utils/styles';

const {width} = Dimensions.get('screen');

const RecentItemsComponent = () => {
  const {recentItems, loading, error} = useRecentItems();

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderCarouselItem = ({item}: {item: ItemResponse}) => (
    <View style={styles.carouselItem}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemStatus}>
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </Text>
      <Text style={styles.itemDescription}>
        {item.description ? item.description : 'Not assigned'}
      </Text>
      <View style={styles.separator} />
      <View style={styles.detailsContainer}>
        <Text style={styles.itemAmount}>${item.amount}</Text>
        {item.status.toLowerCase() === 'pending' ? (
          <Icon name="cart-outline" size={33} color="#000" />
        ) : (
          <Icon name="cart-check" size={33} color="#000" />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Your Recent Purchases</Text>
      <Carousel
        loop
        width={width}
        height={350}
        data={recentItems}
        scrollAnimationDuration={800}
        renderItem={renderCarouselItem}
        mode="parallax"
        pagingEnabled
        style={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,

  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fontTitle,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  carouselItem: {
    flex: 0.9,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 1,
    elevation: 2,
    shadowColor: '#000',
    backgroundColor: '#fff',
    padding: 40,
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: fontTitle,
    textAlign: 'center',
    color: '#000',
  },
  itemStatus: {
    fontSize: 18,
    color: 'gray',
    fontFamily: fontSubtitleBold,
    marginVertical: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fontTextLigth,
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    width: width * 0.85,
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  itemAmount: {
    fontSize: 20,
    color: '#000',
    fontFamily: fontTitle,
  },
  cartIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  carousel: {
    marginBottom: 20,
  },
});

export default RecentItemsComponent;
