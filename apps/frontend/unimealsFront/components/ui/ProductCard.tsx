import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    useWindowDimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { Card, useTheme, Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    images: string[];
    title: string;
    description: string;
    location: string;
    price: string;
    sellerName: string;
    sellerRating: number;
};

export default function ProductCard({
    images,
    title,
    description,
    location,
    price,
    sellerName,
    sellerRating,
}: Props) {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <Card style={[styles.card, { backgroundColor: colors.surface, width: '100%' }]}>
            {/* Carrusel */}
            <View>
                <FlatList
                    data={images}
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={[styles.image, { width }]}
                            resizeMode="cover"
                        />
                    )}
                />

                {/* Dots */}
                <View style={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor:
                                        index === currentIndex ? colors.primary : '#ccc',
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Contenido */}
            <Card.Content>
                <Text style={[styles.title, { color: colors.onSurface }]}>{title}</Text>

                <View style={styles.metaRow}>
                    <MaterialIcons name="place" size={16} color={colors.primary} />
                    <Text style={[styles.location, { color: colors.onSurface }]}>{location}</Text>
                </View>

                <Text
                    style={[styles.description, { color: colors.onSurface }]}
                    numberOfLines={3}
                >
                    {description}
                </Text>

                <Text style={[styles.price, { color: colors.primary }]}>${price}</Text>

                <View style={styles.sellerRow}>
                    <Avatar.Text size={36} label={sellerName[0]} />
                    <View style={styles.sellerInfo}>
                        <Text style={[styles.sellerName, { color: colors.onSurface }]}>
                            {sellerName}
                        </Text>
                        <View style={styles.ratingRow}>
                            <MaterialIcons name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>{sellerRating.toFixed(1)}</Text>
                        </View>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}
const styles = StyleSheet.create({
    card: {
        marginVertical: 12,
        borderRadius: 12,
        elevation: 3,
        overflow: 'hidden',
        alignSelf: 'center',
        maxWidth: 600,
    },
    image: {
        height: 200,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    location: {
        marginLeft: 4,
        fontSize: 14,
    },
    description: {
        marginTop: 8,
        fontSize: 14,
    },
    price: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '700',
    },
    sellerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    sellerInfo: {
        marginLeft: 10,
    },
    sellerName: {
        fontWeight: '600',
        fontSize: 14,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 13,
        color: '#777',
    },
});
