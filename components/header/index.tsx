import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  TextStyle,
  OpaqueColorValue,
} from 'react-native';
import { horizontalScale, verticalScale } from '@/utils/metrices';
import { Colors } from '@/constants/Colors';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type headerProps = {
  showLeft?: Boolean;
  renderRight?: () => React.ReactNode;
  renderLeft?: () => React.ReactNode;
  heading?: String;
  style?: ViewStyle;
  headingStyle?: TextStyle;
  backIconColor?: OpaqueColorValue;
};

const Header = ({
  showLeft = false,
  renderRight,
  renderLeft,
  heading = '',
  style,
  headingStyle,
  backIconColor,
}: headerProps) => {
  const router = useRouter();
  return (
    <View style={[styles.container, style]}>
      {/* Left Image */}
      <View style={{ width: '10%' }}>
        {showLeft && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.imageWrapper}
          >
            <Feather
              name="arrow-left"
              size={30}
              color={backIconColor ? backIconColor : Colors.black}
            />
          </TouchableOpacity>
        )}
        {renderLeft && renderLeft()}
      </View>

      {/* Heading */}
      <View style={{ width: '80%' }}>
        <Text
          style={[
            styles.heading,
            { fontFamily: 'Poppins-Regular', fontWeight: 'bold' },
            headingStyle,
          ]}
          //  style={[styles.heading, headingStyle]}
          numberOfLines={1}
        >
          {heading}
        </Text>
      </View>

      {/* Right Image */}
      <View style={{ width: '10%' }}>{renderRight && renderRight()}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(15),
    height: verticalScale(70),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    marginTop: verticalScale(30),
  },
  imageWrapper: {
    height: verticalScale(30),
    width: horizontalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    height: verticalScale(35),
    width: horizontalScale(35),
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
    textAlign: 'center',
  },
});
