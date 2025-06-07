import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import PrimaryButton from '@/components/common/PrimaryButton';
import DateInput from '@/components/dateInput';
import SimpleInput from '@/components/simpleInput';
import ImagePickerExample from '@/components/imageUpload';
import { moderateScale, verticalScale } from '@/utils/metrices';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import usePutQuery from '@/hooks/put-query.hook';
import { apiUrls } from '@/apis/apis';
import Toast from 'react-native-toast-message';
import Loader from '@/components/loader';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/redux/slices/userSlice';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  // dob: yup.date().required('Date of Birth is required'),
  // image: yup.string().required('Image is required'),
});

const ProfileDetails = () => {
  const user = useSelector((state) => state.user.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.name?.split(' ')?.[0],
      lastName: user?.name?.split(' ')?.[1],
      email: user?.email,
    },
  });
  const dispatch = useDispatch();

  const { putQuery, loading } = usePutQuery();

  const onSubmit = (data: any) => {
    console.log(data);
    putQuery({
      url: apiUrls.user.updateProfile,
      onSuccess: (res: any) => {
        Toast.show({
          type: 'success',
          text1: 'Profile updated successfully!',
        });
        const data = res.data;
        const formatData = {
          ...data,
          stdId: data?.stdId?._id,
          boardId: data?.boardId?._id,
          subject: data?.subject?.map((item) => item?._id),
          activity: data?.activity?.map((item) => item?._id),
        };
        dispatch(updateUser(formatData));
        router.back();
        console.log(res);
      },
      onFail: (err: any) => {
        Toast.show({
          type: 'error',
          text1: err?.message || 'Something went wrong!',
        });
        console.log(err);
      },
      putData: {
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        dob: data.dob,
      },
    });
  };
  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <Header heading={'Profile Details'} showLeft />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <View style={styles.imageUploadContainer}>
              <ImagePickerExample
              // onImageChange={onChange}
              // value={value}
              />
              {/* <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <ImagePickerExample
                      onImageChange={onChange}
                      value={value}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'red',
                        fontSize: 12,
                      }}
                    >
                     {errors.image && errors.image.message} 
                    </Text>
                  </>
                )}
                name="image"
              /> */}
            </View>
            <View style={styles.formContainer}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SimpleInput
                      label="First name*"
                      placeholder="john"
                      onChangeText={onChange}
                      value={value}
                      errorMessage={
                        errors.firstName && errors.firstName.message
                      }
                    />
                  )}
                  name="firstName"
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SimpleInput
                      label="Last name*"
                      placeholder="Deo"
                      onChangeText={onChange}
                      value={value}
                      errorMessage={errors.lastName && errors.lastName.message}
                    />
                  )}
                  name="lastName"
                />
              </View>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SimpleInput
                  label="Email address*"
                  placeholder="johndeo123@gmail.com"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email && errors.email.message}
                />
              )}
              name="email"
            />
            {/* <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateInput
                  onChange={onChange}
                  dateValue={value}
                  label="Date of birth*"
                  required={false}
                  error={errors.dob && errors.dob.message}
                />
              )}
              name="dob"
            /> */}
          </View>
          <PrimaryButton
            text={'Save'}
            isOutlined
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ContentWrapper>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    marginBottom: 20,
  },
  imageUploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: moderateScale(16),
    marginTop: verticalScale(44),
  },
});
