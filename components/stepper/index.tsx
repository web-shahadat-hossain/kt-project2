import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { verticalScale } from '@/utils/metrices';

type stepperProps = {
  active: number;
  steps: number;
};

const Stepper = ({ active, steps }: stepperProps) => {
  return (
    <View>
      <Text style={styles.heading}>
        Question {active + 1}/{steps}
      </Text>
      <View style={styles.container}>
        {Array(steps)
          .fill(0)
          .map((item, index) => (
            <View
              style={active < index ? styles.activeStep : styles.step}
              key={index}
            />
          ))}
      </View>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 4,
  },
  activeStep: {
    flex: 1,
    height: 4,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 24,
    backgroundColor: '#387ADE',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: verticalScale(4),
  },
});
