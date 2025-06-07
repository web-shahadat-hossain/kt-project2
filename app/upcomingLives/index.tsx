import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import { useFocusEffect } from '@react-navigation/native';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';
import { router, useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import Loader from '@/components/loader';
import { RefreshControl } from 'react-native';

const UpcomingLives = () => {
  const [upcomingLives, setUpcomingLives] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams();

  const { postQuery, loading } = usePostQuery();

  const fetchUpcomingLive = () => {
    postQuery({
      url: apiUrls.stream.fetchUpcommingLive,
      onSuccess: (res) => {
        console.log('upcoming live', res.data);
        setUpcomingLives(res.data);
      },
      postData: {
        courseId: params?.courseId,
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchUpcomingLive();
    }, [])
  );
  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <Header heading={'Upcoming Lives'} showLeft />

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} />}
        style={{
          marginTop: 20,
          marginHorizontal: 16,
        }}
      >
        {upcomingLives?.length > 0 ? (
          upcomingLives?.map((live) => {
            return (
              <TouchableOpacity
                key={live?._id}
                onPress={live?.isLive ? () => router.push('/live') : () => {}}
                style={{
                  width: '100%',
                  height: 80,
                  flexDirection: 'column',
                  rowGap: 10,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#0003e',
                  borderRadius: 10,
                  marginRight: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                    }}
                  >
                    {live?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'red',
                    }}
                  >
                    {!live?.upcomming && !live?.isLive
                      ? 'Live Ended'
                      : !live?.upcomming && live?.isLive
                      ? 'Live Now'
                      : 'Upcoming'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    rowGap: 10,
                  }}
                >
                  <Text>
                    Date: {moment(live.startDate).format('DD-MM-yyyy')}
                  </Text>
                  <Text>Time: {moment(live.startDate).format('hh mm a')}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#888',
              }}
            >
              No upcoming live shows Yet
            </Text>
          </View>
        )}
      </ScrollView>
    </ContentWrapper>
  );
};

export default UpcomingLives;

const styles = StyleSheet.create({});
