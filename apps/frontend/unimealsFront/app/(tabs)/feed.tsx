import { View, Text } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Feed() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: MD2Colors.white }}>este es el feed</Text>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
    );
}