import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from './logger';

const setItem = async (key: any, value: any) => {
  logger.log(key, value, 'key-value-chat');
  // console.log({ stringData });
  const response = await AsyncStorage.setItem(key, value, (err: any) =>
    logger.log(err, 'error-setItem')
  );

  return response;
};

const getItem = async (key: any) => {
  const response = await AsyncStorage.getItem(key, (error: any) =>
    logger.log(error, 'error-getItem')
  );

  // const parsedData = JSON.parse(response as string);

  return response;
};

const removeItem = async (key: any) => {
  const response = await AsyncStorage.removeItem(key, (error: any) =>
    logger.log(error, 'error-removeItem')
  );
  return response;
};

const clearStorage = async () => {
  await AsyncStorage.clear((error: any) =>
    logger.log(error, 'error-clear-local-storage')
  );
  // await AsyncStorage.setItem(asyncStorageConstants.firstOpened, 'true');
};

export { setItem, getItem, clearStorage, removeItem };
