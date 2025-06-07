import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { AntDesign, EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import PrimaryButton from '@/components/common/PrimaryButton';
import ContentWrapper from '@/components/contentwrapper';
import { useLocalSearchParams } from 'expo-router';
import usePostQuery from '@/hooks/post-query.hook';
import { apiUrls } from '@/apis/apis';
import Loader from '@/components/loader';
import SimilarCourse from '@/components/courseCard';
import { useSelector } from 'react-redux';
import { set } from 'react-hook-form';
import { images } from '@/assets/images';

const { width } = Dimensions.get('window');

export default function SelectCourse() {
  const { user } = useSelector((state) => state.user);
  const [isLocked, setIsLocked] = useState(true);
  const { id } = useLocalSearchParams();
  const [detailCourse, setDetailCourse] = useState({});
  const [selectedTab, setSelectedTab] = useState('Overview');

  const { postQuery, loading } = usePostQuery();

  const courseDetails = async () => {
    postQuery({
      url: apiUrls.course.getCourseDetails, // Correct API URL for courses
      onSuccess: (res: any) => {
        console.log('Fetched Courses:', res.data);
        setDetailCourse(res.data); // Set course data to state
      },
      onFail: (err: any) => {
        console.error('Error fetching courses:', err);
      },
      postData: {
        courseId: id,
      },
    });
  };

  useEffect(() => {
    courseDetails();
  }, []);

  useEffect(() => {
    const isEnrolled = detailCourse?.enrolledStudents?.find(
      (enrolledStudent) => enrolledStudent?.userId?._id === user?._id
    );
    if (isEnrolled) {
      setIsLocked(false);
    }
  }, [detailCourse]);

  return (
    <ContentWrapper>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: detailCourse?.thumbnail }}
            style={styles.bannerImage}
            resizeMode="cover"
          >
            <View style={styles.headerRow}>
              <Feather
                onPress={() => router.back()}
                name="arrow-left"
                size={24}
                color="white"
              />
              <Text style={styles.courseHeading}>{detailCourse?.title}</Text>
              <View style={styles.headerIcons}>
                <EvilIcons name="sc-telegram" size={28} color="white" />
                <Feather name="bookmark" size={24} color="white" />
              </View>
            </View>
            <View style={styles.overlay}>
              <Text style={styles.courseHeading}>
                {detailCourse?.description}
              </Text>
              <View style={styles.courseDetails}>
                <Text style={styles.courseDuration}>
                  {detailCourse?.duration}
                </Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingText}>{detailCourse?.rating}</Text>
                  <FontAwesome name="star" size={16} color="gold" />
                  <Text style={styles.ratingCount}>
                    ({detailCourse?.reviewsCount})
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Scrollable content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*       {/* Enroll Section */}
          <View style={styles.enrollSection}>
            <PrimaryButton
              style={styles.enrollButton}
              textStyle={styles.enrollText}
              text={isLocked ? 'Enroll Now' : 'Upcoming Lives'}
              isOutlined
              // onPress={() => router.push('/payment')}
              onPress={
                isLocked
                  ? () =>
                      router.push({
                        pathname: '/payment',
                        params: { courseId: id },
                      })
                  : () =>
                      router.push({
                        pathname: '/upcomingLives',
                        params: { courseId: id },
                      })
              }
            />
            <View style={styles.alreadyEnrolled}>
              <Image
                source={require('../../assets/images/classroom.jpg')}
                style={{ width: 20, height: 20, borderRadius: 50 }}
              />
              <Image
                source={require('../../assets/images/course.jpg')}
                style={{ width: 20, height: 20, borderRadius: 50 }}
              />
              <Image
                source={require('../../assets/images/Gpay.png')}
                style={{ width: 20, height: 20, borderRadius: 50 }}
              />
              <Text style={styles.alreadyEnrolledText}>
                100+ Already Enrolled
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <View style={styles.desRow}>
              <View>
                <TouchableOpacity onPress={() => setSelectedTab('Overview')}>
                  <Text style={styles.desTitle1}> Overview</Text>
                </TouchableOpacity>
                {selectedTab === 'Overview' && (
                  <View style={styles.underLine} />
                )}
              </View>
              <View
                style={{
                  position: 'relative',
                }}
              >
                {isLocked && (
                  <View
                    style={{ position: 'absolute', right: '35%', zIndex: 1 }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={images.Lock}
                    />
                  </View>
                )}

                <TouchableOpacity
                  onPress={
                    !isLocked ? () => setSelectedTab('Lessons') : () => {}
                  }
                >
                  <Text style={styles.desTitle1}> Lessons</Text>
                </TouchableOpacity>
                {selectedTab === 'Lessons' && <View style={styles.underLine} />}
              </View>
              <View>
                <TouchableOpacity onPress={() => setSelectedTab('Review')}>
                  <Text style={styles.desTitle1}>Review</Text>
                </TouchableOpacity>
                {selectedTab === 'Review' && <View style={styles.underLine} />}
              </View>
            </View>
          </View>

          {selectedTab === 'Overview' && (
            <View style={{ margin: 15 }}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {detailCourse?.description}
              </Text>
              {/* Features */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Features</Text>
                {/* <Text style={styles.featureText}>
              {' '}
              <Feather name="video" size={16} color="black" /> {detailCourse?.features}
            </Text> */}
                {detailCourse?.features?.map((feature, index) => (
                  <Text style={styles.featureText} key={index}>
                    {' '}
                    <Feather name="video" size={16} color="black" /> {feature}
                  </Text>
                ))}
                {/* <Text style={styles.featureText}>
              {' '}
              <Feather name="file-text" size={16} color="black" /> 100% Free
              document
            </Text>
            <Text style={styles.featureText}>
              {' '}
              <Feather name="file-text" size={16} color="black" /> Live time
              access
            </Text>
            <Text style={styles.featureText}>
              {' '}
              <Feather name="file-text" size={16} color="black" /> Certificate
              of completion
            </Text>
            <Text style={styles.featureText}>
              {' '}
              <Feather name="file-text" size={16} color="black" /> Native
              teacher
            </Text>
            <Text style={styles.featureText}>
              {' '}
              <Feather name="file-text" size={16} color="black" /> 24/7 Support
            </Text> */}
              </View>
              {/* Similar Courses */}
              <View style={styles.section2}>
                <View style={styles.completeProfileContainer}>
                  <Text style={styles.sectionTitle}>
                    Similar Courses for you
                  </Text>
                  <Text style={styles.viewAllText}>View all</Text>
                </View>
                <SimilarCourse
                  screenName="courses"
                  showSimiller
                  courseId={id}
                  emptyMessage="No similar course found!"
                />
                {/* <TouchableOpacity style={styles.courseCard}>
              <ImageBackground
                source={require('../../assets/images/course.jpg')}
                style={styles.courseImage}
              />
              <View style={styles.newCourseBadge}>
                <Text style={styles.newCourseText}>New Course</Text>
              </View>
              <View style={styles.completeProfileContainer}>
                <Text style={styles.courseTitle}>UI/UX Design Course</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.viewAllText}>4.8</Text>
                  <AntDesign style={styles.starIcon} name="star" size={24} />
                </View>
              </View>
              <Text style={styles.courseDescription}>
                Discover the essential principles of UI/UX design and learn how
                to create intuitive products.
              </Text>
            </TouchableOpacity> */}
              </View>
            </View>
          )}

          {selectedTab === 'Lessons' && (
            <View style={{ margin: 15 }}>
              {detailCourse?.lessons?.map((lesson, index) => {
                console.log('first', lesson);
                return (
                  <View key={index} style={{ marginTop: 5 }}>
                    <Text style={styles.sectionTitle}>
                      {index + 1}. {lesson?.title}
                    </Text>
                    <Text style={styles.sectionTitle}>
                      Material Type: {lesson?.materialType}
                    </Text>
                    <Text style={styles.descriptionText}>
                      {lesson?.description}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 330,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  courseHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  enrollSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
  },
  alreadyEnrolled: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
  },
  alreadyEnrolledText: {
    color: Colors.placeholder,
  },
  courseDuration: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 160,
  },
  ratingCount: {
    color: Colors.white,
  },

  enrollButton: {
    backgroundColor: Colors.primary,
    width: width - 250,
    marginTop: 10,
    padding: 10,
  },
  enrollText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  section2: {
    margin: 15,
  },
  completeProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  desRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  desTitle1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.placeholder,
  },
  underLine: {
    height: 3,
    width: 65,
    backgroundColor: Colors.primary,
    marginTop: 5,
  },
  desTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.placeholder,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewAllText: {
    color: Colors.placeholder,
    fontWeight: 'bold',
  },
  starIcon: {
    color: '#D97706',
  },
  courseDescription: {
    color: Colors.placeholder,
  },
  featureText: {
    fontSize: 15,
    marginBottom: 5,
    color: Colors.placeholder,
  },
  descriptionText: {
    fontSize: 14,
    color: 'gray',
  },
  courseCard: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 20,
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
  courseInfo: {
    marginLeft: 10,
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
