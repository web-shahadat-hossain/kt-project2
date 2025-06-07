import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import { moderateScale, verticalScale } from '@/utils/metrices';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import PrimaryButton from '@/components/common/PrimaryButton';

type resultCardProps = {
  status?: string;
  question: string;
  index: number;
  totalQuestions: number;
};

const ResultScreen = () => {
  const params = useLocalSearchParams();

  const answers = JSON.parse(params?.answers);
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const percentage = (correctAnswers / answers.length) * 100;

  const ResultCard = ({
    status,
    question,
    index,
    totalQuestions,
  }: resultCardProps) => {
    const getStatus = (status: string) => {
      switch (status) {
        case 'correct':
          return (
            <View style={styles.statusContainer}>
              <AntDesign name="checkcircle" color="#16A34A" size={24} />
              <Text style={styles.status}>Correct</Text>
            </View>
          );
        case 'incorrect':
          return (
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: '#FEF2F2',
                },
              ]}
            >
              <AntDesign name="closecircle" color="#DC2626" size={24} />
              <Text
                style={[
                  styles.status,
                  {
                    color: '#DC2626',
                  },
                ]}
              >
                Incorrect
              </Text>
            </View>
          );
        default:
          return (
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: '#F1F5F9',
                },
              ]}
            >
              <AntDesign name="closecircle" color="#475569" size={24} />
              <Text
                style={[
                  styles.status,
                  {
                    color: '#475569',
                  },
                ]}
              >
                Correct
              </Text>
            </View>
          );
      }
    };
    return (
      <View style={styles.resultCardContainer}>
        <View style={styles.col2}>
          <Text style={styles.font14}>
            Question {index + 1}/{totalQuestions}
          </Text>
          <Text style={styles.font14}>01 / 01 Point</Text>
        </View>
        <Text style={styles.questionHeading}>{question}</Text>

        {getStatus(status)}
      </View>
    );
  };

  return (
    <ContentWrapper>
      <Header heading={'Results'} showLeft />
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Congratulations! You win!</Text>
        <Text style={styles.gradeHeading}>Your Grade</Text>
        <Text style={styles.percent}>{percentage.toFixed(2)}%</Text>
        <ScrollView
          style={{
            marginTop: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {answers.map((answer, index) => (
            <ResultCard
              key={index}
              index={index}
              totalQuestions={params?.answers?.length}
              question={answer?.questionId?.question}
              status={answer?.isCorrect ? 'correct' : 'incorrect'}
            />
          ))}
          <PrimaryButton
            style={{
              marginBottom: 20,
            }}
            onPress={() => router.push('/(tabs)')}
            text={'Back to homepage'}
            isOutlined
          />
        </ScrollView>
      </View>
    </ContentWrapper>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  gradeHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 20,
  },
  percent: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },
  resultCardContainer: {
    height: verticalScale(168),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    marginBottom: 20,
  },
  col2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  font14: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
  },
  questionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginVertical: moderateScale(12),
  },
  statusContainer: {
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    columnGap: 8,
  },
  status: {
    fontSize: 18,
    fontWeight: '500',
    color: '#16A34A',
  },
});
