import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {format, parseISO} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  fontSubtitle,
  fontTextLigth,
  fontTitle,
  height,
  primaryColor,
  secondaryColor,
  secondaryColorLigth,
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
    <View style={styles.container}>
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
            <AntDesign name="calendar" size={22} color="#000" />
            <Text style={styles.detail}>Created At: {dayOfWeek}</Text>
          </View>
          <View style={styles.detailsRow}>
            <AntDesign name="inbox" size={22} color="#000" />
            <Text style={styles.detail}>Quantity: {item.quantity}</Text>
          </View>
          <View style={styles.detailsRow}>
            <AntDesign name="tagso" size={22} color="#000" />
            <Text style={styles.detail}>Category: {item.category}</Text>
          </View>
          <View style={styles.detailsRow}>
            <AntDesign
              name="checkcircleo"
              size={20}
              color="#000"
            />
            <Text style={styles.detail}>Status: {item.status}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailAmount}>${item.amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.5,
    elevation: 10,
    shadowColor: '#000',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fontTitle,
    marginBottom: 10,
    color: secondaryColor,
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
    borderBottomColor: secondaryColorLigth,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  detail: {
    marginBottom: 5,
    color: '#000',
    fontFamily: fontTextLigth,
    fontSize: 12,
    marginLeft: 5,
  },
  detailAmount: {
    marginBottom: 5,
    color: 'rgba(0,0,0,0.8)',
    fontFamily: fontTitle,
    fontSize: 14,
    marginLeft: 5,
    letterSpacing: 1,
  },
});

export default ItemDetailsScreen;
