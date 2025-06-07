import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import PrimaryButton from '@/components/common/PrimaryButton';
import Header from '@/components/header';

const PaymentDesc = () => {
  return (
    <ContentWrapper>
      <Header heading={'Payment'} showLeft />

      {/* Container */}
      <View style={styles.container}>
        <Text style={styles.heading}>Here you will get..!</Text>
        <Text style={styles.subHeading}>This specialization includes:</Text>
        <View style={styles.containerText}>
          <Text style={styles.text}>. Unlimited access to all 0 courses</Text>
          <Text style={styles.text}>. Emi payment option</Text>
          <Text style={styles.text}>
            . Shareable certificate on completion from
          </Text>
          <Text style={styles.text}>. 14 Day refund period</Text>
        </View>
        <Text style={styles.subHeading}>How much time do you need finish?</Text>

        {/* Duration */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>3</Text>
            <Text style={styles.categoryText}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>6</Text>
            <Text style={styles.categoryText}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>12</Text>
            <Text style={styles.categoryText}>Month</Text>
          </TouchableOpacity>
        </View>

        {/* Estimated */}
        <View style={styles.estimatedContainer}>
          <Text style={styles.estimated}>ESTIMATED STUDY TIME</Text>
          <View style={styles.timeContainer}>
            <View style={styles.estimatedText}>
              <Text style={styles.estimated1}> 14 </Text>
              <Text style={styles.text2}>hours/week</Text>
            </View>

            <View>
              <View style={styles.estimatedText}>
                <Text style={styles.estimated1}>$70</Text>
                <Text style={styles.text2}> /month</Text>
              </View>
              <Text style={styles.text2}> Total $300</Text>
            </View>
          </View>
        </View>
        {/* Button */}
        <PrimaryButton
          style={styles.button}
          textStyle={{ color: Colors.white }}
          onPress={() => router.push('/pointsCard')}
          text={'Proceed to Pay'}
          isOutlined
          renderIcon={() => (
            <Feather name="arrow-right" size={24} color={'white'} />
          )}
        />
      </View>
    </ContentWrapper>
  );
};

export default PaymentDesc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 10,
  },
  containerText: {
    gap: 5,
    marginTop: 10,
    margin: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },

  categories: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    margin: 15,
  },
  category: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginRight: 5,
    borderColor: Colors.placeholder,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '600',
  },
  estimatedContainer: {
    backgroundColor: Colors.placeholder,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    marginTop: 20,
  },
  estimated: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    // margin: 15,
  },
  estimated1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  estimatedText: {
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
  },
  text2: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 120,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
