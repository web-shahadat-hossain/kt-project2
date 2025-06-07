import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import SimpleInput from '@/components/simpleInput';
import usePostQuery from '@/hooks/post-query.hook';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { apiUrls } from '@/apis/apis';
import PrimaryButton from '@/components/common/PrimaryButton';
import RazorpayCheckout from 'react-native-razorpay';
import { router } from 'expo-router';
import { verticalScale } from '@/utils/metrices';

const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const { postQuery, loading } = usePostQuery();
  const { user } = useSelector((state) => state.user);

  const handleDeposit = () => {
    if (!depositAmount) {
      Toast.show({
        type: 'error',
        text1: 'Deposit amount is required',
      });
    }
    postQuery({
      url: apiUrls.wallet.deposit,
      onSuccess: (res: any) => {
        console.log('=============sfjdfsdjfljsdfl', res.data.url);

        // let modifiedUrl = `http://192.168.0.110:80/checkout?receiptId=receipt_${res.data.url.slice(
        //   -8
        // )}`;

        var options = {
          description: 'Deposit amount',
          currency: 'INR',
          key: 'rzp_test_DzxQCFptTAfM0r',
          amount: res.data.amount,
          name: 'Deposit',
          order_id: res.data.id,
        };
        router.push({
          pathname: '/blankPage',
          params: {
            checkoutUrl: res.data.url,
            redirectPath: '/wallet',
            // checkoutUrl: modifiedUrl,
          },
        });
      },
      onFail: (err) => {
        console.log('=============sfjdfsdjfljsdfl', err);
      },
      postData: {
        amount: depositAmount,
        userId: user?._id,
      },
    });
  };

  return (
    <ContentWrapper>
      <Header heading={'Deposit'} showLeft />
      <View style={styles.container}>
        <SimpleInput
          label="Deposit Amount"
          keyboardType="numeric"
          onChangeText={(value) => setDepositAmount(value)}
        />

        <PrimaryButton text={'Deposit'} onPress={handleDeposit} isOutlined />
      </View>
    </ContentWrapper>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: verticalScale(150),
  },
});
