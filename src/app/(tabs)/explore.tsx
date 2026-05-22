import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Explore Services</Text>
        <Text style={styles.description}>
          Discover nearby rides, schedules, and premium tracking features coming soon in the next update.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentCard: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    color: '#94A3B8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
