import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { apiBaseUrl } from './apis';
import logger from '@/utils/logger';
import { clearStorage, getItem } from '@/utils/asyncStorage';
import asyncStorageConstants from '@/utils/asyncStorageConstants';
import { Alert } from 'react-native';
import { store } from '@/redux/store';
import { logoutUser } from '@/utils/utils';

const apiInstance = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });
  axiosRetry(api, { retries: 2 });

  api.interceptors.request.use(async (config) => {
    config.headers.appVersion = '1.0.0';
    config.headers.appBuildNumber = '1';
    config.headers.appBuildNumber = '1';
    config.headers['x-localization'] = 'en';
    config.headers['deviceType'] = 'android';

    const accessToken = await getItem(asyncStorageConstants.accessToken);
    const parsedToken = JSON.parse(accessToken as string);
    if (parsedToken) {
      config.headers.authorization = `Bearer ${parsedToken}`;
    }
    logger.log('REQUEST', config);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      logger.log('RESPONSE', response);
      return response;
    },
    (error) => {
      if (
        error.response?.data?.message === 'Unauthorized' ||
        error.response?.data?.message ===
          'Too many requests, please try again later.' ||
        error.response?.data?.message === 'User not found or blocked.'
      ) {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please login again.',
          [
            {
              text: 'OK',
              onPress: () => {
                logoutUser(store?.dispatch);
              },
              style: 'cancel',
            },
          ],
          {
            cancelable: false,
            onDismiss: () => {},
          }
        );
      }

      logger.log('ERROR', error.response?.data?.detail);
      throw error.response?.data;
    }
  );

  return api;
};

const apiClient: AxiosInstance = apiInstance();

export default apiClient;
