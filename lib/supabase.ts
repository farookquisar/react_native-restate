import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { Tables, Property, PropertyType } from './types';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

export const supabase = createClient<Tables>(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Property functions
export const getLatestProperties = async (limit = 10): Promise<Property[]> => {
  try {
    const { data, error } = await supabase
      .from('rn_05_properties')
      .select(`
        *,
        average_rating:rn_05_reviews(rating)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Calculate average rating for each property
    return data.map(property => ({
      ...property,
      average_rating: property.average_rating?.length > 0
        ? property.average_rating.reduce((acc: number, curr: any) => acc + curr.rating, 0) / property.average_rating.length
        : undefined
    }));
  } catch (error) {
    console.error('Error getting latest properties:', error);
    return [];
  }
};

interface GetPropertiesParams {
  query?: string;
  filter?: PropertyType;
  limit?: number;
}

export const getProperties = async ({ 
  query = '', 
  filter, 
  limit 
}: GetPropertiesParams): Promise<Property[]> => {
  try {
    let queryBuilder = supabase
      .from('rn_05_properties')
      .select(`
        *,
        average_rating:rn_05_reviews(rating)
      `);

    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`);
    }

    if (filter) {
      queryBuilder = queryBuilder.eq('category', filter);
    }

    if (limit) {
      queryBuilder = queryBuilder.limit(limit);
    }

    const { data, error } = await queryBuilder;

    if (error) throw error;

    // Calculate average rating for each property
    return data.map(property => ({
      ...property,
      average_rating: property.average_rating?.length > 0
        ? property.average_rating.reduce((acc: number, curr: any) => acc + curr.rating, 0) / property.average_rating.length
        : undefined
    }));
  } catch (error) {
    console.error('Error getting properties:', error);
    return [];
  }
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const { data, error } = await supabase
      .from('rn_05_properties')
      .select(`
        *,
        reviews:rn_05_reviews(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting property by id:', error);
    return null;
  }
};

export const getPropertyReviews = async (propertyId: string) => {
  try {
    const { data, error } = await supabase
      .from('rn_05_reviews')
      .select('*')
      .eq('property_id', propertyId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting property reviews:', error);
    return [];
  }
};

export const toggleBookmark = async (propertyId: string, userId: string) => {
  try {
    const { data: existingBookmark } = await supabase
      .from('rn_05_bookmarks')
      .select('*')
      .eq('property_id', propertyId)
      .eq('user_id', userId)
      .single();

    if (existingBookmark) {
      const { error } = await supabase
        .from('rn_05_bookmarks')
        .delete()
        .eq('id', existingBookmark.id);
      if (error) throw error;
      return false; // Bookmark removed
    } else {
      const { error } = await supabase
        .from('rn_05_bookmarks')
        .insert([{ property_id: propertyId, user_id: userId }]);
      if (error) throw error;
      return true; // Bookmark added
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return null;
  }
};
