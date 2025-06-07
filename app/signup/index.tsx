import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/utils/metrices';
import { Colors } from '@/constants/Colors';
import SimpleInput from '@/components/simpleInput';
import PrimaryButton from '@/components/common/PrimaryButton';
// import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';
import Loader from '@/components/loader';
import Toast from 'react-native-toast-message';
import { Link, router, useNavigation } from 'expo-router';

const schema = yup.object({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .min(10, 'Mobile number must be at least 8 characters'),
});

const SignUpPage = () => {
  // const dispatch = useDispatch();
  const [loginActive, setLoginActive] = useState(false);

  const handleLoginPress = () => {
    setLoginActive(true);
    router.push('/login');
  };

  const handleSignupPress = () => {
    setLoginActive(false);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { postQuery, loading } = usePostQuery();

  // get Otp Api call
  const onGetOtp = (data: any) => {
    postQuery({
      url: apiUrls.signup.getOtp,
      onSuccess: (res: any) => {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent Successfully',
        });

        // router.push('/otp');
        router.push({
          pathname: '/otp',
          params: { mobile: data.mobile, route: 'signup' },
        });
      },
      onFail: (err: any) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Failed to send OTP. Please try again.',
        });
      },
      postData: { mobile: data.mobile },
    });
  };

  return (
    <ContentWrapper>
      <Loader visible={loading} />
      {/* <Image source={images.loginBg} style={styles.loginBg} /> */}
      <View style={styles.container}>
        <View style={styles.loginForm}>
          <Text style={styles.formHeading}>Knowledge Temple</Text>
          <Text style={styles.description}>
            Personalized, Affordable, and Accessible Education at Your
            Fingertips!"
          </Text>

          <View style={styles.btnContainer}>
            <PrimaryButton
              style={[
                styles.button,
                loginActive ? styles.activeButton : styles.inactiveButton,
              ]}
              textStyle={loginActive ? styles.activeText : styles.inactiveText}
              text={'Login'}
              onPress={handleLoginPress}
            />

            <PrimaryButton
              isOutlined
              style={[
                styles.button,
                !loginActive ? styles.activeButton : styles.inactiveButton,
              ]}
              textStyle={!loginActive ? styles.activeText : styles.inactiveText}
              text={'Signup'}
              onPress={handleSignupPress}
            />
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleInput
                // onChangeText={onChange}
                onChangeText={(text) => onChange(text.toLowerCase())}
                value={value}
                renderLeft={() => (
                  <Feather name="phone" size={24} color={Colors.placeholder} />
                )}
                placeholder="your phone number"
                label="Mobile number"
                errorMessage={errors.mobile && errors.mobile.message}
              />
            )}
            name="mobile"
          />
        </View>
        <View>
          <PrimaryButton
            text={'Next'}
            isOutlined
            onPress={handleSubmit(onGetOtp)}
          />
          <Text style={styles.acountText}>
            Have an account?{' '}
            <Link
              style={{
                color: '#0F172A',
                fontSize: 14,
                fontWeight: '700',
              }}
              href={'/login'}
            >
              Login
            </Link>
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#94A3B8',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            By continuing, you agree to our{' '}
            <Link
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#0F172A',
              }}
              href={'/'}
            >
              Terms & service
            </Link>{' '}
            and {`\n`}
            <Link
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#0F172A',
              }}
              href={'/'}
            >
              Privacy policy.
            </Link>
          </Text>
        </View>
      </View>
    </ContentWrapper>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  loginBg: {
    width: '100%',
    height: verticalScale(226),
    objectFit: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(9),
    paddingTop: moderateScale(24),
  },
  loginForm: {
    width: '100%',
    paddingVertical: moderateScale(23),
    paddingHorizontal: moderateScale(9),
  },
  formHeading: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: verticalScale(22),
    color: '#0F172A',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: verticalScale(22),
    color: '#94A3B8',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    marginBottom: verticalScale(48),
  },
  button: {
    width: horizontalScale(69),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#0F172A',
    borderColor: 'transparent',
  },
  inactiveButton: {
    backgroundColor: 'transparent',
    borderColor: '#0F172A',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: '#0F172A',
  },
  forgotText: {
    textAlign: 'right',
    marginBottom: verticalScale(47),
    color: Colors.primary,
  },
  acountText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: verticalScale(14),
    color: Colors.gray,
    marginTop: verticalScale(8),
  },
});
