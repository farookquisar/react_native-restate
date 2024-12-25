import { useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold">Property Details: {id}</Text>
        {/* Add your property details content here */}
      </View>
    </SafeAreaView>
  );
}
