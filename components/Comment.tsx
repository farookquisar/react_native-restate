import { View, Text, Image, ImageErrorEventData, NativeSyntheticEvent } from "react-native";
import { format } from "date-fns";

import images from "@/constants/images";
import icons from "@/constants/icons";

interface CommentData {
  id: string;
  name: string;
  avatar: string;
  review: string;
  likes?: number;
  createdAt: string;
}

interface Props {
  item: CommentData;
}

const defaultAvatar = 'https://placehold.co/200x200/png';

const Comment = ({ item }: Props) => {
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.warn('Avatar failed to load:', e.nativeEvent.error);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.warn('Invalid date format:', error);
      return 'Invalid date';
    }
  };

  return (
    <View className="flex flex-col items-start">
      <View className="flex flex-row items-center">
        <Image 
          source={{ uri: item.avatar || defaultAvatar }} 
          className="size-14 rounded-full"
          onError={handleImageError}
        />
        <Text className="text-base text-black-300 text-start font-rubik-bold ml-3" numberOfLines={1}>
          {item.name}
        </Text>
      </View>

      <Text className="text-black-200 text-base font-rubik mt-2">
        {item.review}
      </Text>

      <View className="flex flex-row items-center w-full justify-between mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            {item.likes?.toLocaleString() || '0'}
          </Text>
        </View>
        <Text className="text-black-100 text-sm font-rubik">
          {formatDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
