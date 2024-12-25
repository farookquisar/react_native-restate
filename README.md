# React Native Restate App

A React Native application built with Expo and Appwrite for real estate management.

## Project Structure

```
├── app/                  # Main application screens and routes
│   ├── _layout.tsx      # Root layout configuration
│   ├── sign-in.tsx      # Sign in screen
│   ├── global.css       # Global styles
│   └── (root)/          # Main app screens
│       ├── (tabs)/      # Tab navigation screens
│       │   ├── _layout.tsx    # Tab navigation layout
│       │   ├── index.tsx      # Home screen
│       │   ├── explore.tsx    # Explore properties screen
│       │   └── profile.tsx    # User profile screen
│       ├── _layout.tsx  # Root layout for main screens
│       └── properties/  # Property-related screens
├── components/          # Reusable UI components
│   ├── Cards.tsx       # Property cards component
│   ├── Comment.tsx     # Comment section component
│   ├── Filters.tsx     # Search filters component
│   ├── NoResults.tsx   # No results found component
│   └── Search.tsx      # Search functionality component
├── lib/                # Core functionality and services
│   ├── appwrite.ts     # Appwrite configuration
│   ├── data.ts         # Data management utilities
│   ├── global-provider.tsx # Global state provider
│   ├── seed.ts         # Database seeding utilities
│   └── useAppwrite.ts  # Appwrite hooks and utilities
```

## Components and Their Usage

### Core Components
1. **Cards Component** (`/components/Cards.tsx`)
   - Used in:
     - Home Screen (`app/(root)/(tabs)/index.tsx`)
     - Explore Screen (`app/(root)/(tabs)/explore.tsx`)
   - Features:
     - Property card display
     - Featured property card
     - Property image
     - Price and details display
     - Location information

2. **Search Component** (`/components/Search.tsx`)
   - Used in:
     - Home Screen (`app/(root)/(tabs)/index.tsx`)
     - Explore Screen (`app/(root)/(tabs)/explore.tsx`)
   - Features:
     - Search input field
     - Search history
     - Search suggestions

3. **Filters Component** (`/components/Filters.tsx`)
   - Used in:
     - Home Screen (`app/(root)/(tabs)/index.tsx`)
     - Explore Screen (`app/(root)/(tabs)/explore.tsx`)
   - Features:
     - Category filters
     - Price range filters
     - Property type filters

4. **Comment Component** (`/components/Comment.tsx`)
   - Used in:
     - Property Details Screen (`app/(root)/properties/[id].tsx`)
   - Features:
     - User avatar
     - Comment text
     - Rating display
     - Timestamp

5. **NoResults Component** (`/components/NoResults.tsx`)
   - Used in:
     - Home Screen (`app/(root)/(tabs)/index.tsx`)
     - Explore Screen (`app/(root)/(tabs)/explore.tsx`)
   - Features:
     - Empty state display
     - No results message

## Screen-wise Component Usage

### 1. Sign In Screen (`app/sign-in.tsx`)
**Screen Summary**:
- **Purpose**: Authentication screen for user login
- **UI Elements**:
  - Welcoming onboarding image at the top
  - "Continue with Google" button
  - Loading indicator during authentication
- **User Actions**:
  - Click Google sign-in button to authenticate
- **Flow**:
  - User clicks Google button
  - Initiates OAuth login through Appwrite
  - Shows loading state during authentication
  - Redirects to home screen on success
  - Displays error alert if login fails
- **State Management**:
  - Tracks authentication status
  - Manages loading states
  - Handles error states

**Components Used**:
- Native Components:
  - SafeAreaView
  - ScrollView
  - Image
  - TouchableOpacity
  - Text
  - View
  - Alert
- Custom Components:
  - Library Components:
    - `Redirect` from `expo-router`
    - `login` from `@/lib/appwrite`
    - `useGlobalContext` from `@/lib/global-provider`
  - Constants:
    - `icons` from `@/constants/icons`
    - `images` from `@/constants/images`

### 2. Home Screen (`app/(root)/(tabs)/index.tsx`)
**Screen Summary**:
- **Purpose**: Main landing page for property browsing
- **UI Elements**:
  - User profile section with avatar and name
  - Search bar for property search
  - Category filter buttons
  - Featured properties horizontal scroll
  - Latest properties grid view
- **User Actions**:
  - Search properties by keyword
  - Filter by categories
  - Click on property cards for details
  - Navigate through featured properties
- **Data Display**:
  - Featured properties section
  - Latest properties grid
  - Loading states during data fetch
- **Navigation**:
  - Leads to property details on card click
  - Access to search and filters

