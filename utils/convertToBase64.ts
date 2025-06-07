import * as FileSystem from 'expo-file-system';

const convertTobase64 = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.log(error);
  }
};

export default convertTobase64;
