import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import PrimaryButton from '@/components/common/PrimaryButton';
import Header from '@/components/header';

const PayMethod = () => {
  const [selected, setSelected] = useState('Bank Transfer');

  const options = ['Digital Wallet', 'Bank Transfer', 'Credit/Debit Card'];

  return (
    <ContentWrapper>
      <Header heading={'Payment'} showLeft />

      <View style={styles.container}>
        <Text style={styles.containerText}>
          Repellat vitae autem adipisci! Maiores aperiam porro similique! In
          enim expedita quos atque, inventore dolorem reiciendis, aperiam,
          numquam temporibus nemo eveniet! Quae blanditiis rem modi tempora
          atque repellendus quam voluptates perspiciatis quo explicabo?
        </Text>
        {/* method */}
        <View style={styles.container1}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionContainer,
                selected === option && styles.selectedOption,
              ]}
              onPress={() => setSelected(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
              <View style={styles.radioCircle}>
                {selected === option && <View style={styles.selectedCircle} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          style={styles.button}
          textStyle={{ color: Colors.white }}
          onPress={() => router.push('/payment/paymentDone')}
          text={'Continue to get course'}
          isOutlined
          renderIcon={() => (
            <Feather name="arrow-right" size={24} color={'white'} />
          )}
        />
      </View>
    </ContentWrapper>
  );
};

export default PayMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  containerText: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 10,
  },
  button: {
    marginTop: 180,
    padding: 10,
    backgroundColor: Colors.primary,
  },

  container1: {
    padding: 20,
    marginTop: 50,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});
