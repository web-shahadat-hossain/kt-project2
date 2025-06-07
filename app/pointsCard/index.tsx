import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Header from '@/components/header';

export default function PointsCard() {
  return (
    <ContentWrapper>
      <View style={styles.container}>
        <Header heading={'Wallet'} showLeft />

        {/* card */}
        <View style={styles.card}>
          <Text style={styles.title}>Knowledge Temple Points</Text>
          <Text style={styles.pointsLabel}>Points</Text>
          <Text style={styles.points}>2,462.00</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => router.push('/payment/paymentMethod')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => router.push('/studyMaterial')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  headerRow: {
    flexDirection: 'row',
    gap: 60,
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  courseHeading: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    // elevation: 4,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderColor: Colors.primary,
  },
  title: {
    fontSize: 16,
    color: Colors.placeholder,
    marginBottom: 10,
  },
  pointsLabel: {
    fontSize: 14,
    color: Colors.black,
  },
  points: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 39,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
