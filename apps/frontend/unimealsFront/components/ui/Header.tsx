import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: "white" }]}>
            {/* Logo */}
            <Image
                source={require('@assets/images/logoUniMealsNoLetras.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Buscador */}
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

            {/* Botón de perfil */}
            <TouchableOpacity onPress={() => navigation.navigate('login' as never)}>
                <IconButton icon="account" size={48} iconColor='black'  />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    logo: {
        width: 48,
        height: 48,
        marginLeft: 12,
    },
    searchWrapper: {
        flex: 1,
        marginHorizontal: 12,
        marginStart: 24,
    },
    searchInput: {
        backgroundColor: 'transparent',
        height: 40,
    },
});
