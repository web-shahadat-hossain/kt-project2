import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/utils/metrices';

type checkboxProps = {
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  value: string;
};

const CheckBox = ({ checked, onChange, label, value }: checkboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(value)}
      style={[
        styles.section,
        checked && {
          borderColor: '#387ADE',
        },
      ]}
    >
      <View
        style={[
          styles.checkBox,
          checked && {
            borderColor: '#387ADE',
          },
        ]}
      >
        {checked && <View style={styles.active}></View>}
      </View>
      <Text
        style={[
          styles.paragraph,
          checked && {
            color: '#387ADE',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(48),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(8),
    columnGap: 8,
  },
  checkBox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#64748B',
    padding: 2,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94A3B8',
  },
  active: {
    width: '100%',
    height: '100%',
    backgroundColor: '#387ADE',
    borderRadius: '50%',
  },
});
