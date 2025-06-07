import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import useGetQuery from '@/hooks/get-query.hook';
import { useSelector } from 'react-redux';
import { apiUrls } from '@/apis/apis';

const Certificate = () => {
  const user = useSelector((state) => state.user.user);
  const [certificates, setCertificates] = useState([]);
  const { getQuery } = useGetQuery();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getQuery({
      url: apiUrls.certificates(user._id),
      onSuccess: (res) => {
        // console.log('^^^^^^^^^^^^^GGGGGGGGGGGGGGGVFFFFDD', res.data);
        setCertificates(res?.data?.certificate);
      },
    });
  }, [user]);

  return (
    <ContentWrapper>
      <Header heading={'My Certificate'} showLeft />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        {certificates?.length > 0 ? (
          certificates?.map((certificate) => (
            <View
              key={certificate._id}
              style={{ marginHorizontal: 20, marginVertical: 20 }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {certificate?.quizId?.title}
              </Text>
              <Image
                source={{ uri: certificate?.certificate }}
                style={{
                  width: '100%',
                  height: 300,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ))
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
              You Have no Certificate Yet
            </Text>
          </View>
        )}
      </ScrollView>
    </ContentWrapper>
  );
};

export default Certificate;

const styles = StyleSheet.create({});
