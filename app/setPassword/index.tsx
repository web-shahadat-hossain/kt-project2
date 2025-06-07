import PrimaryButton from '@/components/common/PrimaryButton';
import ContentWrapper from '@/components/contentwrapper';
import SimpleInput from '@/components/simpleInput';
import { Feather } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '@/utils/metrices';
import { Controller, useForm } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';
import Toast from 'react-native-toast-message';
import Loader from '@/components/loader';
import { setItem } from '@/utils/asyncStorage';
import asyncStorageConstants from '@/utils/asyncStorageConstants';
import { login } from '@/redux/slices/userSlice';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const setPassword = () => {
  const [isPassword, setIsPassword] = useState(true);
  const { mobile, verifyId, route } = useLocalSearchParams();
  const dispatch = useDispatch();
  // console.log(params);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { postQuery, loading } = usePostQuery();

  const onCreatePassword = (data) => {
    const postData = {
      password: data.password,
      mobile,
      verifyId,
      fcmToken: 'Test',
    };

    postQuery({
      url: apiUrls.signup.createPassword,
      postData,
      onSuccess: (res: any) => {
        setItem(asyncStorageConstants.user, JSON.stringify(res.data));
        setItem(
          asyncStorageConstants.accessToken,
          JSON.stringify(res.data.accessToken)
        );
        // dispatch(login(res.data));
        console.log('Response.....>>>:', res);
        if (route === 'signup') {
          router.push('/accountSetup');
        } else {
          router.push('/login');
        }
        Toast.show({
          type: 'success',
          text1: 'Password Created Successfully',
        });
        // if (res.success) {
        //   saveToStorage(storageConstants.USER, res.data);
        //   saveToStorage(storageConstants.ACCESS_TOKEN, res.token);
        //   dispatch(login(res));
        //   Toast.show({
        //     type: 'success',
        //     text1: 'Password Created Successfully',
        //   });
        // } else {
        //   Toast.show({
        //     type: 'error',
        //     text1: res.message,
        //   });
        // }
      },
      onFail: (err: any) => {
        console.log('Error response:', err); // Log API error
        Toast.show({
          type: 'error',
          text1: err?.message || 'Something went wrong',
          text1Style: {
            width: '80%',
            wordWrap: 'wrap',
          },
        });
      },
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
            <View>
              <Text style={styles.title}>Create Password</Text>
              <Text style={styles.subtitle}>
                Please input the 6-digit code we sent you via text at {mobile}{' '}
                <Link href="/signup" style={styles.loginText}>
                  Edit Number?
                </Link>
              </Text>
            </View>
            {/* <View style={styles.otpContainer}> */}
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
            {/* </View> */}
            <View style={styles.buttonContainer}>
              <PrimaryButton
                text={'Login'}
                isOutlined
                onPress={handleSubmit(onCreatePassword)}
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
        </View>
      </View>
    </ContentWrapper>
  );
};

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
  acountText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: verticalScale(14),
    color: Colors.gray,
    marginTop: verticalScale(8),
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    marginTop: verticalScale(45),
    backgroundColor: 'transparent',
    borderColor: 'none',
    // cursor: pointer
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
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFF',
  },
  timer: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  verifyText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    marginTop: verticalScale(300),
  },
});

export default setPassword;
