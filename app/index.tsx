// 3rd solution
import ContentWrapper from '@/components/contentwrapper';
import { setItem } from '@/utils/asyncStorage';
import asyncStorageConstants from '@/utils/asyncStorageConstants';
import { Link, router } from 'expo-router';

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const SelectedLanguage: React.FC = () => {
  const bottomSheetRef = useRef(null);

  const languages = ['English', 'Hindi', 'Gujarati', 'Tamil'];

  // Function to open the BottomSheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  useEffect(() => {
    openBottomSheet();
  }, []);

  // Function to close the BottomSheet

  const handleLanguageSelect = async (item: string) => {
    await setItem(asyncStorageConstants.language, item);
    bottomSheetRef.current?.close();
    router.push('/login');
  };

  return (
    <ContentWrapper>
      <View style={styles.container}>
        <Image source={require('../assets/Splash.png')} />
        {/* Bottom Sheet */}
        <RBSheet
          ref={bottomSheetRef}
          height={350} // Set height for bottom sheet
          openDuration={250} // Animation speed
          closeOnDragDown={true} // Allows swiping down to close
          closeOnPressMask={true} // Close on outside tap
          customStyles={{
            container: styles.bottomSheet,
          }}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.selectText}>Select your language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLanguageSelect(item)}
                  style={styles.languageButton}
                >
                  <Link href="/login" style={styles.languageText}>
                    {item}
                  </Link>
                </TouchableOpacity>
              )}
            />
          </View>
        </RBSheet>
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#387ade',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  openButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  openButtonText: {
    fontSize: 18,
    color: '#3164d1',
    fontWeight: 'bold',
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  selectText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  languageButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'flex-start',
  },
  languageText: {
    fontSize: 16,
  },
});

export default SelectedLanguage;
