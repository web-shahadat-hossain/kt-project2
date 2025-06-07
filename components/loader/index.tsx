import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface LoaderProps {
  visible: boolean; // Whether the loader is visible
  message?: string; // Optional message to display below the loader
  color?: string; // Color of the loader
  size?: 'small' | 'large'; // Size of the loader
  containerStyle?: ViewStyle; // Custom style for the loader container
  messageStyle?: TextStyle; // Custom style for the message text
}

const Loader: React.FC<LoaderProps> = ({
  visible,
  message = 'Loading...',
  color = '#ffffff',
  size = 'large',
  containerStyle,
  messageStyle,
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.loader}>
        <ActivityIndicator size={size} color={color} />
        <Text style={[styles.message, messageStyle]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  loader: {
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loader;
