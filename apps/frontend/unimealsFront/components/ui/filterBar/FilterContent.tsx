import { FilterData, orderBy, categories, locations } from '@types/FilterData';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Chip, Button, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    value: FilterData;
    onClear: () => void;
    onChange: (filters: FilterData) => void;
};


export default function FilterContent({ value, onClear, onChange }: Props) {
    const { colors } = useTheme();

    const [selectedLocations, setSelectedLocations] = useState<string[]>(value.location || []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(value.category || []);
    const [selectedOrderBy, setSelectedOrderBy] = useState<string | null>(value.orderBy || null);

    const handleSelectOrderBy = (value: string) => {
        setSelectedOrderBy(prev => (prev === value ? null : value));
    };

    useEffect(() => {
        onChange({
            location: selectedLocations,
            category: selectedCategories,
            orderBy: selectedOrderBy,
        });
    }, [selectedLocations, selectedCategories, selectedOrderBy]);


    const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleClear = () => {
        setSelectedLocations([]);
        setSelectedCategories([]);
        setSelectedOrderBy(null);
        onClear();
    };


    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.onSurface }]}>Ordenar Por:</Text>
            <View style={styles.chips}>
                {orderBy.map(order => (
                    <Chip
                        key={order}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: selectedOrderBy === order
                                    ? colors.primary
                                    : colors.backgroundSecondary,
                            },
                        ]}
                        textStyle={{
                            color: selectedOrderBy === order ? '#fff' : colors.onSurface,
                            fontWeight: selectedOrderBy === order ? 'bold' : 'normal',
                        }}
                        icon={
                            selectedOrderBy === order
                                ? () => <MaterialIcons name="check" size={16} color="white" />
                                : undefined
                        }
                        selected={selectedOrderBy === order}
                        onPress={() => handleSelectOrderBy(order)}
                    >
                        {order}
                    </Chip>
                ))}
            </View>

            <Text style={[styles.title, { color: colors.onSurface }]}>Ubicación</Text>
            <View style={styles.chips}>
                {locations.map(loc => (
                    <Chip
                        key={loc}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: selectedLocations.includes(loc)
                                    ? colors.primary
                                    : colors.backgroundSecondary,
                            },
                        ]}
                        textStyle={{
                            color: selectedLocations.includes(loc) ? '#fff' : colors.onSurface,
                            fontWeight: selectedLocations.includes(loc) ? 'bold' : 'normal',
                        }}
                        icon={
                            selectedLocations.includes(loc)
                                ? () => <MaterialIcons name="check" size={16} color="white" />
                                : undefined
                        }
                        selected={selectedLocations.includes(loc)}
                        onPress={() => toggleItem(loc, selectedLocations, setSelectedLocations)}
                    >
                        {loc}
                    </Chip>

                ))}
            </View>

            <Text style={[styles.title, { color: colors.onSurface }]}>Categorías</Text>
            <View style={styles.chips}>
                {categories.map(cat => (
                    <Chip
                        key={cat}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: selectedCategories.includes(cat)
                                    ? colors.primary
                                    : colors.backgroundSecondary,
                            },
                        ]}
                        textStyle={{
                            color: selectedCategories.includes(cat) ? '#fff' : colors.onSurface,
                            fontWeight: selectedCategories.includes(cat) ? 'bold' : 'normal',
                        }}
                        icon={
                            selectedCategories.includes(cat)
                                ? () => <MaterialIcons name="check" size={16} color="white" />
                                : undefined
                        }
                        onPress={() => toggleItem(cat, selectedCategories, setSelectedCategories)}
                    >
                        {cat}
                    </Chip>

                ))}
            </View>

            <Button mode="outlined" onPress={handleClear} style={styles.clearBtn}>
                Limpiar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 0,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    chip: {
        marginRight: 8,
        marginBottom: 8,

        borderRadius: 999,
    },
    clearBtn: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
});
