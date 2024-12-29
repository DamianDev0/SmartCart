/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import useShoppingStatistics from '../hooks/useStatsStatus';
import {fontSubtitleBold, fontTextLigth, fontTitle} from '../../../utils/styles';
import {useFocusEffect} from '@react-navigation/native';

const StatusChart = () => {
  const {statistics, loading, error, fetchStatistics} = useShoppingStatistics();

  useFocusEffect(
    useCallback(() => {
      fetchStatistics();
    }, [fetchStatistics]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const purchased = statistics?.purchased ?? 0;
  const pending = statistics?.pending ?? 0;

  const pieData = [
    {
      value: purchased,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {
      value: pending,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
    },
  ];

  const renderDot = (color: string) => {
    return <View style={[styles.dot, {backgroundColor: color}]} />;
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            {renderDot('#006DFF')}
            <Text style={styles.legendText}>Purchased: {purchased}</Text>
          </View>
          <View style={styles.legendItem}>
            {renderDot('#93FCF8')}
            <Text style={styles.legendText}>Pending: {pending}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Item Status</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={100}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelText}>
                  {((purchased / (purchased + pending || 1)) * 100).toFixed(1)}%
                </Text>
                <Text style={styles.centerLabelSubText}>Purchased</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontFamily: fontTitle,
  },
  chartContainer: {
    padding: 20,
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 13,
    color: 'white',
    fontFamily: fontTitle,
  },
  centerLabelSubText: {
    fontSize: 14,
    color: 'white',
    fontFamily: fontTextLigth,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    marginRight: 20,
    fontFamily: fontTextLigth,
  },
  legendText: {
    color: 'white',
    fontFamily: fontTextLigth,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: fontSubtitleBold
  },
  container: {
    paddingVertical: 100,
    backgroundColor: '#34448B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatusChart;
