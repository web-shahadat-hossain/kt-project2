import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import Header from '@/components/header';
import Stepper from '@/components/stepper';
import { moderateScale } from '@/utils/metrices';
import QuestionCard from '@/components/questionCard';
import PrimaryButton from '@/components/common/PrimaryButton';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { apiUrls } from '@/apis/apis';
import usePostQuery from '@/hooks/post-query.hook';
import Toast from 'react-native-toast-message';

// const data = {
//   _id: '67b8ca3def4ee0992f6efbbe',
//   title: 'React',
//   description: 'React Is a Frontend js framework',
//   standard: '67b5aba771079eda7bb6b51f',
//   subject: '67b5ac6771079eda7bb6b53d',
//   questions: [
//     {
//       _id: '67b8ca3def4ee0992f6efbc0',
//       question: 'What Is React',
//       options: [
//         {
//           option: 'Runtime',
//           _id: '67b8ca3def4ee0992f6efbc1',
//         },
//         {
//           option: 'Server',
//           _id: '67b8ca3def4ee0992f6efbc2',
//         },
//         {
//           option: 'Framework',
//           _id: '67b8ca3def4ee0992f6efbc3',
//         },
//       ],
//     },
//     {
//       _id: '67b8ca3def4ee0992f6efbc4',
//       question: 'NodeJS Used Purpose?',
//       options: [
//         {
//           option: 'Backend',
//           _id: '67b8ca3def4ee0992f6efbc5',
//         },
//         {
//           option: 'Frontend',
//           _id: '67b8ca3def4ee0992f6efbc6',
//         },
//         {
//           option: 'Fullstack',
//           _id: '67b8ca3def4ee0992f6efbc7',
//         },
//       ],
//     },
//     {
//       _id: '67b8ca3def4ee0992f6efbc8',
//       question: 'What is MongoDB',
//       options: [
//         {
//           option: 'NoSql Database',
//           _id: '67b8ca3def4ee0992f6efbc9',
//         },
//         {
//           option: 'Language',
//           _id: '67b8ca3def4ee0992f6efbca',
//         },
//         {
//           option: 'Sql Database',
//           _id: '67b8ca3def4ee0992f6efbcb',
//         },
//       ],
//     },
//   ],
//   startDate: '2025-02-23T08:45:51.801Z',
//   endDate: '2025-02-25T08:00:00.000Z',
//   price: 50,
//   duration: 30,
//   ageGroup: '10-15',
//   isActive: true,
//   createdAt: '2025-02-21T18:47:25.515Z',
//   updatedAt: '2025-02-21T18:47:25.525Z',
//   __v: 0,
// };

const QuestionScreen = () => {
  const [active, setActive] = useState(0);
  const { quizId } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { postQuery, loading } = usePostQuery();

  const handleStartQuiz = () => {
    postQuery({
      url: apiUrls.quiz.startQuiz,
      onSuccess: (res) => {
        console.log('enroll quiz', res?.data?.questions);
        setQuestions(res?.data?.questions);
      },
      onFail: (err) => {
        Toast.show({
          type: 'error',
          text1: err?.message,
        });
        if (err.message === 'You have already attempted this quiz.') {
          router.push('/(tabs)/quizes');
        }
        console.log('===============', err);
      },
      postData: {
        quizId,
      },
    });
  };

  useEffect(() => {
    handleStartQuiz();
  }, []);

  const handleAnswer = (value: any) => {
    const newAnswers = [...answers];
    const result = newAnswers.filter(
      (ans) => ans?.questionId !== value?.questionId
    );
    setAnswers([...result, value]);
  };

  const handleSubmit = () => {
    postQuery({
      url: apiUrls.quiz.submitQuiz,
      onSuccess: (res) => {
        console.log('submit quiz', res.data);
        router.push({
          pathname: '/quiz/result',
          params: {
            score: res.data.score,
            answers: JSON.stringify(res.data.answers),
          },
        });
      },
      onFail: (err) => {
        console.log('===============', err.response.data);
      },
      postData: {
        quizId,
        answers,
      },
    });
  };

  return (
    <ContentWrapper>
      <Header heading={'Quiz 1'} showLeft />
      <View style={styles.container}>
        <Stepper active={active} steps={questions.length} />
        <View style={styles.innerContainer}>
          <QuestionCard
            questionId={questions[active]?._id}
            questionHeading={questions[active]?.question}
            options={questions[active]?.options || []}
            onChange={handleAnswer}
          />
          <PrimaryButton
            onPress={
              active < questions.length - 1
                ? () => setActive((prev) => prev + 1)
                : handleSubmit
            }
            text={active === questions.length - 1 ? 'Submit' : 'Next'}
            renderIcon={() => (
              <AntDesign name="arrowright" size={16} color={'#fff'} />
            )}
            isOutlined
          />
        </View>
      </View>
    </ContentWrapper>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
