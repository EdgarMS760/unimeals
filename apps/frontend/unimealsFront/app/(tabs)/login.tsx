import {Animated, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Image} from "expo-image";
import ScrollView = Animated.ScrollView;
import {InputView} from "@/components/InputView";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useThemeColor} from "@/hooks/useThemeColor";

export default function LogIn() {
    const insets = useSafeAreaInsets()
    const backgroundColor = useThemeColor({ light: '#A1CEDC', dark: '#1D3D47' }, 'background');

    return (
        <View style={[styles.container, {paddingTop: insets.top, backgroundColor: backgroundColor}]}>
            <View style={styles.topContainer}>
                <Image
                    source={require('@/assets/images/UniMeals.png')}
                    style={styles.logoUniMeals}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.pageHeader}>INICIAR SESIÓN</Text>
                <View style={styles.bottomInnerContainer}>
                    <InputView></InputView>
                    <InputView></InputView>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topContainer: {
        flex: 4,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 6,
        width: '100%',
        backgroundColor: '#259562',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomInnerContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#31BB7C',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 40,
        paddingHorizontal: 40,
        gap: 12
    },
    pageHeader: {
        fontFamily: 'Lemon',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 18,
        color: 'white',
    },
    logoUniMeals: {
        height: 250,
        width: 250,
    }
});
