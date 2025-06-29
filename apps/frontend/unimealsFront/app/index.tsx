import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import FilterBottomSheet from '@ui/filterBar/FilterBottomSheet';

export default function GoToFeedLink() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <TouchableOpacity onPress={() => router.push('/feed')}>
                <Text style={{ color: '#007AFF', fontSize: 16, textDecorationLine: 'underline', justifyContent: 'center', alignItems: 'center' }}>
                    Ir al feed
                </Text>
            </TouchableOpacity>
            <FilterBottomSheet />
        </View>
    );
}
