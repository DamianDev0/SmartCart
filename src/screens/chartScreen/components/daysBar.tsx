import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {format, eachDayOfInterval, subDays} from 'date-fns';
import useItemsByDay from '../hooks/useDaysBar';
import {fontSubtitleBold, fontTitle, width} from '../../../utils/styles';
import {useFocusEffect} from '@react-navigation/native';

const DaysBar = () => {
  const {itemsByDay, loading, error, fetchItemsByDay} = useItemsByDay();

  useFocusEffect(
    useCallback(() => {
      fetchItemsByDay();
    }, [fetchItemsByDay]),
  );
  const processChartData = (items: any[]) => {
    const groupedByDay = items.reduce((acc, item) => {
      const dayKey = format(new Date(item.date), 'yyyy-MM-dd');
      acc[dayKey] = (acc[dayKey] || 0) + item.count;
      return acc;
    }, {});

    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return days.map(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      return {
        label: format(day, 'E')[0],
        value: groupedByDay[dayKey] || 0,
        frontColor: groupedByDay[dayKey] ? '#006DFF' : '#E0E0E0',
      };
    });
  };

  const chartData = itemsByDay ? processChartData(itemsByDay) : [];

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Purchases</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          barWidth={27}
          barBorderRadius={6}
          spacing={12}
          initialSpacing={10}
          yAxisColor={'lightgray'}
          xAxisColor={'lightgray'}
          yAxisTextStyle={styles.yAxisLabelTextStyle}
          stepValue={2}
          maxValue={10}
          noOfSections={10}
          yAxisLabelTexts={['0', '2', '4', '6', '8', '10']}
          labelWidth={10}
          xAxisLabelTextStyle={styles.xAxisLabelTextStyle}
          showLine
          dashGap={15}
          stepHeight={40}
          lineConfig={{
            color: '#F29C6E',
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 40,
            initialSpacing: -30,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#232B5D',
    width: width * 0.9,
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontFamily: fontTitle,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chartContainer: {
    padding: 10,
    alignItems: 'center',
    width: width * 0.9,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  xAxisLabelTextStyle: {
    color: '#FFF',
    textAlign: 'right',
    fontSize: 9,
    fontFamily: fontTitle,
  },
  yAxisLabelTextStyle: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: fontSubtitleBold,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: fontSubtitleBold,
  },
});

export default DaysBar;
