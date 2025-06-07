import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

interface DateInputProps {
  onChange?: (date: Date) => void;
  dateValue?: string | Date;
  label?: string;
  error?: string;
  showIcon?: boolean;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  onChange = () => {},
  dateValue,
  label = 'Select Date',
  error = '',
  showIcon = true,
  required = true,
}) => {
  const [getDate, setGetDate] = useState<Date>(
    dateValue ? new Date(dateValue) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    onChange(getDate);
  }, [getDate]);

  return (
    <View>
      {label && (
        <Text style={styles.labelStyle}>
          {label} <Text style={styles.required}>{required && '*'}</Text>
        </Text>
      )}
      <View style={styles.container}>
        <Text style={styles.text}>{moment(getDate).format('L')}</Text>
        {showIcon && (
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateIcon}
          >
            {<Ionicons name="calendar-clear-outline" size={24} />}
          </TouchableOpacity>
        )}
      </View>
      {showPicker && (
        <DateTimePicker
          onChange={(event, selectedDate) => {
            setShowPicker(false); // Hide picker after selection
            if (selectedDate) {
              console.log(selectedDate);
              setGetDate(selectedDate);
            }
          }}
          value={getDate}
          mode="date"
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    borderColor: '#DADADA',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  text: { color: '#000' },
  labelStyle: {
    color: '#000',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '400',
    paddingTop: 20,
    fontFamily: 'Poppins',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  required: {
    color: 'black',
  },
});
