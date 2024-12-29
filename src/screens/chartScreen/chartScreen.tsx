import React from 'react';
import {StyleSheet, View} from 'react-native';
import StatusChart from './components/statusChart';
import {primaryColor} from '../../utils/styles';
import DaysBar from './components/daysBar';

const ChartScreen = () => {
  return (
    <View style={styles.container}>
      <StatusChart />
      <DaysBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
});

export default ChartScreen;
