import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from '../checkbox';
import { verticalScale } from '@/utils/metrices';

type questionCardProps = {
  questionId: string;
  questionHeading: string;
  options: any[];
  onChange: (value: any) => any;
};

const QuestionCard = ({
  questionId,
  questionHeading,
  options,
  onChange,
}: questionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (selectedOption) {
      onChange({
        questionId: questionId,
        selectedAnswer: selectedOption,
      });
    }
  }, [selectedOption]);

  return (
    <View>
      <Text style={styles.questionHeading}>{questionHeading}</Text>
      <View>
        {options.map((option, index) => (
          <CheckBox
            key={index}
            label={option.option}
            value={option?._id}
            onChange={(value) => setSelectedOption(value)}
            checked={option?._id === selectedOption}
          />
        ))}
      </View>
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  questionHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(20),
  },
});
