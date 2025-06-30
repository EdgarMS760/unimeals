import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { TextInput, IconButton, useTheme } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import FilterBottomSheet from '@ui/filterBar/FilterBottomSheet';
import DrawerMenu from '@ui/DrawerMenu';
import { RootStackParamList, DrawerMenuItem } from '@types/navigation';
import { router, usePathname, useRouter } from 'expo-router';

type NavigationProps = NavigationProp<RootStackParamList>;

const Header: React.FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProps>();
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const { colors } = useTheme();
  const handleMenuPress = (): void => {
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = (): void => {
    setIsDrawerVisible(false);
  };

  const handleMenuItemPress = (item: DrawerMenuItem): void => {
    console.log('Menu item pressed:', item);

    // Manejar la navegación según el item seleccionado
    switch (item.id) {
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'orders':
        navigation.navigate('Orders');
        break;
      case 'favorites':
        navigation.navigate('Favorites');
        break;
      case 'addresses':
        navigation.navigate('Addresses');
        break;
      case 'payment':
        navigation.navigate('Payment');
        break;
      case 'notifications':
        navigation.navigate('Notifications');
        break;
      case 'help':
        navigation.navigate('Help');
        break;
      case 'settings':
        navigation.navigate('Settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = (): void => {
    console.log('Logging out...');
  };
  const pathname = usePathname();
  const isChats = pathname?.endsWith('/chats');

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.surface }}>
        <View style={styles.container}>
          {!isChats ? (
            <View style={styles.containerFilter}>
              <FilterBottomSheet />
              <View style={styles.searchWrapper}>
                <TextInput
                  placeholder="¿Se te antoja algo?"
                  mode="outlined"
                  dense
                  style={styles.searchInput}
                  contentStyle={{ paddingVertical: 4, color: '#000' }}
                  right={<TextInput.Icon icon="magnify" color={colors.onSurface} />}
                />
              </View>
            </View>
          ) : (
            <IconButton
              icon="arrow-left"
              size={40}
              iconColor={colors.onSurface}
              onPress={() => router.push('/feed')}
            />

          )}


          {/* Botón de menú */}
          <TouchableOpacity onPress={handleMenuPress} activeOpacity={0.7}>
            <IconButton icon="menu" size={40} iconColor={colors.onSurface} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* DrawerMenu */}
      <DrawerMenu
        visible={isDrawerVisible}
        onClose={handleCloseDrawer}
        onMenuItemPress={handleMenuItemPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 60,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  containerFilter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  searchWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  searchInput: {
    backgroundColor: 'transparent',
    height: 40,
  },
});

export default Header;