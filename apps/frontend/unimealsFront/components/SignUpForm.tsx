import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useState} from "react";
import {TextInput, Avatar, IconButton, MD3Colors, useTheme, Button} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

type MyComponentProps = {
    posPageIndex: string;
    setPosImageIndex: React.Dispatch<React.SetStateAction<string>>;
};

export function SignUpForm({posPageIndex, setPosImageIndex}: MyComponentProps) {
    const inputColors = {
        background: '#31BB7C',
        text: '#FFFFFF',
        placeholder: '#FFFFFF',
        primary: '#FFFFFF',
        outline: '#FFFFFFBE',
        onSurfaceVariant: '#FFFFFFBE',
    }
    const [posPage, setPosPage] = useState("1");
    const passPage = (index: string) => {
        setPosPage(index);
    }
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se requieren permisos para acceder a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };


    const styles = StyleSheet.create({
        formContainer: {
            width: '100%',
            height: '100%',
            gap: 6,
            paddingVertical: 6,
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        photoContainer: {
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        inputStyle: {
            marginBottom: 8,
            backgroundColor: 'transparent',
            width: '88%',
        },
        iconStyle: {
            position: 'absolute',
            top: 55,
            left: '53%',
            borderRadius: 50,
            backgroundColor: '#31BB7C',
            zIndex: 1,
        },
        btnIconReturn: {
            position: 'absolute',
            top: 0,
            left: -20,
            borderRadius: 50,
            backgroundColor: '#31BB7C',
            zIndex: 1,
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
        }
    });

    return (
        <View style={styles.formContainer}>
            {posPage === "1" &&
                <>
                    <View style={styles.photoContainer}>
                        {imageUri ? (
                            <Avatar.Image
                                size={96}
                                source={{ uri: imageUri }}
                            />
                        ) : (
                            <Avatar.Icon
                                size={96}
                                icon="account"
                            />
                        )}
                        <IconButton
                            icon="camera"
                            size={25}
                            style={styles.iconStyle}
                            iconColor={"#FFF"}
                            onPress={pickImage}
                        />
                    </View>
                    <TextInput
                        label="Nombre"
                        mode="outlined"
                        style={styles.inputStyle}
                        theme={{
                            colors: inputColors
                        }}
                    />
                    <TextInput
                        label="Usuario"
                        mode="outlined"
                        style={styles.inputStyle}
                        theme={{
                            colors: inputColors
                        }}
                    />
                    <Button
                        mode="contained"
                        onPress={() => passPage("2")}
                        style={styles.btnStyle}
                        labelStyle={{color: 'white', fontWeight: 'bold', padding: 4}}
                    >
                        Continuar
                    </Button>

                </>
            }
            {posPage === "2" &&
                <>
                    <IconButton
                        icon="chevron-left"
                        size={35}
                        style={styles.btnIconReturn}
                        iconColor={"#FFF"}
                        onPress={() => passPage("1")}
                    />
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
                    <TextInput
                        label="Confirmar Contraseña"
                        mode="outlined"
                        style={styles.inputStyle}
                        theme={{
                            colors: inputColors
                        }}
                    />
                    <Button
                        mode="contained"
                        onPress={()=>{}}
                        style={styles.btnStyle}
                        labelStyle={{color: 'white', fontWeight: 'bold', padding: 4}}
                    >
                        Registrar
                    </Button>
                </>
            }
            <View style={styles.textLinkContainer}>
                <Text style={styles.textLabel}>¿Ya tienes una cuenta?</Text>
                <Pressable
                    onPress={() => {
                        setPosImageIndex('1')
                    }}
                >
                    {({pressed}) => (
                        <Text style={[styles.textLink, {opacity: pressed ? 0.5 : 1}]}>
                            Ingresar
                        </Text>
                    )}
                </Pressable>
            </View>
            <View style={styles.textLinkContainer}>
                <Text style={styles.textLabel}>o</Text>
                <Pressable
                    onPress={
                        () => router.push('/feed')}
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


