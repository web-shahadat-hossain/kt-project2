import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import SimpleInput from '@/components/simpleInput';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryButton from '@/components/common/PrimaryButton';
import { router } from 'expo-router';
import usePostQuery from '@/hooks/post-query.hook';
import Loader from '@/components/loader';
import { apiUrls } from '@/apis/apis';
import Toast from 'react-native-toast-message';

const schema = yup.object({
  oldPassword: yup
    .string()
    .required('Old password is required')
    .min(8, 'Old password must be at least 8 characters'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

const ManagePass = () => {
  const [isPassword, setIsPassword] = useState(true);

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
      url: apiUrls.user.changePassword,
      onSuccess: (res: any) => {
        Toast.show({
          type: 'success',
          text1: 'Password changed successfully!',
        });
        router.back();
      },
      onFail: (res: any) => {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong!',
        });
      },
      postData: {
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      },
    });
    console.log(data);
    // router.push('/(tabs)')
  };

  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <Header heading={'Manage Password'} showLeft />
      <View style={styles.container}>
        <Text style={styles.containerText}>
          Repellat vitae autem adipisci! Maiores aperiam porro similique! In
          enim expedita quos atque, inventore dolorem reiciendis, aperiam,
          numquam temporibus nemo eveniet! Quae blanditiis rem modi tempora
          atque repellendus quam voluptates perspiciatis quo explicabo?
        </Text>

        {/* input */}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SimpleInput
                  onChangeText={onChange}
                  value={value}
                  isPassword={isPassword}
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
                  placeholder="Current Password"
                  errorMessage={
                    errors.oldPassword && errors.oldPassword.message
                  }
                />
              )}
              name="oldPassword"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SimpleInput
                  onChangeText={onChange}
                  value={value}
                  isPassword={isPassword}
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
                  placeholder="New Password"
                  errorMessage={
                    errors.newPassword && errors.newPassword.message
                  }
                />
              )}
              name="newPassword"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SimpleInput
                  onChangeText={onChange}
                  value={value}
                  isPassword={isPassword}
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
                  placeholder="Confirm Password"
                  errorMessage={
                    errors.confirmPassword && errors.confirmPassword.message
                  }
                />
              )}
              name="confirmPassword"
            />
          </View>

          <PrimaryButton
            style={styles.button}
            textStyle={{ color: Colors.white }}
            onPress={handleSubmit(onSubmit)}
            text={'Save Changes'}
            isOutlined
            renderIcon={() => (
              <Feather name="arrow-right" size={24} color={'white'} />
            )}
          />
        </View>
      </View>
    </ContentWrapper>
  );
};

export default ManagePass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  containerText: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
