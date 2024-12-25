import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { getPropertyById, getPropertyReviews } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Property as PropertyType, Review } from "@/lib/types";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property, isLoading: propertyLoading } = useQuery<PropertyType | null>({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id!),
    enabled: !!id
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ['property-reviews', id],
    queryFn: () => getPropertyReviews(id!),
    enabled: !!id
  });

  if (!id || propertyLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.images?.[0] }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-rubik-extrabold">
            {property?.title}
          </Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {property?.category}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                {property?.average_rating?.toFixed(1)} ({reviews?.length} reviews)
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.bedrooms || 0} Beds
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.bathrooms || 0} Baths
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.area || 0} sqft
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-rubik-bold text-black-300">Description</Text>
            <Text className="text-black-200 text-sm mt-3 leading-5 font-rubik-regular">
              {property?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-rubik-bold text-black-300">Location</Text>
            <Text className="text-black-200 text-sm mt-3 leading-5 font-rubik-regular">
              {property?.address}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-rubik-bold text-black-300">Features</Text>
            <View className="flex flex-row flex-wrap gap-5 mt-5">
              {facilities.map((facility) => (
                <View
                  key={facility.title}
                  className={`flex flex-row items-center gap-2 px-4 py-2 rounded-full ${
                    property?.features?.[facility.key as keyof NonNullable<PropertyType['features']>]
                      ? "bg-primary-100"
                      : "bg-black-100"
                  }`}
                >
                  <Image
                    source={facility.icon}
                    className="size-4"
                    tintColor={
                      property?.features?.[facility.key as keyof NonNullable<PropertyType['features']>]
                        ? "#1F4C6B"
                        : "#191D31"
                    }
                  />
                  <Text
                    className={`text-xs font-rubik-medium ${
                      property?.features?.[facility.key as keyof NonNullable<PropertyType['features']>]
                        ? "text-primary-300"
                        : "text-black-300"
                    }`}
                  >
                    {facility.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {property?.images && property.images.length > 1 && (
            <View className="mt-7">
              <Text className="text-xl font-rubik-bold text-black-300">Gallery</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 15 }}
                className="mt-5"
              >
                {property.images.slice(1).map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    className="w-40 h-28 rounded-xl"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {(reviews?.length ?? 0) > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {property?.average_rating?.toFixed(1)} ({reviews?.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 text-sm font-rubik-medium">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                {reviews?.[0] && (
                  <Comment
                    item={{
                      id: reviews[0].id,
                      name: "Anonymous User", // Since we don't have user data yet
                      avatar: "", // You might want to add a default avatar
                      review: reviews[0].comment || "",
                      createdAt: reviews[0].created_at
                    }}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
