import PrimaryButton from '@/components/common/PrimaryButton';
import ContentWrapper from '@/components/contentwrapper';
import { Colors } from '@/constants/Colors';
import { moderateScale, verticalScale } from '@/utils/metrices';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import usePostQuery from '@/hooks/post-query.hook';
import Toast from 'react-native-toast-message';
import { apiUrls } from '@/apis/apis';
import { useLocalSearchParams } from 'expo-router';
import Loader from '@/components/loader';

export default function OTPVerification(): JSX.Element {
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const { postQuery, loading } = usePostQuery();
  const { mobile, route } = useLocalSearchParams();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // verify Otp

  const handleVerify = () => {
    if (otp.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid 6-digit OTP',
      });
      return;
    }

    if (!mobile) {
      Toast.show({
        type: 'error',
        text1: 'Mobile number is missing.',
      });
      return;
    }

    console.log('Verifying OTP for:', mobile, otp);

    postQuery({
      url: apiUrls.signup.verifyOtp,
      onSuccess: (res: any) => {
        console.log('Full server response:', res);

        if (
          res.statusCode === 200 ||
          res.message === 'OTP verified successfully' ||
          res.message === 'OTP verified successfully.'
        ) {
          Toast.show({
            type: 'success',
            text1: 'OTP Verified Successfully',
          });
          router.push({
            pathname: '/setPassword',
            params: {
              mobile,
              verifyId: res.data.verifyId,
              route,
            },
          });
        } else {
          console.error('OTP Verification failed on server:', res);
          Toast.show({
            type: 'error',
            text1: res.message || 'OTP Verification Failed',
          });
        }
      },
      onFail: (err: any) => {
        console.error('Verification error:', err.response || err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'OTP Verification Failed. Please try again.';
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      },
      postData: { mobile: mobile, otp: otp },
    });
  };

  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <Feather
              name="arrow-left"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Verify phone number</Text>
            <Text style={styles.subtitle}>
              Please enter the 6-digit code sent to {mobile}{' '}
              <Link href="/signup" style={styles.loginText}>
                Edit Number?
              </Link>
            </Text>
            <View style={styles.otpContainer}>
              <OtpInput
                numberOfDigits={6}
                onTextChange={setOtp}
                placeholder="******"
                type="numeric"
              />
            </View>
            <Text style={styles.timer}>
              Didn't receive it?{' '}
              {timer > 0 ? `0:${timer.toString().padStart(2, '0')}` : 'Resend'}
            </Text>
          </View>
        </View>

        <PrimaryButton text={'Verify'} isOutlined onPress={handleVerify} />

        <Text style={styles.acountText}>
          Don't have an account?{' '}
          <Link style={styles.loginText} href={'/signup'}>
            Sign up
          </Link>
        </Text>
      </View>
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(9),
    paddingTop: moderateScale(24),
  },
  content: {
    marginTop: verticalScale(120),
  },
  header: {
    width: '100%',
    paddingVertical: moderateScale(23),
    paddingHorizontal: moderateScale(9),
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    marginTop: verticalScale(45),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#64748B',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  acountText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.gray,
  },
  loginText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
