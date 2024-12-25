import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import {
  getCurrentUser,
  getLatestProperties,
  getProperties,
  getPropertyById,
  getPropertyReviews,
  signInWithGoogle,
  signOut,
  toggleBookmark,
} from './supabase';
import { Property, PropertyType, Review } from './types';

// Auth queries
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
};

export const useSignInWithGoogle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Property queries
export const useLatestProperties = (limit?: number) => {
  return useQuery<Property[]>({
    queryKey: ['properties', 'latest', limit],
    queryFn: () => getLatestProperties(limit),
  });
};

interface UsePropertiesParams {
  query?: string;
  filter?: PropertyType;
  limit?: number;
}

export const useProperties = (params: UsePropertiesParams) => {
  return useQuery<Property[]>({
    queryKey: ['properties', params],
    queryFn: () => getProperties(params),
  });
};

export const useProperty = (id: string) => {
  return useQuery<Property | null>({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
};

export const usePropertyReviews = (propertyId: string) => {
  return useQuery<Review[]>({
    queryKey: ['property', propertyId, 'reviews'],
    queryFn: () => getPropertyReviews(propertyId),
    enabled: !!propertyId,
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, userId }: { propertyId: string; userId: string }) =>
      toggleBookmark(propertyId, userId),
    onSuccess: (_, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
