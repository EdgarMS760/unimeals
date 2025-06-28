import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, useTheme } from 'react-native-paper';

type Props = {
    visible: boolean;
    onClose: () => void;
};

export default function ModalCreatePub({ visible, onClose }: Props) {
    const { colors } = useTheme();

    const dynamicStyles = StyleSheet.create({
        modalContainer: {
            margin: 20,
        },
        surface: {
            padding: 20,
            borderRadius: 10,
            elevation: 4,
            backgroundColor: colors.surface,
        },
        title: {
            fontSize: 20,
            marginBottom: 16,
            color: colors.onSurface,
        },
        input: {
            marginBottom: 12,
            backgroundColor: colors.surface,
            color: colors.onSurface,
        }
    });

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={dynamicStyles.modalContainer}
            >
                <Surface style={dynamicStyles.surface}>
                    <Text style={dynamicStyles.title}>Crear Publicacion</Text>

                    <TextInput
                        label="Título"
                        mode="outlined"
                        style={dynamicStyles.input}
                        theme={{ colors: { text: colors.onSurface, primary: colors.primary, placeholder: colors.disabled } }}
                    />

                    <TextInput
                        label="Descripción"
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        style={dynamicStyles.input}
                        theme={{ colors: { text: colors.onSurface, primary: colors.primary, placeholder: colors.disabled } }}
                    />

                    <Button
                        mode="contained"
                        onPress={onClose}
                        labelStyle={{ color: 'white', fontWeight: 'bold' }}
                    >
                        Cerrar
                    </Button>

                </Surface>
            </Modal>
        </Portal>
    );
}
