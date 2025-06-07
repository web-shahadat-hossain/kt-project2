import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ContentWrapper from '@/components/contentwrapper';
import { AntDesign, Entypo, EvilIcons, Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import SimpleInput from '@/components/simpleInput';
import Header from '@/components/header';

export default function LiveDescriptionScreen() {
  return (
    <ContentWrapper>
      <View style={styles.container}>
        <Header heading={'Live'} showLeft />

        {/* Image */}
        <View style={styles.imageCrad}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBGQSufAjHBUgz031Z_c0--Qxs0jcxQGU4DXwkKOgttjPm56mbptJxoePkVtG665Oaxg&usqp=CAU',
            }}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
            }}
          />
        </View>

        {/* Description */}
        <View style={styles.desc}>
          <Text style={styles.classText1}>Description</Text>
          <TouchableOpacity>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.liveText}>Live</Text>
        <Text style={styles.classText}>English Class Live</Text>

        {/* Description  */}
        <Text style={styles.descText}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
          delectus sit quisquam dolorum saepe dolorem beatae excepturi cumque
          quas maxime velit facere quam, labore itaque id consequuntur dolore
          inventore temporibus minus sint, iste necessitatibus commodi
          asperiores! Consequuntur aperiam quas, esse maiores, facere inventore
          mollitia placeat voluptate laudantium repudiandae! Magnam atque
          repellendus aut corrupti maiores a, placeat ullam?
          <Text style={styles.seeMore}>See More</Text>
        </Text>

        {/* tag */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>#english</Text>
          <Text style={styles.tagText}>#speaking</Text>
          <Text style={styles.tagText}>#communication</Text>
        </View>
      </View>
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  imageCrad: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  liveText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 10,
    margin: 15,
    width: '20%',
    textAlign: 'center',
  },
  classText: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 1,
    margin: 15,
  },
  classText1: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
    margin: 15,
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    margin: 10,
  },

  descText: {
    color: Colors.placeholder,
    fontSize: 14,
    marginTop: 1,
    margin: 15,
  },
  seeMore: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    margin: 15,
  },
  tag: {
    flexDirection: 'row',
    gap: 10,
    margin: 15,
  },
  tagText: {
    color: Colors.placeholder,
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: '#D1D1D6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
});