**Components Used**:
- Native Components:
  - SafeAreaView
  - FlatList
  - ActivityIndicator
  - Image
  - Text
  - View
- Custom Components:
  - Library Components:
    - `useAppwrite` from `@/lib/useAppwrite`
    - `useGlobalContext` from `@/lib/global-provider`
    - `getLatestProperties`, `getProperties` from `@/lib/appwrite`
  - UI Components:
    - `Search` from `@/components/Search`
    - `Filters` from `@/components/Filters`
    - `Card`, `FeaturedCard` from `@/components/Cards`
    - `NoResults` from `@/components/NoResults`
  - Constants:
    - `icons` from `@/constants/icons`

### 3. Explore Screen (`app/(root)/(tabs)/explore.tsx`)
**Screen Summary**:
- **Purpose**: Advanced property search and filtering
- **UI Elements**:
  - Back navigation button
  - Search bar at top
  - Advanced filter options
  - Property count display
  - Grid view of properties
- **User Actions**:
  - Use advanced search
  - Apply multiple filters
  - View property details
  - Return to previous screen
- **Features**:
  - Real-time search results
  - Multiple filter combinations
  - Loading states
  - No results handling
- **Data Display**:
  - Property grid layout
  - Search result count
  - Loading indicators

**Components Used**:
- Native Components:
  - SafeAreaView
  - FlatList
  - ActivityIndicator
  - TouchableOpacity
  - Image
  - Text
  - View
- Custom Components:
  - Library Components:
    - `useAppwrite` from `@/lib/useAppwrite`
    - `getProperties` from `@/lib/appwrite`
    - `router`, `useLocalSearchParams` from `expo-router`
  - UI Components:
    - `Search` from `@/components/Search`
    - `Filters` from `@/components/Filters`
    - `Card` from `@/components/Cards`
    - `NoResults` from `@/components/NoResults`
  - Constants:
    - `icons` from `@/constants/icons`

### 4. Profile Screen (`app/(root)/(tabs)/profile.tsx`)
**Screen Summary**:
- **Purpose**: User profile and settings management
- **UI Elements**:
  - Large profile avatar
  - User name display
  - Settings menu sections
  - Logout button
- **Menu Sections**:
  - My Bookings
  - Payments
  - Additional settings from constants
- **User Actions**:
  - Edit profile picture
  - Navigate through settings
  - Access bookings and payments
  - Logout from app
- **Features**:
  - Settings navigation
  - Profile editing
  - Secure logout
  - Session management

**Components Used**:
- Native Components:
  - SafeAreaView
  - ScrollView
  - Image
  - TouchableOpacity
  - Text
  - View
  - Alert
- Custom Components:
  - Internal Components:
    - `SettingsItem` (defined within file)
  - Library Components:
    - `logout` from `@/lib/appwrite`
    - `useGlobalContext` from `@/lib/global-provider`
  - Constants:
    - `icons` from `@/constants/icons`
    - `settings` from `@/constants/data`

### 5. Property Details Screen (`app/(root)/properties/[id].tsx`)
**Screen Summary**:
- **Purpose**: Detailed property information display
- **UI Elements**:
  - Image gallery at top
  - Property details section
  - Price and location information
  - Amenities list
  - Comments section
- **Content Sections**:
  - Property images
  - Basic information
  - Detailed description
  - Features and amenities
  - User reviews and ratings
- **User Actions**:
  - View property images
  - Read property details
  - Check amenities
  - View user comments
  - Navigate back
- **Features**:
  - Image gallery navigation
  - Detailed property information
  - User reviews display
  - Back navigation

**Components Used**:
- Native Components:
  - SafeAreaView
  - ScrollView
  - Image
  - TouchableOpacity
  - Text
  - View
- Custom Components:
  - UI Components:
    - `Comment` from `@/components/Comment`
  - Library Components:
    - `useAppwrite` from `@/lib/useAppwrite`
    - `getPropertyById` from `@/lib/appwrite`
  - Constants:
    - `icons` from `@/constants/icons`

## Component Dependencies

### Cards.tsx Dependencies
```
- react-native components
- expo-router (for navigation)
- constants/icons
- constants/data
```

### Search.tsx Dependencies
```
- react-native components
- expo-router
- constants/icons
```

### Filters.tsx Dependencies
```
- react-native components
- constants/data
- constants/icons
```

### Comment.tsx Dependencies
```
- react-native components
- constants/icons
```

### NoResults.tsx Dependencies
```
- react-native components
- constants/icons
```

## Component State Management

### Local State Components
- `Search.tsx` - Search query state
- `Filters.tsx` - Selected filters state
- `Cards.tsx` - Layout state

