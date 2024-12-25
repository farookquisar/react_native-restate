import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View, ImageErrorEventData, NativeSyntheticEvent } from "react-native";
import { Property } from "@/lib/types";

interface Props {
  item: Property;
  onPress?: () => void;
}

const defaultImage = 'https://placehold.co/600x400/png';

export const FeaturedCard = ({ item, onPress }: Props) => {
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.warn('Image failed to load:', e.nativeEvent.error);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image 
        source={{ uri: item.images?.[0] || defaultImage }} 
        className="size-full rounded-2xl"
        onError={handleImageError}
      />

      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.average_rating ? item.average_rating.toFixed(1) : 'N/A'}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between w-full mt-2">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${item.price.toLocaleString()}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.warn('Image failed to load:', e.nativeEvent.error);
  };

  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.average_rating ? item.average_rating.toFixed(1) : 'N/A'}
        </Text>
      </View>

      <Image 
        source={{ uri: item.images?.[0] || defaultImage }} 
        className="w-full h-40 rounded-lg"
        onError={handleImageError}
      />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-xs font-rubik text-black-100" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${item.price.toLocaleString()}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
