import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import PrimaryButton from '@/components/common/PrimaryButton';

const PaymentDone = () => {
  return (
    <ContentWrapper>
      <Header heading={'Payment Successfully'} showLeft />

      {/* Container */}
      <View style={styles.container}>
        <Feather
          style={styles.containerText}
          name="check"
          size={100}
          color={Colors.black}
        />
        <PrimaryButton
          style={styles.button}
          textStyle={{ color: Colors.white }}
          onPress={() => router.push('/(tabs)')}
          text={'Successfully'}
          isOutlined
          renderIcon={() => (
            <Feather name="arrow-right" size={24} color={'white'} />
          )}
        />
      </View>
    </ContentWrapper>
  );
};

export default PaymentDone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    backgroundColor: Colors.placeholder,
    padding: 10,
    borderRadius: 100,
  },
  button: {
    marginTop: 280,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
