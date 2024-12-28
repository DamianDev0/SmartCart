import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {format, parseISO} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fontSubtitle,
  fontSubtitleBold,
  fontTitle,
  height,
  primaryColor,
  width,
} from '../../utils/styles';
import EditItem from './components/editModal';
import DeleteItem from './components/deleItemModal';

const ItemDetailsScreen = () => {
  const route = useRoute();
  const item = route.params as {
    id: string;
    name: string;
    description: string | null;
    quantity: number;
    category: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };

  const dayOfWeek = format(parseISO(item.createdAt), 'EEEE');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/img/shopping2.png')}
          style={styles.image}
        />
        <View style={styles.iconContainer}>
          <View style={styles.editIcon}>
            <EditItem item={item} />
          </View>
          <View style={styles.deleteIcon}>
            <DeleteItem itemId={item.id} />
          </View>
        </View>
      </View>
      <View style={styles.flexGrowContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.hr} />
          <View style={styles.detailsRow}>
            <Icon name="calendar" size={22} color="#000" />
            <Text style={styles.detail}>Created At: {dayOfWeek}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Icon name="package-variant" size={22} color="#000" />
            <Text style={styles.detail}>Quantity: {item.quantity}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Icon name="tag" size={22} color="#000" />
            <Text style={styles.detail}>Category: {item.category}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Icon
              name="checkbox-marked-circle-outline"
              size={22}
              color="#000"
            />
            <Text style={styles.detail}>Status: {item.status}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailAmount}>${item.amount}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width * 1,
    height: height * 0.4,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width,
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  editIcon: {
    position: 'absolute',
    top: width * -0.07,
    left: width * -0.05,
  },
  deleteIcon: {
    position: 'absolute',
    top: width * -0.07,
    right: width * -0.02,
  },
  flexGrowContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: primaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.5,
    elevation: 10,
    shadowColor: '#000',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: fontTitle,
    marginBottom: 10,

    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fontSubtitle,
    color: '#666',
    maxWidth: width,
    textAlign: 'left',
  },
  hr: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  detail: {
    marginBottom: 5,
    color: '#000',
    fontFamily: fontSubtitleBold,
    fontSize: 12,
    marginLeft: 5,
  },
  detailAmount: {
    marginBottom: 5,
    color: '#000',
    fontFamily: fontTitle,
    fontSize: 16,
    marginLeft: 5,
    letterSpacing: 1,
  },
});

export default ItemDetailsScreen;
