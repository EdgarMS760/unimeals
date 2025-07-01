import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StatusBar,
    Platform,
    Easing,
} from 'react-native';
import { IconButton, Divider, Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

interface MenuItem {
    id: string;
    title: string;
    icon: string;
    isLogout?: boolean;
}

interface DrawerMenuProps {
    visible: boolean;
    onClose: () => void;
    onMenuItemPress?: (item: MenuItem) => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose, onMenuItemPress }) => {
    const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
    const overlayAnim = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const [internalVisible, setInternalVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            setInternalVisible(true); // Asegura que el modal esté montado

            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 350,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(overlayAnim, {
                    toValue: 1,
                    duration: 350,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Cierra con animación, luego desmonta
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: DRAWER_WIDTH,
                    duration: 300,
                    easing: Easing.inOut(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(overlayAnim, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setInternalVisible(false);
            });
        }
    }, [visible]);

    const menuItems: MenuItem[] = [
        { id: 'profile', title: 'Mi Perfil', icon: 'account-circle' },
        { id: 'settings', title: 'Configuración', icon: 'cog' },
    ];

    const handleMenuItemPress = (item: MenuItem): void => {
        onMenuItemPress?.(item);
        onClose();
    };
    const { colors } = useTheme();
    return (
        <Modal
            visible={internalVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
        >

            <StatusBar
                backgroundColor={visible ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}
                barStyle="light-content"
                translucent
            />
            <View style={styles.container}>
                {/* Overlay oscuro */}
                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            opacity: overlayAnim,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.overlayTouchable}
                        activeOpacity={1}
                        onPress={onClose}
                    />
                </Animated.View>

                {/* Drawer */}
                <Animated.View
                    style={[
                        styles.drawer,
                        {
                            transform: [{ translateX: slideAnim }],
                            paddingTop: insets.top,
                            backgroundColor: colors.surface
                        },
                    ]}
                >
                    <View style={styles.drawerContent}>
                        {/* Header del drawer */}
                        <View style={[
                            styles.drawerHeader,
                            {
                                paddingTop: Platform.OS === 'ios' ? 8 : 20, // Menos padding en iOS
                                backgroundColor: colors.surface
                            }
                        ]}>
                            <View style={styles.userInfo}>
                                <Avatar.Text size={56} label="JD" style={styles.avatar} />
                                <View style={styles.userDetails}>
                                    <Text style={{ color: colors.onSurface, fontWeight: 'bold' }}>Juan Pérez</Text>
                                    <Text style={{ color: colors.textSecondary }}>juan@example.com</Text>
                                </View>
                            </View>
                            <IconButton
                                icon="close"
                                size={24}
                                iconColor={colors.onSurface}
                                onPress={onClose}
                                style={styles.closeButton}
                            />
                        </View>

                        <Divider style={styles.divider} />

                        {/* Lista de opciones */}
                        <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
                            {menuItems.map((item, index) => (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        style={[
                                            styles.menuItem,
                                        ]}
                                        onPress={() => handleMenuItemPress(item)}
                                        activeOpacity={0.7}
                                    >
                                        <IconButton
                                            icon={item.icon}
                                            size={24}
                                            iconColor={colors.onSurface}
                                            style={styles.menuIcon}
                                        />
                                        <Text
                                            style={[
                                                styles.menuItemText,
                                                item.isLogout && styles.logoutText,
                                                { color: colors.onSurface },
                                            ]}
                                        >
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                    {index < menuItems.length - 1 && !item.isLogout && (
                                        <View style={styles.itemSeparator} />
                                    )}
                                </View>
                            ))}
                        </ScrollView>


                        <View style={[
                            styles.drawerFooter,
                            {
                                paddingBottom: Math.max(insets.bottom, 16),
                            }
                        ]}>
                            <View >
                                <TouchableOpacity
                                    style={[styles.logoutItem,
                                    ]}
                                    onPress={() => { console.log('Cerrar Sesión'); }}
                                    activeOpacity={0.7}
                                >
                                    <IconButton
                                        icon="logout"
                                        size={24}
                                        iconColor={colors.error}
                                        style={styles.menuIcon}
                                    />
                                    <Text
                                        style={[
                                            styles.logoutText,
                                            { color: colors.error },
                                        ]}
                                    >
                                        Cerrar Sesión
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.appVersion}> Unimeals Versión 1.0.0</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayTouchable: {
        flex: 1,
    },
    drawer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    drawerContent: {
        flex: 1,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderTopRightRadius: Platform.OS === 'ios' ? 12 : 0, // Bordes redondeados en iOS
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        backgroundColor: '#007bff',
    },
    userDetails: {
        marginLeft: 12,
        flex: 1,
    },

    closeButton: {
        margin: 0,
    },
    divider: {
        backgroundColor: '#e0e0e0',
    },
    menuList: {
        flex: 1,
        paddingTop: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 56,
    },
    menuIcon: {
        margin: 0,
        marginRight: 12,
    },
    menuItemText: {
        fontSize: 16,
        flex: 1,
    },
    itemSeparator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 64,
    },
    logoutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        minHeight: 56,
        justifyContent: 'flex-end',
    },
    logoutText: {
        color: '#e74c3c',
        fontWeight: '500',
    },
    logoutDivider: {
        backgroundColor: '#e0e0e0',
        marginTop: 8,
    },
    drawerFooter: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'center',
    },
    appVersion: {
        fontSize: 12,
        color: '#999',
    },
});

export default DrawerMenu;