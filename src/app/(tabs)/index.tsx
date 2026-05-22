
import { useAuth, useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function HomeScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isLoaded) {
    return (
      <View >
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  return (
    <View>


    </View>
  );
}


