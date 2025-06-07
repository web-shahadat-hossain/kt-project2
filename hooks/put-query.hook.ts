import {useState} from 'react';
import apiClient from '../apis/api-client';
import logger from '../utils/logger';

const headers = {
  'Content-Type': 'application/json',
};

const usePutQuery = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const putQuery = async (params:any) => {
    const {
      url,
      onSuccess = () => {
        logger.log('onSuccess function');
      },
      onFail = () => {
        logger.log('onFail function');
      },
      putData,
    } = params;
    setLoading(true);
    try {
      const {data: apiData = {}} = await apiClient.put(url, putData, {
        headers,
      });
      setData(apiData);
      await onSuccess(apiData);
      logger.log(apiData, 'putQuery-success');
    } catch (err:any) {
      onFail(err);
      logger.log(err, 'putQuery-fail');
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    putQuery,
    loading,
    setLoading,
    data,
    setData,
    error,
    setError,
  };
};

export default usePutQuery;