### Global State Connected Components
- `Cards.tsx` - Property data from Appwrite
- `Search.tsx` - Search history
- `Profile.tsx` - User data from global context

## Component Styling
All components use Tailwind CSS classes through the NativeWind library for styling. Common style patterns:
- Flex layouts
- Padding and margin utilities
- Color schemes from theme
- Typography classes
- Border radius and shadow utilities

## Screen Details and Components

### 1. Sign In Screen (`app/sign-in.tsx`)
**Purpose**: Authentication screen for user login
**Components and Features**:
- Onboarding image display
- Google Sign-in button
- Uses `lib/appwrite.ts` for authentication
- Uses `lib/global-provider.tsx` for global state management
**Key Dependencies**:
- SafeAreaView from react-native-safe-area-context
- Redirect from expo-router
- Images and icons from constants
- Global context for authentication state

### 2. Home Screen (`app/(root)/(tabs)/index.tsx`)
**Purpose**: Main landing page showing property listings
**Components and Features**:
- User profile header with avatar
- Search bar (`Search.tsx`)
- Filter options (`Filters.tsx`)
- Featured properties section (`FeaturedCard`)
- Latest properties grid (`Card`)
**Key Dependencies**:
- `useAppwrite` hook for data fetching
- `getLatestProperties` and `getProperties` from appwrite
- Global context for user information

### 3. Explore Screen (`app/(root)/(tabs)/explore.tsx`)
**Purpose**: Dedicated property search and exploration
**Components and Features**:
- Back navigation
- Search functionality (`Search.tsx`)
- Advanced filters (`Filters.tsx`)
- Property grid view (`Card`)
- Results count display
- Loading states
**Key Dependencies**:
- `useAppwrite` hook for property data
- `getProperties` from appwrite
- `NoResults` component for empty states

### 4. Profile Screen (`app/(root)/(tabs)/profile.tsx`)
**Purpose**: User profile management and settings
**Components and Features**:
- User avatar and name display
- Profile editing capability
- Settings menu items:
  - My Bookings
  - Payments
  - Other settings from constants
- Logout functionality
**Key Dependencies**:
- Global context for user data
- `logout` function from appwrite
- Settings data from constants

### 5. Root Layout (`app/_layout.tsx`)
**Purpose**: Main navigation container and app initialization
**Features**:
- Sets up the root Stack navigation
- Handles font loading
- Manages splash screen
- Provides global context wrapper

### 6. Tab Navigation (`app/(root)/(tabs)/_layout.tsx`)
**Purpose**: Manages bottom tab navigation
**Features**:
- Bottom tab navigation setup
- Tab icons and labels
- Screen transitions
- Navigation state management

### 7. Properties Section (`app/(root)/properties/`)
**Purpose**: Property listing and details
**Components Used**:
- `Cards.tsx`: Display property listings
- `Filters.tsx`: Filter properties
- `Search.tsx`: Search functionality
- `NoResults.tsx`: Handle empty states
- `Comment.tsx`: Property reviews and comments

## Component Interactions

### Home Screen Flow
```
Home Screen
   ↓
Search.tsx ←→ Filters.tsx
   ↓
FeaturedCard/Card
   ↓
Property Details
```

### Explore Flow
```
Explore Screen
   ↓
Search.tsx
   ↓
Filters.tsx
   ↓
Cards.tsx
   ↓
NoResults.tsx (if no results)
```

### Profile Flow
```
Profile Screen
   ↓
Settings Items
   ↓
Specific Setting Screens
   ↓
Logout → Sign In Screen
```

### Search and Filter Flow
```
Search.tsx
   ↓
Filters.tsx
   ↓
Cards.tsx
   ↓
NoResults.tsx (if no results)
```

### Property Details Flow
```
Cards.tsx
   ↓
Property Details Screen
   ↓
Comment.tsx
```

## State Management
- Global application state managed through `lib/global-provider.tsx`
- Authentication state handled by Appwrite integration
- Component-level state managed within individual components
- Navigation state handled by Expo Router

## Screen Navigation Flow
1. App Launch → Sign In Screen (if not authenticated)
2. Sign In → Main Tab Navigation (after successful authentication)
3. Main Tabs:
   - Home Tab: Browse featured and latest properties
   - Explore Tab: Search and filter properties
   - Profile Tab: Manage user settings and preferences
4. Property Details: Accessible from both Home and Explore tabs
5. Settings Screens: Accessible from Profile tab

## Data Flow
1. Authentication:
   - Sign In → Appwrite OAuth → Global Context Update
2. Property Data:
   - Home/Explore → Appwrite Queries → Property Display
3. User Data:
   - Global Context → Profile Display → Settings Management
