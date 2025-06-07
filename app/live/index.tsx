import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ContentWrapper from '@/components/contentwrapper';
import { AntDesign, EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import SimpleInput from '@/components/simpleInput';
import Header from '@/components/header';
import useGetQuery from '@/hooks/get-query.hook';
import { apiUrls } from '@/apis/apis';
import { Video, ResizeMode } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import { Share } from 'react-native';
import usePostQuery from '@/hooks/post-query.hook';
import { useSelector } from 'react-redux';

export default function LiveScreen() {
  const video = useRef(null);
  const [currentLive, setCurrenetLive] = useState({});
  const { getQuery, loading } = useGetQuery();
  const { postQuery } = usePostQuery();
  const [isBuffering, setIsBuffering] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatWebSocket = useRef<any>(null);
  const { user } = useSelector((state) => state.user);

  // console.log('current live=================', currentLive);

  useFocusEffect(
    useCallback(() => {
      getQuery({
        url: apiUrls.stream.fetchLive,
        onSuccess: (res) => {
          setCurrenetLive(res.data);
        },
      });
    }, []) // Dependency array remains empty to avoid re-execution
  );

  const shareOnSocial = async () => {
    const videoUrl =
      currentLive?.streamUrl ||
      'https://6b879004354a.ap-south-1.playback.live-video.net/api/video/v1/ap-south-1.116981808722.channel.bFpcIjcN1i86.m3u8';
    const message = `Check out this live video: ${
      currentLive?.title || 'Live Stream'
    }\n${videoUrl}`;

    try {
      await Share.share({
        message,
        url: videoUrl, // Some platforms use url instead of including it in the message
        title: currentLive?.title || 'Live Stream',
      });
    } catch (error) {
      console.error('Error sharing live video:', error);
    }
  };

  const connectToChat = async () => {
    postQuery({
      url: apiUrls.stream.getChatToken,
      postData: {
        chatRoomArn: currentLive?.chatRoomId,
        userId: 'user',
      },
      onSuccess: (res) => {
        chatWebSocket.current = new WebSocket(
          'wss://edge.ivschat.ap-south-1.amazonaws.com',
          res?.token
        );

        chatWebSocket.current.onmessage = (event) => {
          const newMessage = JSON.parse(event.data);
          setChatMessages((prev) => [...prev, newMessage]);
        };
      },
    });
  };

  const sendMessage = () => {
    if (chatWebSocket.current) {
      const payload = {
        Action: 'SEND_MESSAGE',
        // SenderName: 'Forhad',
        Content: message,
        attributes: {
          senderName: user?.name, // Custom attribute for sender name
        },
      };
      chatWebSocket.current.send(JSON.stringify(payload));
      setMessage('');
    }
  };

  useEffect(() => {
    connectToChat();
  }, [currentLive]);

  return (
    <ContentWrapper>
      <View style={styles.container}>
        <Header heading={'Live'} showLeft />

        {/* Image */}
        <View style={styles.imageCrad}>
          {currentLive?.isLive ? (
            <View>
              <Video
                ref={video}
                style={{
                  width: '100%',
                  height: 200,
                }}
                source={{
                  uri: currentLive?.playbackUrl,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                // isLooping
                shouldPlay
                onPlaybackStatusUpdate={(status) =>
                  setIsBuffering(status?.isBuffering)
                }
              />

              {/* Show Loader when Buffering */}
              {/* {isBuffering && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
                  }}
                >
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              )} */}
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#808080',
              }}
            >
              <Text>No Live is running</Text>
            </View>
          )}
        </View>
        <Text style={styles.liveText}>Live</Text>

        {/* Viewer   */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', gap: 10, marginLeft: 15 }}>
            <Text style={styles.classText}>{currentLive?.title}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginRight: 15 }}>
            <TouchableOpacity onPress={() => shareOnSocial()}>
              <View style={{ flexDirection: 'row', gap: 2, marginRight: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Share</Text>
                <EvilIcons name="sc-telegram" size={28} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Chat  */}
        <FlatList
          style={{ flex: 1 }}
          data={chatMessages}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 10,
                  marginLeft: 15,
                }}
              >
                <Image
                  source={require('../../assets/images/classroom.jpg')}
                  style={{ width: 30, height: 30, borderRadius: 50 }}
                />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 14, color: 'gray' }}
                >
                  {item?.Attributes?.senderName}
                </Text>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'gray' }}
                >
                  {item?.Content}
                </Text>
              </View>
            );
          }}
        />

        {/* chat here */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SimpleInput
            value={message}
            placeholder="Type a message"
            style={{ padding: 15, width: '80%' }}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: Colors.white, textAlign: 'center' }}>
              Send
            </Text>
          </TouchableOpacity>
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
    marginTop: 20,
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 10,
    margin: 10,
    width: '20%',
    textAlign: 'center',
  },
  classText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '500',
    marginTop: 1,
    margin: 15,
  },
});
