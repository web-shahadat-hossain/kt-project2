import { useState } from 'react';
import apiClient from '../apis/api-client';
import logger from '../utils/logger';

const headers = {
  'Content-Type': 'application/json',
};

const usePostQuery = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const postQuery = async (params: any) => {
    const {
      url,
      onSuccess = () => {
        logger.log('onSuccess function');
      },
      onFail = () => {
        logger.log('onFail function');
      },
      postData,
    } = params;
    setLoading(true);
    try {
      const { data: apiData = {} } = await apiClient.post(url, postData, {
        headers,
      });
      setData(apiData);
      await onSuccess(apiData);
      logger.log(apiData, 'postQuery-success');
    } catch (err: any) {
      onFail(err);
      logger.log(err, 'postQuery-fail');
      setError(err);
      //   setData();
    } finally {
      setLoading(false);
    }
  };

  return {
    postQuery,
    loading,
    setLoading,
    data,
    setData,
    error,
    setError,
  };
};

export default usePostQuery;
