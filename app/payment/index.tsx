import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import ContentWrapper from '@/components/contentwrapper';
import { verticalScale } from '@/utils/metrices';
import PrimaryButton from '@/components/common/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/header';
// import { WebView } from 'react-native-webview';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';
import Toast from 'react-native-toast-message';
import ReferModal from '@/components/referModal';
import TermsModal from '@/components/termsModal';
// import Loader from '@/components/loader';

const plans = [
  {
    id: 1,
    title: 'Premium',
    price: '₹ 2,499.00',
    oldPrice: '₹ 2,499.00',
    features: [
      'Full Access available into this premium',
      'Get Other activities & more.',
      'Unlimited Quiz benefits.',
    ],
    tag: 'MOST POPULAR',
    tagColor: '#007bff',
  },
  {
    id: 2,
    title: 'Premium Plus',
    price: '₹ 2,499.00',
    oldPrice: '₹ 2,499.00',
    features: [
      'Full Access available into this premium',
      'Get Other activities & more.',
      'Unlimited Quiz benefits.',
    ],
    tag: 'THE MOST POPULAR',
    tagColor: '#dc3545',
  },
];

const PaymentScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);

  // const [checkoutUrl, setCheckoutUrl] = useState(null);
  const { courseId } = useLocalSearchParams();
  const { postQuery, loading } = usePostQuery();
  const [referCode, setReferCode] = useState('');

  // Function to handle course enrollment
  const enrollCourse = () => {
    postQuery({
      url: apiUrls.course.enrollCourse,
      postData: { courseId: courseId, referCode: referCode ? referCode : '' },
      onSuccess: (res) => {
        console.log('API Response:', res);
        if (res.data.url) {
          router.push({
            pathname: '/blankPage',
            params: {
              checkoutUrl: res.data.url,
              redirectPath: '/(tabs)',
            },
          });
        } else {
          Toast.show({
            type: 'success',
            text1: res.message || 'Course enrolled Successfully',
          });
        }
      },
      onFail: (err) => {
        console.error('Error enrolling course:', err);
        alert('Course already enrolled!!');
      },
    });
  };

  const handleProceedToPayment = () => {
    setVisibleModal(false);
    enrollCourse();
  };

  // if (checkoutUrl) {
  //   return (
  //     <>
  //       <Loader visible={loading} />
  //       <WebView source={{ uri: checkoutUrl }} style={{ flex: 1 }} />
  //     </>
  //   );
  // }

  const [visibleModal, setVisibleModal] = useState(false);
  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  return (
    <ContentWrapper>
      <TermsModal />
      <ReferModal
        onSkip={() => {
          setVisibleModal(false);
          handleProceedToPayment();
        }}
        visible={visibleModal}
        onClose={handleCloseModal}
        onSubmit={handleProceedToPayment}
        setReferCode={(value) => setReferCode(value)}
        referCode={referCode}
      />

      <Header heading={'Payment'} showLeft />
      <View style={styles.container}>
        <Text style={styles.header}>
          Choose your Course with knowledge Temple
        </Text>

        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            <View style={[styles.tag, { backgroundColor: plan.tagColor }]}>
              <Text style={styles.tagText}>{plan.tag}</Text>
            </View>

            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              {selectedPlan === plan.id && (
                <FontAwesome name="check-circle" size={20} color="#387ade" />
              )}
            </View>

            {plan.features.map((feature, index) => (
              <Text key={index} style={styles.feature}>
                • {feature}
              </Text>
            ))}

            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>{plan.oldPrice}</Text>
              <Text style={styles.price}>{plan.price}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <PrimaryButton
          // onPress={() => router.push('/payment/paymentDesc')}
          onPress={() => setVisibleModal(true)}
          text={'Proceed to Payment'}
          isOutlined
          style={styles.continueButton}
          renderIcon={() => (
            <Feather name="arrow-right" size={24} color={'white'} />
          )}
        />
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: verticalScale(10),
  },
  planCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.placeholder,
    marginTop: 15,
  },
  selectedCard: {
    borderColor: Colors.primary,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tag: {
    position: 'absolute',
    top: -10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  tagText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  feature: {
    fontSize: 15,
    color: Colors.gray,
    marginTop: 5,
    fontWeight: '400',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: Colors.gray,
    fontSize: 14,
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 80,
  },
  continueText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
