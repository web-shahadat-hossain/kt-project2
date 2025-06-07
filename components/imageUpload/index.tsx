import { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { moderateScale, verticalScale } from '@/utils/metrices';
import { Colors } from '@/constants/Colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';

type ImagePickerProps = {
  onImageChange: (image: string) => void;
  value: string | null;
  containerStyle?: ViewStyle;
  iconStyle?: TextStyle;
  renderIcon?: React.ReactNode;
};

export default function ImagePickerExample({
  onImageChange,
  value,
  containerStyle,
  iconStyle,
  renderIcon,
}: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(value);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={pickImage}
    >
      <Text style={[styles.camera, iconStyle]}>
        {renderIcon ? (
          renderIcon
        ) : (
          <AntDesign name="camera" size={18} color={Colors.gray} />
        )}
      </Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Feather name="user" size={40} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: verticalScale(20),
  },
  container: {
    width: 104,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
    position: 'relative',
    marginVertical: moderateScale(8),
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: moderateScale(52),
    // overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: moderateScale(52),
  },
  camera: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E2E8F0',
    position: 'absolute',
    top: '60%',
    left: '80%',
    zIndex: 1,
    textAlign: 'center',
    paddingTop: 4,
  },
  label: {
    color: Colors.darkGray,
    marginBottom: 5,
    textAlign: 'left',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: verticalScale(5),
  },
});
