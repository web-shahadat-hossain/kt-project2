import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
} from '@expo/vector-icons';
import ContentWrapper from '@/components/contentwrapper';
import { moderateScale } from '@/utils/metrices';
import { useSelector } from 'react-redux';
import { Colors } from '@/constants/Colors';
import PrimaryButton from '@/components/common/PrimaryButton';
import { router, useFocusEffect } from 'expo-router';
import Toast from 'react-native-toast-message';
import { apiUrls } from '@/apis/apis';
import useGetQuery from '@/hooks/get-query.hook';
import usePostQuery from '@/hooks/post-query.hook';
import WithdrawModal from '@/components/withdrawModal';

const { width } = Dimensions.get('window');

const WalletScreen = () => {
  const [user, setUser] = useState({});
  const { getQuery } = useGetQuery();
  const { postQuery } = usePostQuery();
  const [transaction, setTransaction] = useState([]);

  // State to control modal visibility
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);

  // get user data
  useFocusEffect(
    useCallback(() => {
      getQuery({
        url: apiUrls.user.getProfile,
        onSuccess: (res: any) => {
          setUser(res.data);
        },
      });
    }, [])
  );

  // share referral code on social media using Expo Sharing
  const shareOnSocial = async (code) => {
    const message = `Join now and use my referral code: ${code} to get rewards!`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing referral code:', error);
    }
  };

  // convert points
  const convertPoint = () => {
    postQuery({
      url: apiUrls.wallet.convert,
      onSuccess: (res) => {
        setUser((prevUser) => ({
          ...prevUser,
          balance: prevUser.balance + prevUser.points * 100,
          points: 0,
        }));

        Toast.show({
          type: 'success',
          text1: 'Points Convert successfully!',
        });
      },
      onFail: (err) => {
        console.error('Error during points conversion:', err);

        Toast.show({
          type: 'error',
          text1: err.message || 'Something went wrong. Please try again.',
        });
      },
    });
  };

  // get transaction
  const getTransaction = () => {
    getQuery({
      url: apiUrls.wallet.transactions(user?._id),
      onSuccess: (res: any) => {
        setTransaction(res.data);
        console.log('transaction?????????', res.data);
      },
      onFail: (err) => {
        console.error('failed to get transaction:', err);

        Toast.show({
          type: 'error',
          text1: err.message || 'Something went wrong. Please try again.',
        });
      },
    });
  };

  useEffect(() => {
    getTransaction();
  }, [user]);

  // Function to open the modal - ADD DEBUGGING
  const openWithdrawModal = () => {
    setIsWithdrawModalVisible(true);
    console.log('Modal state set to true'); // Debug log
  };

  // Function to close the modal
  const closeWithdrawModal = () => {
    console.log('Closing withdraw modal...'); // Debug log
    setIsWithdrawModalVisible(false);
  };

  // Function to handle form submission
  const handleWithdrawSubmit = (formData) => {
    console.log('Withdraw form data:', formData);
    // Add your withdrawal logic here
  };

  // Debug: Log modal state changes
  useEffect(() => {
    console.log('Modal visibility changed:', isWithdrawModalVisible);
  }, [isWithdrawModalVisible]);

  return (
    <ContentWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.profileContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.userContainer}>
              <Image
                source={require('../../assets/images/classroom.jpg')}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={styles.userName}>{user?.name || 'Jhon Doe'}</Text>
            </View>
            <View style={styles.IconContainer}>
              <TouchableOpacity>
                <AntDesign
                  name="search1"
                  size={20}
                  color="white"
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome
                  style={styles.searchIcon}
                  name="bell"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.totalDeposit}>Total Deposit</Text>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            <View>
              <Text style={styles.coinText}>{user?.points || 0} Coins</Text>
            </View>

            {/* refer code */}
            <View style={styles.referralCode}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <Text style={{ color: Colors.gray }}>
                  Referral Code: {user?.referralCode || '123456'}
                </Text>
                <TouchableOpacity
                  onPress={() => shareOnSocial(user?.referralCode || '123456')}
                >
                  <FontAwesome name="share-alt" size={20} color="#387ade" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* convert button */}
          <TouchableOpacity
            style={styles.convertContainer}
            onPress={convertPoint}
          >
            <View style={styles.convertButton}>
              <Text
                style={{ color: '#007BFF', fontSize: 14, fontWeight: '400' }}
              >
                Convert
              </Text>
              <FontAwesome6 name="arrows-rotate" size={14} color="#007BFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.currencyText}>≈ {user?.balance / 100} ₹</Text>
          <Text style={{ color: 'gray' }}>
            You can withdraw your money once you have at least 100 coins
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonDeposit}>
              <PrimaryButton
                text="Deposit"
                textStyle={styles.buttonText}
                isOutlined
                onPress={() => router.push('/wallet/deposit')}
              />
            </TouchableOpacity>

            <View style={styles.buttonDeposit}>
              <PrimaryButton
                text="Withdraw"
                isOutlined
                textStyle={styles.buttonText}
                onPress={openWithdrawModal}
              />
            </View>
          </View>
        </View>

        {/* Withdraw Modal - ADD DEBUG INFO */}
        <WithdrawModal
          visible={isWithdrawModalVisible}
          onClose={closeWithdrawModal}
          onSubmit={handleWithdrawSubmit}
        />

        {/* Transactions */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}
        >
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text style={styles.sectionTitle}>See All</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={transaction}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <Image
                      source={require('../../assets/images/classroom.jpg')}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                    <View>
                      <Text style={styles.transactionName}>{user?.name}</Text>
                      <Text
                        style={[
                          styles.transactionType,
                          item?.transactionType === 'C'
                            ? styles.negative
                            : styles.positive,
                        ]}
                      >
                        {item?.transactionType === 'C' ? 'Withdraw' : 'Deposit'}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.transactionAmount,
                        item.type === 'C' ? styles.negative : styles.positive,
                      ]}
                    >
                      {item?.amount} ₹
                    </Text>
                    <Text style={styles.transactionTime}>
                      {new Date(item?.date).toLocaleTimeString()}{' '}
                      {new Date(item?.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  button: {
    fontSize: 14,
    padding: 5,
  },
  profileContainer: {
    backgroundColor: '#447dce',
    height: 220,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'space-between',
    marginTop: moderateScale(80),
    gap: 10,
  },
  IconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'space-between',
    marginTop: moderateScale(80),
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchIcon: {
    marginLeft: 'auto',
    backgroundColor: 'white',
    color: Colors.primary,
    borderRadius: 40,
    padding: 2,
  },
  balanceContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 15,
    marginTop: -45,
  },
  totalDeposit: {
    fontSize: 20,
    color: 'gray',
  },
  coinText: { fontSize: 14, fontWeight: 'bold', color: '#0052CC' },
  referralCode: {
    fontSize: 14,
    color: 'gray',
    backgroundColor: '#F8F9FD',
    padding: 5,
    borderRadius: 10,
  },
  currencyText: { fontSize: 18, color: 'gray' },
  buttonRow: { flexDirection: 'row', marginTop: 10, gap: 10 },
  buttonDeposit: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '38%',
  },
  convertContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '48%',
    marginRight: 10,
  },
  convertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c7d3e2',
    borderRadius: 10,
    width: '100%',
    height: 40,
    gap: 10,
  },
  buttonWithdraw: {
    backgroundColor: '#0052CC',
    borderRadius: 10,
    width: '48%',
  },
  buttonText: { color: 'white', fontSize: 14 },
  sectionTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  transactionName: { fontSize: 16 },
  transactionAmount: { fontSize: 16 },
  negative: { color: 'red' },
  positive: { color: 'green' },
  transactionTime: { fontSize: 12, color: 'gray' },
  transactionType: { fontSize: 14 },
});

export default WalletScreen;
