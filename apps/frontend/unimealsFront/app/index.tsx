import {Image} from "expo-image";
import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback, Keyboard
} from "react-native";
import {LogInForm} from "@components/LogInForm";
import {SignUpForm} from "@components/SignUpForm";
import {useTheme} from "react-native-paper";



export default function LogIn() {
    const {colors} = useTheme();
    const [posPage, setPosPage] = useState("1");
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFF'
        },
        topContainer: {
            flex: 2,
            width: '100%',
            padding: 60,
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottomContainer: {
            flex: 5,
            width: '100%',
            backgroundColor: '#259562',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        bottomInnerContainer: {
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingBottom: 40,
            shadowColor: 'black',
            flexGrow: 1,
        },
        pageHeader: {
            fontFamily: 'Lemon',
            fontSize: 24,
            fontWeight: 'bold',
            padding: 18,
            color: 'white',
        },
        logoUniMeals: {
            height: 150,
            width: 150,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'flex-start',
        }
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={styles.container}
                >
                        <View style={styles.topContainer}>
                            <Image
                                source={require('@assets/images/logoUniMealsNoLetras.png')}
                                style={styles.logoUniMeals}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.pageHeader}>{(posPage === '1') ? "INICIAR SESIÓN" : "REGISTRARSE"}</Text>
                            <ScrollView
                                style={{width: "100%", backgroundColor: '#31BB7C', paddingVertical: 6, borderTopRightRadius: 30, borderTopLeftRadius: 30,}}
                                contentContainerStyle={{flexGrow: 1}}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={styles.bottomInnerContainer}>
                                    {posPage === '1' ? (
                                        <LogInForm posPageIndex={posPage} setPosImageIndex={setPosPage} />
                                    ) : (
                                        <SignUpForm posPageIndex={posPage} setPosImageIndex={setPosPage} />
                                    )}
                                </View>
                            </ScrollView>
                        </View>


                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

