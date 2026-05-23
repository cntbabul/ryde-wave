# Ryde-Wave 🌊

Ryde-Wave is a modern real estate and property listing mobile application built with React Native and Expo. It allows users to search, view, save, and create property listings seamlessly. 

## Features
- **Authentication:** Secure user sign-up and sign-in.
- **Property Exploration:** Browse through a feed of featured and available properties.
- **Search & Filters:** Search for properties using dynamic filters to find the perfect fit.
- **Interactive Maps:** View properties on an interactive map.
- **Saved Properties:** Save your favorite listings for later viewing.
- **Listing Creation:** Easily create and manage new property listings.
- **User Profiles:** Manage user account settings and profile details.

## Tech Stack
- **Framework:** [React Native](https://reactnative.dev/) (v0.83.6), [Expo](https://expo.dev/) (v55.0.26)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing
- **Styling:** [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Backend & Database:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Authentication:** [Clerk](https://clerk.com/docs/quickstarts/expo) (`@clerk/expo`)
- **UI & Animations:** `react-native-reanimated`, `react-native-gesture-handler`

## Directory Structure
- `src/app/`: File-based routing setup via Expo Router.
  - `(auth)/`: Authentication screens (Sign in, Sign up).
  - `(root)/`: Main authenticated flow (Tabs and Property details).
- `src/components/`: Reusable UI components (Cards, Modals, Buttons, etc.).
- `src/hooks/`: Custom React hooks for logic reuse.
- `src/lib/`: Third-party service configuration (Supabase, Clerk, etc.).
- `src/store/`: State management logic.
- `src/types/`: TypeScript type definitions.
- `src/utils/`: Common utility functions.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Learn More
To learn more about developing your project with Expo, look at the following resources:
- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial.
