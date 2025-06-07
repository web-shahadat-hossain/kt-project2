import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@/constants/Colors';

const QuizCard = ({ onPress, title, description, price }) => {
  return (
    <View style={{ margin: 15 }}>
      <TouchableOpacity onPress={onPress} style={styles.courseCard}>
        <View style={styles.completeProfileContainer}>
          <Text style={styles.courseTitle}>{title}</Text>
        </View>
        <Text style={styles.courseDescription}>{description}</Text>
        <Text style={styles.priceText}>{price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  courseCard: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  newCourseBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
  },
  newCourseText: {
    fontWeight: 'bold',
  },
  completeProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: Colors.black,
    marginTop: 10,
  },
  courseDescription: {
    color: Colors.placeholder,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
