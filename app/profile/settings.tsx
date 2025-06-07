import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/utils/metrices';
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';
import Loader from '@/components/loader';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import Toast from 'react-native-toast-message';
import { logoutUser } from '@/utils/utils';
import { clearStorage } from '@/utils/asyncStorage';

const Settings = () => {
  const dispatch = useDispatch();
  const { postQuery, loading } = usePostQuery();

  const handleLogout = () => {
    postQuery({
      url: apiUrls.user.logout,
      onSuccess: (res: any) => {
        logoutUser(dispatch);
        Toast.show({
          type: 'success',
          text1: 'Logged out successfully!',
        });
      },
      onFail: (err: any) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: err.message || 'Something went wrong!',
        });
      },
    });
  };
  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <Header heading={'Settings'} showLeft />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push('/profile/profileDetails')}
          style={styles.item}
        >
          <View style={styles.iconWrapper}>
            <FontAwesome6 name="user-large" size={14} color="#0F172A" />
          </View>
          <Text style={styles.itemText}>Profile Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/accountSetup',
              params: {
                heading: 'Edit Profile',
              },
            })
          }
          style={styles.item}
        >
          <View style={styles.iconWrapper}>
            <FontAwesome6 name="user-large" size={14} color="#0F172A" />
          </View>
          <Text style={styles.itemText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/profile/managePass')}
          style={styles.item}
        >
          <View style={styles.iconWrapper}>
            <MaterialIcons name="password" size={24} color="black" />
          </View>
          <Text style={styles.itemText}>Manage Password</Text>
        </TouchableOpacity>
        {/* <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <FontAwesome6 name="wallet" size={14} color="#0F172A" />
          </View>
          <Text style={styles.itemText}>Wallet</Text>
        </View> */}

        <TouchableOpacity
          onPress={() => router.push('/wallet')}
          style={styles.item}
        >
          <View style={styles.iconWrapper}>
            <FontAwesome6 name="wallet" size={14} color="#0F172A" />
          </View>
          <Text style={styles.itemText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/certificate')}
          style={styles.item}
        >
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="certificate"
              size={18}
              color="#0F172A"
            />
          </View>
          <Text style={styles.itemText}>My Certificate</Text>
        </TouchableOpacity>

        <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <Ionicons name="notifications" size={14} color="#0F172A" />
          </View>
          <Text style={styles.itemText}>Notifications</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="sticky-note-2" size={14} color="#0F172A" />
          </View>
          <Text style={styles.itemText}>Terms and Conditions</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.item}>
          <View
            style={[
              styles.iconWrapper,
              {
                borderColor: '#B91C1C',
              },
            ]}
          >
            <AntDesign name="logout" size={14} color="#B91C1C" />
          </View>
          <Text
            style={[
              styles.itemText,
              {
                color: '#B91C1C',
              },
            ]}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </ContentWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0F172A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(8),
    marginBottom: verticalScale(22),
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0F172A',
  },
});
