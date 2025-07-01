import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';
import ProductCard from '@ui/ProductCard';
import { ActivityIndicator } from 'react-native-paper';

export default function Feed() {
    const initialData = [
        {
            images: ['https://picsum.photos/200/300', 'https://picsum.photos/600/400'],
            title: 'tacos',
            description: '5 tacos con salsa',
            location: 'FCFM',
            price: '80',
            sellerName: 'john doe',
            sellerRating: 4.7,
            deadline: "18:00",
            isCreator: false,
            onEditPost: () => console.log('Editar post'),
            onSendMessage: () => console.log('Enviar mensaje'),
        },
        {
            images: ['https://picsum.photos/200/300', 'https://picsum.photos/600/400'],
            title: 'gomitas',
            description: 'gomitas bien muertas',
            location: 'FCFM',
            price: '10',
            sellerName: 'Pedro Pérez',
            sellerRating: 4.5,
            deadline: "18:00",
            isCreator: false,
            onEditPost: () => console.log('Editar post'),
            onSendMessage: () => console.log('Enviar mensaje'),
        },
    ];
    const handleDismissBanner = () => {
        Animated.timing(bannerAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setHasNewPosts(false);
        });
    };

    const [data, setData] = useState(initialData);
    const [hasNewPosts, setHasNewPosts] = useState(false);

    const flatListRef = useRef<FlatList>(null);
    const bannerAnim = useRef(new Animated.Value(0)).current;

    //deteccion de nuevas publicaciones
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasNewPosts(true);
            Animated.timing(bannerAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }, 3000); // después de 3 segundos

        return () => clearTimeout(timer);
    }, []);

    const handleLoadNew = () => {
        const newItems = [
            {
                images: ['https://picsum.photos/seed/new1/600/400'],
                title: 'Nuevo producto',
                description: 'Algo recien subido',
                location: 'FCFM',
                price: '99',
                sellerName: 'Nuevo Vendedor',
                sellerRating: 4.8,
                deadline: "18:00",
                isCreator: true, // o true según sea necesario
                onEditPost: () => console.log('Editar nuevo post'),
                onSendMessage: () => console.log('Enviar mensaje nuevo'),
            },
        ];

        setData((prev) => [...newItems, ...prev]);

        Animated.timing(bannerAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setHasNewPosts(false);
        });

        // Ir al inicio del scroll
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const loadMore = () => {
        const moreItems = [
            {
                images: ['https://picsum.photos/seed/picsum1/600/400'],
                title: 'test',
                description: 'Test item description',
                location: 'FCFM',
                price: '90',
                sellerName: 'Ana Ríos',
                sellerRating: 4.9,
            },
        ];
        setData((prev) => [...prev, ...moreItems]);
    };

    const [refreshing, setRefreshing] = useState(false);

    const refreshData = () => {
        if (refreshing) return;

        setRefreshing(true);
        setHasNewPosts(false);

        // ir al inicio
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

        setTimeout(() => {
            // animacion para ocultar banner
            Animated.timing(bannerAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setHasNewPosts(false);
            });

            setTimeout(() => {
                const refreshedItems = [
                    {
                        images: ['https://picsum.photos/seed/refreshed/600/400'],
                        title: 'Producto actualizado',
                        description: 'Contenido actualizado',
                        location: 'FCFM',
                        price: '100',
                        sellerName: 'Refresh User',
                        sellerRating: 4.9,
                        deadline: "18:00",
                        isCreator: true,
                        onEditPost: () => console.log('Editar post actualizado'),
                        onSendMessage: () => console.log('Enviar mensaje actualizado'),
                    },
                    ...initialData,
                ];

                setData(refreshedItems);
                setRefreshing(false);
            }, 1000); // carga simulada

        }, 400); // esperar que se legue al top
    };


    return (
        <View style={{ flex: 1 }}>

            <FlatList
                ref={flatListRef}
                contentContainerStyle={styles.list}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <ProductCard {...item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
                refreshing={refreshing}
                onRefresh={refreshData}
            />

            {hasNewPosts && !refreshing && (
                <Animated.View
                    style={[
                        styles.newPostsBanner,
                        {
                            opacity: bannerAnim,
                            transform: [
                                {
                                    translateY: bannerAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.bannerContent}>
                        <TouchableOpacity onPress={refreshData}>
                            <Text style={styles.newPostsText}>Hay nuevas publicaciones</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDismissBanner}>
                            <Text style={styles.dismissText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}



        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        paddingBottom: 120,
    },
    newPostsBanner: {
        position: 'absolute',
        top: 16,
        alignSelf: 'center',
        backgroundColor: '#2e9863',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        zIndex: 10,
        elevation: 5,
    },
    newPostsText: {
        color: 'white',
        fontWeight: 'bold',
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
    },
    dismissText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 4,
    },
    loaderContainer: {
        top: 60,
        alignSelf: 'center',
        zIndex: 20,
    },

});
