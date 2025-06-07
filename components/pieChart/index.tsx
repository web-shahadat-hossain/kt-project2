import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import React from 'react';

const PieChartBox = ({ data }) => {
  const pieData = [
    {
      value: Number(data?.ongoing),
      color: '#FBBF24',
      strokeWidth: 3,
      strokeColor: 'white',
    },
    { value: Number(data?.completed), color: '#387ADE' },
    { value: data?.ongoing - data?.completed, color: '#fff' },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        donut
        showText
        radius={50}
        innerRadius={40}
        data={pieData}
        curvedEndEdges
        curvedStartEdges
      />
      <View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#387ADE' }]} />
            <Text>Completed</Text>
          </View>
          <Text style={styles.percent}>{data?.completed}</Text>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#FBBF24' }]} />
            <Text>On going</Text>
          </View>
          <Text style={styles.percent}>{data?.ongoing}</Text>
        </View>
      </View>
    </View>
  );
};

export default PieChartBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5, // Makes it a circle
    marginRight: 5,
  },
  percent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
    marginLeft: 12,
    marginTop: 5,
  },
});
