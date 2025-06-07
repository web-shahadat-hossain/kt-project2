import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { verticalScale } from '@/utils/metrices';

type viewProp = {
  style?: ViewStyle;
};

const DashDivider = ({ style }: viewProp) => {
  return <View style={[styles.divider, style]} />;
};

export default DashDivider;

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
    borderColor: '#D1D1D6',
    borderStyle: 'dashed',
    marginVertical: verticalScale(9),
  },
});
