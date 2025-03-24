import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import Constants from 'expo-constants';

// شاشة الصفحة الرئيسية
function HomeScreen() {
  return (
    <ImageBackground
      source={require('./assets/back.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={[styles.safeArea, { paddingTop: Constants.statusBarHeight }]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Welcome to the Home Screen!</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// شاشة البروفايل
function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const userName = 'ℳ𝒜ℛ𝒪'; // اسم ثابت غير قابل للتعديل
  const userId = '808865621';

  // طلب إذن الوصول إلى الصور عند تحميل المكون
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (hasPermission === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const copyUserId = async () => {
    await Clipboard.setStringAsync(userId);
    Alert.alert('Copied!', 'User ID has been copied to clipboard.');
  };

  return (
    <ImageBackground
      source={require('./assets/back.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={[styles.safeArea, { paddingTop: Constants.statusBarHeight }]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <ScrollView style={styles.container}>
          {/* مربع أبيض شفاف لمعلومات الشخصية */}
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <Image source={require('./assets/default_profile.png')} style={styles.profileImage} />
                )}
              </TouchableOpacity>
              <View style={styles.userInfo}>
                {/* الاسم ثابت غير قابل للتعديل */}
                <Text style={styles.userNameText}>{userName}</Text>
                <View style={styles.idRow}>
                  <Text style={styles.idText}>ID: {userId}</Text>
                  <TouchableOpacity onPress={copyUserId} style={styles.copyButton}>
                    <Image source={require('./assets/icon_copy.png')} style={styles.copyIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.levelRow}>
                  <Image source={require('./assets/level1.png')} style={styles.levelIcon} />
                  <Image source={require('./assets/level2.png')} style={styles.levelIcon} />
                </View>
                <Text style={styles.genderText}>Male</Text>
                {/* معلومات الحساب */}
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statText}>4</Text>
                    <Text style={styles.statLabel}>Following</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statText}>265</Text>
                    <Text style={styles.statLabel}>Fans</Text>
                  </View>
                  <View style={styles.statItem}>
                  </View>
                  <View style={styles.statItem}>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* مربع أبيض شفاف للأيقونات */}
          <View style={styles.iconsContainer}>
            <View style={styles.iconRow}>
              <Image source={require('./assets/icon_gift_recharge_diamond.png')} style={styles.smallIcon} />
              <Text style={styles.currencyText}>745411</Text>
              <View style={styles.dividerVertical} />
              <Image source={require('./assets/icon_card_bee.png')} style={styles.smallIcon} />
              <Text style={styles.currencyText}>1654747</Text>
              <Image source={require('./assets/icon_card_wallet.png')} style={styles.walletIcon} />
            </View>
            <View style={styles.iconLabelRow}>
              <Text style={styles.currencyLabel}>Diamonds</Text>
              <Text style={styles.currencyLabel}>Coins</Text>
            </View>
          </View>

          {/* باقي الأقسام */}
          <View style={[styles.section, styles.greySection]}>
            <Text style={styles.subTitle}>Link phone number or email address</Text>
            <Text style={styles.description}>
              To get <Text style={styles.highlightText}>Porsche911 EVO</Text> ride up to 14 days
            </Text>
            <View style={styles.linkContent}>
              <Text style={styles.linkText}>Link now</Text>
              <TouchableOpacity onPress={() => {}}>
                <Image source={require('./assets/room_pk_invite_button.png')} style={styles.linkButtonImage} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.section, styles.greySection]}>
            <View style={styles.achievementRow}>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_mall.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Points Mall</Text>
              </View>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_hot_activities.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Activities</Text>
              </View>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_network.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Network</Text>
              </View>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_help.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Help</Text>
              </View>
            </View>
            <View style={styles.achievementRow}>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_vip.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>VIP</Text>
              </View>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_kinqhet.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Knight</Text>
              </View>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_ride.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Ride</Text>
              </View>
              <View style={styles.achievementItem}>
                <Image source={require('./assets/icon_card_grid_medal.png')} style={styles.achievementIcon} />
                <Text style={styles.achievementText}>Medal</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.column}>
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_admin.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>My admin</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_living_duration.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>Live duration</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_hot_question.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>Top Questions</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_setting.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>Settings</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_grid_network.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>Linked List</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_frames.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>Frames</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingItem}>
                <Image source={require('./assets/icon_card_level.png')} style={styles.largeIcon} />
                <Text style={styles.settingText}>Level</Text>
                <Image source={require('./assets/icon_up_array.png')} style={styles.arrowIcon} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// إنشاء شريط التنقلات
const Tab = createBottomTabNavigator();

// مكون مخصص لخلفية شريط التبويب
const CustomTabBarBackground = () => (
  <ImageBackground
    source={require('./assets/galaxy-stars-colorful-space-clouds-phone-wallpaper-4k-uhdpaper.com-177@2@a.jpg')}
    style={styles.tabBarBackground}
  />
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: '#666',
          tabBarBackground: () => <CustomTabBarBackground />,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// أنماط التصميم
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  profileInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
    marginTop: 10,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  idText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#000',
  },
  copyButton: {
    padding: 8,
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  levelRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  levelIcon: {
    width: 50,
    height: 20,
    marginRight: 8,
  },
  genderText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // العناصر تبدأ من اليسار
    alignItems: 'center',
    marginTop: 0,
    width: '100%', // يأخذ العرض الكامل
  },
  statItem: {
    alignItems: 'center',
    marginRight: 30, // مسافة بين العناصر
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  iconsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallIcon: {
    width: 24,
    height: 24,
  },
  walletIcon: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 16,
  },
  iconLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currencyLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 16,
  },
  greySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  highlightText: {
    color: '#FFD700',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  linkText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#000',
  },
  linkButtonImage: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  achievementItem: {
    alignItems: 'center',
    width: '25%',
  },
  achievementIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  column: {
    flexDirection: 'column',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#fff',
  },
  largeIcon: {
    width: 30,
    height: 30,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  tabBarBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
});