import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import EditItem from './components/editModal';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.detail}>Quantity: {item.quantity}</Text>
      <Text style={styles.detail}>Category: {item.category}</Text>
      <Text style={styles.detail}>Amount: ${item.amount}</Text>
      <Text style={styles.detail}>Status: {item.status}</Text>
      <Text style={styles.detail}>Created At: {item.createdAt}</Text>
      <Text style={styles.detail}>Updated At: {item.updatedAt}</Text>
      <EditItem item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ItemDetailsScreen;
