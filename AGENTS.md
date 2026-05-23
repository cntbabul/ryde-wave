
# Ryde-Wave Project Context

## Overview
Ryde-Wave is a React Native mobile application built with **Expo** (v55) and **Expo Router** for file-based routing. It appears to be a real estate or property listing/booking application with features for searching, viewing, saving, and creating property listings.

## Tech Stack
- **Framework:** React Native (v0.83.6), Expo (v55.0.26)
- **Routing:** Expo Router (app directory structure)
- **Styling:** NativeWind v4 (Tailwind CSS for React Native)
- **Backend & Database:** Supabase (`@supabase/supabase-js`)
- **Authentication:** Clerk (`@clerk/expo`)
- **Animations & Gestures:** `react-native-reanimated`, `react-native-gesture-handler`
- **Other Key Libraries:** `expo-location`, `expo-image-picker`, `expo-secure-store`

## App Architecture & Routing (`src/app`)
The project utilizes Expo Router with grouped directories:
- **`(auth)`**: Handles authentication flows (`sign-in.tsx`, `sign-up.tsx`).
- **`(root)`**: The main authenticated area of the app.
  - **`(tabs)`**: The bottom tab navigation containing:
    - `index.tsx` (Home/Feed)
    - `search.tsx` (Search properties, likely with filters)
    - `create.tsx` (Create a new listing)
    - `saved.tsx` (Saved/favorited properties)
    - `profile.tsx` (User profile and settings)
  - **`property`**: Stack screens for property details.
    - `[id].tsx` (Dynamic route for viewing a specific property's details)
    - `map.tsx` (Map view for property locations)

## Key Directories
- `src/components/`: Reusable UI components (e.g., `PropertyCard.tsx`, `FeaturedCard.tsx`, `FilterModal.tsx`).
- `src/lib/`: Likely contains initialization and configuration for third-party services (Supabase, Clerk).
- `src/hooks/`: Custom React hooks for business logic.
- `src/store/`: State management (could be Zustand, Context, or Redux).
- `src/types/`: TypeScript type definitions.
- `src/utils/`: Helper functions.

## Development Guidelines
- Always use **NativeWind (Tailwind CSS)** for styling instead of standard React Native `StyleSheet` unless absolutely necessary.
- Follow **Expo Router** best practices for navigation (e.g., using `<Link>` or `router.push`).
- Keep in mind the usage of **Supabase** for database operations and **Clerk** for user authentication.
- Ensure all new components and screens are strongly typed with **TypeScript**.
