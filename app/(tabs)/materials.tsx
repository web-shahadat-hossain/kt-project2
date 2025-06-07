import { apiUrls } from '@/apis/apis';
import ContentWrapper from '@/components/contentwrapper';
import SimilarCourse from '@/components/courseCard';
import Loader from '@/components/loader';
import SimpleInput from '@/components/simpleInput';
import { Colors } from '@/constants/Colors';
import usePostQuery from '@/hooks/post-query.hook';
import { moderateScale } from '@/utils/metrices';
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Octicons,
} from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

// const studyMaterials = [
//   {
//     id: '1',
//     title: 'UI/UX Design Course',
//     duration: '2h 30min',
//     category: 'Math',
//   },
//   {
//     id: '2',
//     title: 'UI/UX Design Course',
//     duration: '2h 30min',
//     category: 'Math',
//   },
//   {
//     id: '3',
//     title: 'UI/UX Design Course',
//     duration: '2h 30min',
//     category: 'Math',
//   },
//   {
//     id: '4',
//     title: 'UI/UX Design Course',
//     duration: '2h 30min',
//     category: 'Math',
//   },
// ];

const courses = [
  {
    id: '1',
    title: 'UI/UX Design Course',
    description: 'Discover the essential principles of UI/UX design.',
  },
  {
    id: '2',
    title: 'UI/UX Design Course',
    description: 'Discover the essential principles of UI/UX design.',
  },
  {
    id: '3',
    title: 'UI/UX Design Course',
    description: 'Discover the essential principles of UI/UX design.',
  },
  {
    id: '4',
    title: 'UI/UX Design Course',
    description: 'Discover the essential principles of UI/UX design.',
  },
];

const StudyMaterialsScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredCourses, setFilteredCourses] = useState(courses);
  const [material, setMaterial] = useState<any[]>([]);
  const [materialList, setMaterialList] = useState<any[]>([]);
  const { postQuery, loading } = usePostQuery();

  // const handleSearch = (text) => {
  //     setSearchQuery(text);
  //     if (text.trim() === '') {
  //       setFilteredCourses(courses);
  //     } else {
  //       const filtered = courses.filter((course) =>
  //         course.title.toLowerCase().includes(text.toLowerCase())
  //       );
  //       setFilteredCourses(filtered);
  //     }
  //   };

  // fetch course materials
  // This api have no data
  const fetchMaterials = async () => {
    postQuery({
      url: apiUrls.material.getCourseMaterials,
      onSuccess: (res: any) => {
        // console.log('Fetched Materials:>>>>', res.data);
        setMaterial(res.data || []);
      },
      onFail: (err: any) => {
        console.error('Error fetching courses:', err);
      },
      postData: {
        page: 1,
        search: '',
        subjectId: '',
        standardId: '',
      },
    });
  };

  // call fetchMaterials
  useEffect(() => {
    fetchMaterials();
  }, []);

  // material list func
  const fetchMaterialsList = async () => {
    postQuery({
      url: apiUrls.material.getMaterials,
      onSuccess: (res: any) => {
        console.log('Fetched Materials:>>>>', res.data);
        setMaterialList(res.data || []);
      },
      onFail: (err: any) => {
        console.error('Error fetching courses:', err);
      },
      postData: {
        page: 1,
        search: '',
        subjectId: '',
        standardId: '',
        type: 'p', // V - Video, P - PDF
      },
    });
  };

  useEffect(() => {
    fetchMaterialsList();
  }, []);

  const CourseItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => router.push('/live')}>
        <View style={styles.courseItem}>
          <View style={styles.courseTextContainer}>
            <Text style={styles.courseTitle}>{item?.title}</Text>
          </View>

          {/*      {/* Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.courseDurationContainer}>
              <FontAwesome6 name="clock-rotate-left" size={15} color="black" />
              <Text style={styles.courseDuration}>.{item?.duration}</Text>
            </View>

            <View style={styles.courseTags}>
              <Text style={styles.courseCategory}>{item?.category}</Text>
              <TouchableOpacity style={styles.downloadButton}>
                <AntDesign name="download" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CourseItems = ({ title, description }) => (
    <TouchableOpacity style={{ justifyContent: 'space-evenly' }}>
      <View style={styles.courseItem2}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseDescription}>{description}</Text>
        <TouchableOpacity style={styles.openButton}>
          <Text style={styles.openText}>↗</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // This api have no data
  const RenderCourseMaterials = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.courseCard}>
        <Loader visible={loading} />
        <ImageBackground
          source={{ uri: item?.thumbnail }}
          style={styles.courseImage}
        />
        <View style={styles.newCourseBadge}>
          <Octicons
            style={styles.newCourseText}
            name="video"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.completeProfileContainer}>
          <Text style={styles.courseTitle}>{item?.title}</Text>
        </View>
        <Text style={styles.courseDescription}>
          {item?.description || 'No description available.'}
        </Text>
        <View style={styles.courseDurationContainer}>
          <FontAwesome6 name="clock-rotate-left" size={15} color="black" />
          <Text style={styles.courseDuration}>{item?.duration}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ContentWrapper
      mainContainerStyle={{
        paddingBottom: tabBarHeight,
      }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Study Materials</Text>
          </View>
          <SimpleInput
            placeholder="Search here"
            style={styles.searchInput}
            renderLeft={() => (
              <Feather name="search" size={20} color={Colors.placeholder} />
            )}
            value={searchQuery}
            // onChangeText={handleSearch}
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryActive}>
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Practical</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.courseCard}>
            <Loader visible={loading} />
            <ImageBackground
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2WUisIb3DyB667hgienksLQoJi5yFh26pqg&s',
              }}
              style={styles.courseImage}
            />
            <View style={styles.newCourseBadge}>
              <Octicons
                style={styles.newCourseText}
                name="video"
                size={24}
                color="black"
              />
            </View>
            <View style={styles.completeProfileContainer}>
              <Text style={styles.courseTitle}>UI/UX Design Course</Text>
            </View>
            <Text style={styles.courseDescription}>
              Lorem ipsum dolor sit amet, impedit! Nemo doloribus explicabo quia
              eos aut! Voluptates accusantium similique pariatur.
            </Text>
            <View style={styles.courseDurationContainer}>
              <FontAwesome6 name="clock-rotate-left" size={15} color="black" />
              <Text style={styles.courseDuration}>2h 30min</Text>
            </View>
          </TouchableOpacity>
          {/* Course materials*/}
          <FlatList
            data={material?.docs}
            renderItem={RenderCourseMaterials}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
          />

          {/* Courses   */}
          <View style={styles.completeProfileContainer}>
            <Text style={styles.sectionTitle}>Top Reading for You</Text>
            <Text style={styles.viewAllText}>View all</Text>
          </View>
          <FlatList
            // data={materialList?.docs}
            // keyExtractor={(item) => item.id}
            // renderItem={({ item }) => (
            //   <CourseItem
            //     title={item.title}
            //     duration={item.duration}
            //     category={item.category}
            //   />
            // )}
            data={material?.docs}
            renderItem={CourseItem}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
          />

          {/* reading course*/}
          <View style={styles.completeProfileContainer1}>
            <Text style={styles.sectionTitle}>Top Reading for You</Text>
            <Text style={styles.viewAllText}>View all</Text>
          </View>

          {/* course */}

          <FlatList
            numColumns={2}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{
              flexDirection: 'column',
            }}
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CourseItems title={item.title} description={item.description} />
            )}
          />
        </ScrollView>
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 5,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  searchInput: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    borderColor: Colors.placeholder,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryActive: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  categoryText: {
    color: Colors.placeholder,
    fontSize: 15,
    fontWeight: '600',
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
    left: 250,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 10,
  },
  newCourseText: {
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starIcon: {
    color: '#D97706',
  },
  completeProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 15,
  },
  completeProfileContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: Colors.placeholder,
    fontWeight: 'bold',
  },
  readingCourse: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  courseItem: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseItem2: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 150,
  },
  courseTextContainer: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  courseDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 5,
  },
  courseDuration: {
    fontSize: 14,
    color: 'gray',
  },
  courseTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseCategory: {
    backgroundColor: Colors.white,
    padding: 3,
    borderRadius: 5,
    borderColor: Colors.placeholder,
    borderWidth: 1,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'semibold',
    color: Colors.placeholder,
  },
  downloadButton: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.placeholder,
    borderWidth: 1,
  },
  downloadText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  rows: {
    justifyContent: 'space-between',
  },
  //   courseItem: {
  //     backgroundColor: "#fff",
  //     padding: 15,
  //     borderRadius: 10,
  //     marginBottom: 10,
  //     shadowColor: "#000",
  //     shadowOpacity: 0.1,
  //     shadowRadius: 5,
  //     elevation: 2,
  //   },
  //   courseTitle: {
  //     fontSize: 16,
  //     fontWeight: "bold",
  //   },
  courseDescription: {
    fontSize: 14,
    color: 'gray',
  },
  openButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 5,
  },
  openText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudyMaterialsScreen;
