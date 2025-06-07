import PrimaryButton from '@/components/common/PrimaryButton';
import ContentWrapper from '@/components/contentwrapper';
import SimpleInput from '@/components/simpleInput';
import { Colors } from '@/constants/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/utils/metrices';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';

const schema = yup.object({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .min(10, 'Mobile number must be at least 8 characters'),
});

export default function forgetPassword(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { postQuery, loading } = usePostQuery();

  const onSubmit = (data: any) => {
    postQuery({
      url: apiUrls.user.forgotPassword,
      onSuccess: (res: any) => {
        console.log(res);
        router.push({
          pathname: '/otp',
          params: { mobile: data.mobile, route: 'forgotPassword' },
        });
      },
      postData: {
        mobile: data?.mobile,
      },
    });
  };

  return (
    <ContentWrapper>
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
              <Text style={styles.title}>Enter phone number</Text>
              <Text style={styles.subtitle}>
                Please input the 6-digit code we sent you via text at 102 251
                5114{' '}
                <Link href="/signup" style={styles.loginText}>
                  Edit Number?
                </Link>
              </Text>
            </View>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SimpleInput
                  onChangeText={onChange}
                  value={value}
                  renderLeft={() => (
                    <Feather
                      name="phone"
                      size={24}
                      color={Colors.placeholder}
                    />
                  )}
                  placeholder="your phone number"
                  label="Mobile number"
                  errorMessage={errors.mobile && errors.mobile.message}
                />
              )}
              name="mobile"
            />
          </View>
        </View>

        <View>
          <PrimaryButton
            text={'Continue'}
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
    marginTop: verticalScale(35),
  },
});
