export type PropertyStatus = 'available' | 'sold' | 'rented';
export type PropertyType = 'house' | 'apartment' | 'villa' | 'land';

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  address: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  category: PropertyType;
  status: PropertyStatus;
  features: {
    pool?: boolean;
    garden?: boolean;
    parking?: number;
    security?: boolean;
    gym?: boolean;
    concierge?: boolean;
    basement?: boolean;
    patio?: boolean;
  } | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
  average_rating?: number;
}

export interface Review {
  id: string;
  property_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type Tables = {
  rn_05_properties: Property;
  rn_05_reviews: Review;
  rn_05_bookmarks: Bookmark;
  rn_05_user_profiles: UserProfile;
};
