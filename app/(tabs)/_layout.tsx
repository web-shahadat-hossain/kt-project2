import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#387ADE',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarBackground: () => (
            <BlurView intensity={50} tint="light" style={styles.blurView} />
          ),
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: styles.tabBarStyle,
            android: styles.tabBarStyle,
            default: styles.tabBarStyle,
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="courses"
          options={{
            title: 'Courses',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="line-scan"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="materials"
          options={{
            title: 'Materials',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="note-text-outline"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="quizes"
          options={{
            title: 'Quiz',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="quiz" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={28} name="user-alt" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden', // Ensures the blur effect doesn't bleed outside the border
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Light transparent white
  },
  tabBarStyle: {
    position: 'absolute',
    height: 70,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    shadowColor: 'black',
  },
});
