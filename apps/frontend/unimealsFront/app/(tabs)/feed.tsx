import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from '@ui/ProductCard';
import FilterBottomSheet from '@ui/filterBar/FilterBottomSheet';

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
        },
        {
            images: ['https://picsum.photos/200/300', 'https://picsum.photos/600/400'],
            title: 'gomitas',
            description: 'gomitas bien muertas',
            location: 'FCFM',
            price: '10',
            sellerName: 'Pedro Pérez',
            sellerRating: 4.5,
        },
    ];

    const [data, setData] = useState(initialData);

    // Simulación de lazy load
    const loadMore = () => {
        const moreItems = [
            {
                images: ['https://picsum.photos/seed/picsum1/600/400', 'https://picsum.photos/seed/picsum2/600/400'],
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

    return (
        <>
             <FilterBottomSheet />
            <FlatList
                contentContainerStyle={styles.list}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <ProductCard {...item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
            />
        </>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
});
