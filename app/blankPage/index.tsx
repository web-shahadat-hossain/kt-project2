import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Loader from '@/components/loader';
import WebView from 'react-native-webview';
import Header from '@/components/header';
import { router, useLocalSearchParams } from 'expo-router';

const BlankPage = () => {
  const { checkoutUrl, redirectPath, id, name } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  const handleNavigationChange = (navState) => {
    let obj = {};
    if (name && id) {
      obj[name] = id;
    }

    console.log('navState', navState);

    if (
      navState.url.includes(
        'https://admin.knowledgetemple.in/payment-status/success?orderId='
      )
    ) {
      router.replace({
        pathname: redirectPath,
        params: obj,
      });
    }
  };
  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <Header heading={'Payment'} />
      <WebView
        source={{ uri: checkoutUrl }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationChange}
      />
    </ContentWrapper>
  );
};

export default BlankPage;

const styles = StyleSheet.create({});
