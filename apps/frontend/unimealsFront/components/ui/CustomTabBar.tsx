import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { Badge, useTheme } from 'react-native-paper';
import ModalCreatePub from './ModalCreatePub';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [isModalVisible, setModalVisible] = useState(false);
    const { colors } = useTheme();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const leftRoutes = state.routes.filter(r => r.name === 'feed');
    const rightRoutes = state.routes.filter(r => r.name === 'chats');

    const isChatsFocused = state.routes[state.index].name === 'chats';

    const curveOpacity = useRef(new Animated.Value(1)).current;
    const fabScale = useRef(new Animated.Value(1)).current;

    // Animaciones al cambiar de pestaña
    useEffect(() => {
        Animated.parallel([
            Animated.timing(curveOpacity, {
                toValue: isChatsFocused ? 0 : 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(fabScale, {
                toValue: isChatsFocused ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isChatsFocused]);

    const bgColor = isChatsFocused ? colors.surface : colors.primary;

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    backgroundColor: bgColor,
                    borderTopWidth: isChatsFocused ? 1 : 0,
                    borderTopColor: isChatsFocused ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                },
            ]}
        >

            {/* Curva SVG */}
            <Animated.View style={[styles.container, { opacity: curveOpacity }]}>
                <Svg width={width} height={70} viewBox={`0 0 ${width} 70`}>
                    <Path
                        d={generatePath(width)}
                        fill={colors.surface}
                        stroke="#000"
                        strokeWidth={1}
                    />
                </Svg>
            </Animated.View>

            {/* Botón central (FAB) */}
            <Animated.View style={[styles.fabContainer, { transform: [{ scale: fabScale }] }]}>
                <TouchableOpacity onPress={openModal} style={styles.fab}>
                    <AntDesign name="plus" size={30} color="black" />
                </TouchableOpacity>
            </Animated.View>

            {/* Iconos izquierda */}
            <View style={styles.leftTabIcons}>
                {leftRoutes.map(route => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const iconColor = isFocused ? colors.onSurface : colors.backgroundSecondary;
                    const icon = options.tabBarIcon?.({ color: iconColor, focused: isFocused });

                    return (
                        <TouchableOpacity key={route.key} style={styles.tabButton} onPress={onPress}>
                            {icon}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Iconos derecha */}
            <View style={styles.rightTabIcons}>
                {rightRoutes.map(route => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const iconColor = isFocused ? colors.onSurface : colors.backgroundSecondary;
                    const icon = options.tabBarIcon?.({ color: iconColor, focused: isFocused });

                    return (
                        <TouchableOpacity key={route.key} style={styles.tabButton} onPress={onPress}>
                            {icon}
                            {route.name === 'chats' && (
                                <Badge size={8} style={styles.badge} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <ModalCreatePub visible={isModalVisible} onClose={closeModal} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 75,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    container: {
        position: 'absolute',
        top: 0,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 45,
        alignSelf: 'center',
    },

    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    leftTabIcons: {
        position: 'absolute',
        left: 5,
        bottom: 10,
        height: '100%',
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightTabIcons: {
        position: 'absolute',
        right: 5,
        bottom: 10,
        height: '100%',
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButton: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: 4,
        backgroundColor: '#2e9863',
    },
});

function generatePath(width: number) {
    const center = width / 2;
    const height = 70;
    const peakHeight = 85;

    return `
        M0,${height}
        H${center - 220}
        C${center - 40},${height} ${center - 40},${height - peakHeight} ${center},${height - peakHeight}
        C${center + 40},${height - peakHeight} ${center + 40},${height} ${center + 220},${height}
        H${width}
        V0
        H0
        Z
    `;
}
