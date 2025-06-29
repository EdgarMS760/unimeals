import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import ModalCreatePub from './ModalCreatePub';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);


    // se filtran las rutas para los íconos de la izquierda y derecha
    const leftRoutes = state.routes.filter(r => r.name === 'feed');
    const rightRoutes = state.routes.filter(r => r.name === 'chats');

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Svg width={width} height={70} viewBox={`0 0 ${width} 70`}>
                    <Path
                        d={generatePath(width)}
                        fill="#ffffff"   // curva blanca
                        stroke="#000"
                        strokeWidth={1}
                    />
                </Svg>
            </View>

            {/* Botón central */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    onPress={openModal}
                    style={styles.fab}
                >
                    <AntDesign name="plus" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Íconos Izquierda */}
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

                    const iconColor = isFocused ? '#000' : '#d6d6d6';
                    const icon = options.tabBarIcon?.({ color: iconColor, focused: isFocused });

                    return (
                        <TouchableOpacity key={route.key} style={styles.tabButton} onPress={onPress}>
                            {icon}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Íconos Derecha */}
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

                    const iconColor = isFocused ? '#000' : '#d6d6d6';
                    const icon = options.tabBarIcon?.({ color: iconColor, size: 26, focused: isFocused});

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

        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        height: 75,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#2e9863',
    },
    container: {
        position: 'absolute',
        top: 0,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 45,
        left: '50%',
        transform: [{ translateX: -30 }],
        zIndex: 10
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
