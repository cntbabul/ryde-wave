import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const properties = [
  { id: "1", title: "Modern Villa", location: "Guwahati", price: "$ 1.2 cr" },
  { id: "2", title: "Luxury Apartment", location: "Mumbai", price: "$ 3.5 cr" },
  { id: "3", title: "Cozy Cottage", location: "Manali", price: "$ 65 L" },
  { id: "4", title: "Beachfront Condo", location: "Goa", price: "$ 2.1 cr" },
  { id: "5", title: "Downtown Penthouse", location: "Delhi", price: "$ 8.0 cr" },
  { id: "6", title: "Suburban Family Home", location: "Pune", price: "$ 1.5 cr" },
]

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <View className="bg-blue-500 justify-center items-center p-5 rounded-lg m-5">
        <Text className="text-white text-2xl font-bold uppercase">This is root page</Text>
        <TextInput
          placeholder='Search city ...'
          placeholderTextColor='white'
          className="w-full border border-white rounded-lg p-2 mt-4 bg-blue-500 text-white"
        />
        <Pressable className="mt-4 bg-white px-6 py-2 rounded-lg active:opacity-80">
          <Text className="text-blue-500 font-bold">Search</Text>
        </Pressable>
      </View>
    </SafeAreaView>

  );
}
