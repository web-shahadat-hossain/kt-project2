import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

interface DropdownPickerProps {
  label?: string;
  selectedValue?: string | string[];
  itemsValue?: string[];
  onValueChange: (itemValue: any) => void;
  options: { label: string; value: string }[];
  containerStyle?: ViewStyle;
  pickerContainer?: PickerProps;
  multi?: boolean;
}

const DropdownPicker = ({
  label,
  selectedValue,
  onValueChange,
  options,
  containerStyle,
  multi = false,
  pickerContainer,
  itemsValue,
}: DropdownPickerProps) => {
  const [selected, setSelected] = useState(selectedValue || '');
  const [items, setItems] = useState<string[]>(itemsValue || []);

  useEffect(() => {
    if (multi) {
      onValueChange(items);
    } else {
      onValueChange(selected);
    }
  }, [selected, items]);

  const handleSelect = (value: string) => {
    setItems((prev) => [...prev, value]);
  };

  const handleRemoveItem = (value: string) => {
    const newValue = items.filter((item) => item !== value);
    setItems(newValue);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selected}
          onBlur={(value) => console.log(value)}
          onValueChange={!multi ? setSelected : handleSelect}
          style={[styles.picker, pickerContainer]}
        >
          {options.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      {multi && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 8,
            marginTop: 8,
            flexWrap: 'wrap',
          }}
        >
          {items.map((item, index) => (
            <View
              key={index}
              style={{
                borderColor: '#E2E8F0',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 24,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#64748B',
                }}
              >
                {options.find((option) => option.value === item)?.label}
              </Text>
              <AntDesign
                onPress={() => handleRemoveItem(item)}
                name="close"
                size={16}
                color={'#64748B'}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  picker: {
    height: 50,
    color: '#000',
  },
});

export default DropdownPicker;
