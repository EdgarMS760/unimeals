import React, { useRef, useMemo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Button, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import FilterContent from './FilterContent';
import { FilterData } from '@/constants/FilterData';

export default function FilterBottomSheet() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['40%', '75%'], []);
    const { colors } = useTheme();
    const openSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const [filters, setFilters] = useState<FilterData>({
        location: [],
        category: [],
        orderBy: null,
    });

    const handleChangeFilters = (newFilters: FilterData) => {
        setFilters(newFilters);
        console.log('Filtros actualizados:', newFilters);
    };

    const handleClear = () => {
        setFilters({ location: [], category: [], orderBy: null });
    };

    return (
        <BottomSheetModalProvider>
            <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={openSheet}>
                <MaterialIcons name="tune" size={24} color="#fff" />
                <Text style={styles.fabText}>Filtros</Text>
            </TouchableOpacity>

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 24, backgroundColor: colors.background }}
                handleIndicatorStyle={{ backgroundColor: colors.outline }}
            >
                <View>
                    <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 90 }}>
                        <FilterContent
                            value={filters}
                            onClear={handleClear}
                            onChange={handleChangeFilters}
                        />
                    </BottomSheetScrollView>


                    <View style={[styles.footer, { backgroundColor: colors.background }]}>
                        <Button
                            mode="contained"
                            style={styles.applyBtn}
                            onPress={() => bottomSheetRef.current?.dismiss()}
                        >
                            Aplicar
                        </Button>
                    </View>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    fab: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    fabText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
    applyBtn: {
        borderRadius: 8,
    },
});
