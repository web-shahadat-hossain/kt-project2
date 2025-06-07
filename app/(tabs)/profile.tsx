import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import { AntDesign } from '@expo/vector-icons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/utils/metrices';
import ImagePickerExample from '@/components/imageUpload';
import DropdownPicker from '@/components/dropDown';
import PieChartBox from '@/components/pieChart';
import { router, useFocusEffect } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useGetQuery from '@/hooks/get-query.hook';
import { apiUrls } from '@/apis/apis';
import Loader from '@/components/loader';

const Profile = () => {
  const [user, setUser] = useState({});
  const { getQuery, loading } = useGetQuery();
  const tabBarHeight = useBottomTabBarHeight();
  const [courseTracking, setCourseTracking] = useState({});

  // console.log('User>>>>>>>>>>>>>>???', user);

  const handleCourseTracking = () => {
    getQuery({
      url: apiUrls.course.getCourseTracking,
      onSuccess: (res: any) => {
        setCourseTracking(res.data);
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      getQuery({
        url: apiUrls.user.getProfile,
        onSuccess: (res: any) => {
          setUser(res.data);
        },
      });
      handleCourseTracking();
    }, [])
  );

  return (
    <ContentWrapper
      mainContainerStyle={{
        paddingBottom: tabBarHeight,
      }}
    >
      <Loader visible={loading} />
      <Header
        // heading="Profile"
        renderRight={() => (
          <AntDesign
            onPress={() => router.push('/profile/settings')}
            name="setting"
            size={24}
            color={'black'}
          />
        )}
        showLeft={false}
        renderLeft={() => (
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: '700',
              width: 300,
            }}
          >
            Profile
          </Text>
        )}
      />
      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View style={styles.container}>
          <View style={styles.profileTopContainer}>
            <ImagePickerExample
              value={''}
              onImageChange={() => {}}
              containerStyle={{
                width: 80,
                height: 80,
                borderRadius: 18,
              }}
              iconStyle={{
                width: 36,
                height: 36,
                borderRadius: 18,
                paddingTop: 8,
                top: '70%',
                left: '70%',
              }}
              renderIcon={<AntDesign name="edit" size={18} color={'black'} />}
            />
            <View>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text
                style={styles.profileInfo}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {user?.schoolName} &#x2022; {user?.boardId?.boardname}
              </Text>
            </View>
          </View>
          <View style={styles.staticsContainer}>
            <View style={styles.staticsCard}>
              <Text style={styles.staticsCardHeading}>
                {user?.highestResult?.quizId?.title}
              </Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreHeading}>Highest Score</Text>
                <Text style={styles.score}>{user?.highestResult?.score}</Text>
              </View>
            </View>
            <View style={styles.staticsCard}>
              <Text style={styles.staticsCardHeading}>
                {user?.lowestResult?.quizId?.title}
              </Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreHeading}>Lowest Score</Text>
                <Text style={styles.score}>{user?.lowestResult?.score}</Text>
              </View>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.chartTopContainer}>
              <Text style={styles.chartHeading}>Completion Rate</Text>
              <DropdownPicker
                containerStyle={{
                  width: 150,
                  height: 40,
                }}
                options={[
                  { label: 'Weekly', value: 'Weekly' },
                  { label: 'Monthly', value: 'Monthly' },
                ]}
                selectedValue=""
                onValueChange={(value) => console.log(value)}
              />
            </View>
            <PieChartBox data={courseTracking?.completionRate} />
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.chartTopContainer}>
              <Text style={styles.chartHeading}>Completion Rate</Text>
              <DropdownPicker
                containerStyle={{
                  width: 150,
                  height: 40,
                }}
                options={[
                  { label: 'Weekly', value: 'Weekly' },
                  { label: 'Monthly', value: 'Monthly' },
                ]}
                selectedValue=""
                onValueChange={(value) => console.log(value)}
              />
            </View>
            <PieChartBox data={courseTracking?.completionRate} />
          </View>
        </View>
      </ScrollView>
    </ContentWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
  },
  profileTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: ' #0F172A',
  },
  profileInfo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'left',
    flexWrap: 'wrap',
    width: '75%',
  },
  staticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: moderateScale(16),
    marginTop: verticalScale(16),
  },
  staticsCard: {
    flex: 1,
    height: verticalScale(140),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(16),
    padding: moderateScale(8),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  staticsCardHeading: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#387ADE',
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(24),
  },
  scoreContainer: {
    flexDirection: 'column',
  },
  scoreHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94A3B8',
  },
  score: {
    fontSize: 32,
    fontWeight: '500',
    color: '#387ADE',
  },
  chartContainer: {
    height: 224,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: verticalScale(16),
    borderRadius: moderateScale(24),
    padding: moderateScale(16),
  },
  chartTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
});
