import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import { useThemeColor } from '@/hooks/useThemeColor';
import {useState} from "react";


export function InputView() {
    const [value, setValue] = useState('');

    return(
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput label="Título" mode="outlined" style={styles.inputStyle}></TextInput>

        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        gap: 3
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    inputStyle: {
        width: '100%',
        padding: 12,
        height: 47,
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 12
    },
});
