import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, useTheme } from 'react-native-paper';

type Props = {
    visible: boolean;
    onClose: () => void;
};

const { height: screenHeight } = Dimensions.get('window');

export default function ModalCreatePub({ visible, onClose }: Props) {
    const { colors } = useTheme();

    const dynamicStyles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            margin: 20,
        },
        surface: {
            padding: 20,
            borderRadius: 10,
            elevation: 4,
            backgroundColor: colors.surface,
            maxHeight: screenHeight * 0.8,
        },
        title: {
            fontSize: 20,
            marginBottom: 16,
            color: colors.onSurface,
            textAlign: 'center',
        },
        input: {
            marginBottom: 12,
            backgroundColor: colors.surface,
            color: colors.onSurface,
        },
        buttonContainer: {
            marginTop: 8,
        },
        scrollContent: {
            paddingBottom: 20,
        }
    });

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={dynamicStyles.modalContainer}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Surface style={dynamicStyles.surface}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={dynamicStyles.scrollContent}
                        >
                            <Text style={dynamicStyles.title}>Crear Publicación</Text>
                            
                            <TextInput
                                label="Título"
                                mode="outlined"
                                style={dynamicStyles.input}
                                theme={{ 
                                    colors: { 
                                        text: colors.onSurface, 
                                        primary: colors.primary, 
                                    } 
                                }}
                            />
                            
                            <TextInput
                                label="Descripción"
                                mode="outlined"
                                multiline
                                numberOfLines={4}
                                style={dynamicStyles.input}
                                theme={{ 
                                    colors: { 
                                        text: colors.onSurface, 
                                        primary: colors.primary, 
                                    } 
                                }}
                            />
                            
                            <Button
                                mode="contained"
                                onPress={onClose}
                                style={dynamicStyles.buttonContainer}
                                labelStyle={{ color: 'white', fontWeight: 'bold' }}
                            >
                                Cerrar
                            </Button>
                        </ScrollView>
                    </Surface>
                </KeyboardAvoidingView>
            </Modal>
        </Portal>
    );
}