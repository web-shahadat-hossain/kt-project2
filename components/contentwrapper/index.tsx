import React from 'react';
import { StyleSheet, ViewStyle, SafeAreaView } from 'react-native';

interface ContentWrapperProps {
  children: React.ReactNode;
  mainContainerStyle?: ViewStyle;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  mainContainerStyle,
}) => {
  return (
    <SafeAreaView style={[styles.mainContainer, mainContainerStyle]}>
      {children}
    </SafeAreaView>
  );
};

export default ContentWrapper;

interface Styles {
  mainContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
