import { StyleSheet, Text, View } from 'react-native';
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
import { login } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link, router } from 'expo-router';
import { setItem } from '@/utils/asyncStorage';
import asyncStorageConstants from '@/utils/asyncStorageConstants';
import Toast from 'react-native-toast-message';

const schema = yup.object({
  mobile: yup
    .string()
    .required('Mobile Number is required')
    .test('Must be a valid mobile number', (value) => {
      const mobileRegex = /^[0-9]{10}$/; // Mobile number regex (10 digits)
      return mobileRegex.test(value); // Valid if matches either
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState(true);
  const [loginActive, setLoginActive] = useState(true); // Track active button

  const handleLoginPress = () => {
    setLoginActive(true);
  };

  const handleSignupPress = () => {
    setLoginActive(false);
    router.push('/signup');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { postQuery, loading } = usePostQuery();

  // login Api call
  const onSubmit = async (data: any) => {
    postQuery({
      url: apiUrls.signIn,
      onSuccess: (res: any) => {
        // const { accessToken, refreshToken, ...rest } = res.data;
        setItem(asyncStorageConstants.user, JSON.stringify(res.data));
        setItem(
          asyncStorageConstants.accessToken,
          JSON.stringify(res.data.accessToken)
        );

        dispatch(login(res.data));
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
        });
        router.push('/(tabs)');
      },
      onFail: (err: any) => {
        Toast.show({
          type: 'error',
          text1: err.message || 'Invalid Credentials',
        });
        console.log(err);
      },
      postData: { ...data, fcmToken: 'ABC' },
    });
  };

  return (
    <ContentWrapper>
      {/* <Loader visible={loading} /> */}
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
              isOutlined
              style={[
                styles.button,
                loginActive ? styles.activeButton : styles.inactiveButton,
              ]}
              textStyle={loginActive ? styles.activeText : styles.inactiveText} // Style text
              text={'Login'}
              onPress={() => {
                handleLoginPress();
                handleSubmit(onSubmit);
              }} // Call both functions
            />

            <PrimaryButton
              style={[
                styles.button,
                !loginActive ? styles.activeButton : styles.inactiveButton,
              ]}
              textStyle={!loginActive ? styles.activeText : styles.inactiveText} // Style text
              text={'SignUp'}
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
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleInput
                onChangeText={onChange}
                value={value}
                isPassword={isPassword}
                renderLeft={() => (
                  <Feather name="lock" size={24} color={Colors.placeholder} />
                )}
                renderRight={() =>
                  isPassword ? (
                    <Feather
                      onPress={() => setIsPassword(false)}
                      name="eye"
                      size={24}
                      color={Colors.placeholder}
                    />
                  ) : (
                    <Feather
                      onPress={() => setIsPassword(true)}
                      name="eye-off"
                      size={24}
                      color={Colors.placeholder}
                    />
                  )
                }
                label="Enter Password"
                placeholder="******"
                errorMessage={errors.password && errors.password.message}
              />
            )}
            name="password"
          />

          <Link href="/forgetPassword" style={styles.forgotText}>
            Forgot Password ?
          </Link>
        </View>
        <View>
          <PrimaryButton
            text={'Login'}
            isOutlined
            onPress={handleSubmit(onSubmit)}
          />
          <Text style={styles.acountText}>
            Don't have an account?{' '}
            <Link
              style={{
                color: '#0F172A',
                fontSize: 14,
                fontWeight: '700',
              }}
              href={'/signup'}
            >
              Sign up
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

export default LoginPage;

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

    color: Colors.white,
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
