import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useState} from "react";
import {Avatar, Button, IconButton, TextInput} from "react-native-paper";
import Aaron from "@assets/images/Aaron.jpg";
import {useNavigation} from "@react-navigation/native";

type MyComponentProps = {
    posPageIndex: string;
    setPosImageIndex: React.Dispatch<React.SetStateAction<string>>;
};

export function LogInForm({posPageIndex, setPosImageIndex}: MyComponentProps) {
    const navigation = useNavigation();
    const onPressBtn =  () => {}
    const inputColors = {
        background: '#31BB7C',
        text: '#FFFFFF',
        placeholder: '#FFFFFF',
        primary: '#FFFFFF',
        outline: '#FFFFFFBE',
        onSurfaceVariant: '#FFFFFFBE',
    }

    return(
        <View style={styles.formContainer}>
            <View style={styles.photoContainer}>
                <Avatar.Icon size={96} icon="account"/>
            </View>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.inputStyle}
                theme={{
                    colors: inputColors
                }}
            />
            <TextInput
                label="Contraseña"
                mode="outlined"
                style={styles.inputStyle}
                theme={{
                    colors: inputColors
                }}
            />
            <Button
                mode="contained"
                onPress={onPressBtn}
                style={styles.btnStyle}
                labelStyle={{ color: 'white', fontWeight: 'bold', padding: 4 }}
            >
                Ingresar
            </Button>
            <View style={styles.textLinkContainer}>
                <Text style={styles.textLabel}>¿No tienes una cuenta?</Text>
                <Pressable
                    onPress={() => {
                        setPosImageIndex('2')
                    }}
                    >
                    {({ pressed }) => (
                        <Text style={[styles.textLink, { opacity: pressed ? 0.5 : 1 }]}>
                            Registrarse
                        </Text>
                    )}
                </Pressable>
            </View>
            <View style={styles.textLinkContainer}>
                <Text style={styles.textLabel}>o</Text>
                <Pressable
                    onPress={() => {

                    }}
                >
                    {({pressed}) => (
                        <Text style={[styles.textLink, {opacity: pressed ? 0.5 : 1}]}>
                            Continuar como Invitado
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        height: '100%',
        paddingBottom: 6,
        gap: 6,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    inputStyle: {
        marginBottom: 8,
        backgroundColor: 'transparent',
        width: '88%'
    },
    btnStyle: {
        width: '88%',
        borderRadius: 50,
        marginVertical: 6
    },
    textLinkContainer: {
        width: '88%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3
    },
    textLink: {
        color: 'white',
        fontWeight: 'bold'
    },
    textLabel: {
        color: '#FFFFFFE8',
    },
    photoContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
});
