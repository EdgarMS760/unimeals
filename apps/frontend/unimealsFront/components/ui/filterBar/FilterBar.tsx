import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    View,
} from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import FilterBottomSheet from '@ui/filterBar/FilterBottomSheet';

type Props = {
    scrollY: Animated.Value;
};

export default function FilterBar({ scrollY }: Props) {
    const { colors } = useTheme();
    const filterTranslateY = useRef(new Animated.Value(0)).current;
    const prevScrollY = useRef(0);

    useEffect(() => {
        const listenerId = scrollY.addListener(({ value }) => {
            const scrollingDown = value > prevScrollY.current;
            const scrollingUp = value < prevScrollY.current;

            if (scrollingDown) {
                Animated.timing(filterTranslateY, {
                    toValue: -100,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            } else if (scrollingUp || value <= 0) {
                Animated.timing(filterTranslateY, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }

            prevScrollY.current = value;
        });

        return () => {
            scrollY.removeListener(listenerId);
        };
    }, [scrollY]);

    return (
        <Animated.View
            style={[
                styles.containerFilter,
                {
                    transform: [{ translateY: filterTranslateY }],
                },
            ]}
        >
            <FilterBottomSheet />
            <View style={styles.searchWrapper}>
                <TextInput
                    placeholder="¿Se te antoja algo?"
                    mode="outlined"
                    dense
                    style={styles.searchInput}
                    contentStyle={{ paddingVertical: 4, color: "#000" }}
                    right={<TextInput.Icon icon="magnify" color="#000" />}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    containerFilter: {
        zIndex: 10,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 8,
    },
    searchWrapper: {
        marginTop: 8,
    },
    searchInput: {
        borderRadius: 8,
    },
});
