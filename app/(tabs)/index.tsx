import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Animated, Easing } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getWeather } from '@/lib/api/weather';
import { Ionicons } from '@expo/vector-icons';
import TopWaves from '@/components/TopWaves';

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const forecastHours = ['17:00', '18:00', '19:00', '20:00', '21:00'];

  useEffect(() => {
    getWeather('Dublin', 'metric')
      .then(data => setWeather(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load weather');
      })
      .finally(() => setLoading(false));
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error || 'Unknown error'}</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0],
    }) }] }]}>
      <TopWaves />
      <ScrollView contentContainerStyle={{ ...styles.container, paddingTop: 160, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={20} color="black" style={{ width: 24, height: 24, marginBottom: 1 }} />
          <Text style={styles.city}>{weather.name}</Text>
        </View>

        <Text style={styles.weatherIcon}>⛅</Text>
        <Text style={styles.tempText}>{Math.round(weather.main.temp)}°</Text>

        <Text style={styles.time}>{getCurrentDateTime()}</Text>

        <View style={styles.details}>
          <Text style={styles.info}>Humidity: 77%</Text>
          <Text style={styles.info}>Wind speed: {weather.wind?.speed ?? 'N/A'} km/h</Text>
        </View>

        <Text style={styles.forecastTitle}>Forecast</Text>
        <ScrollView horizontal style={styles.forecastScroll} showsHorizontalScrollIndicator={false}>
          {forecastHours.map((hour, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastText}>{hour}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F9F9FF',
    position: 'relative',
  },
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  weatherIcon: {
    fontSize: 64,
    marginVertical: 8,
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  time: {
    fontSize: 14,
    marginBottom: 12,
  },
  details: {
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginVertical: 2,
    color: '#536B78',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  forecastTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,
  },
  forecastScroll: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
  },
  forecastItem: {
    width: 60,
    height: 60,
    backgroundColor: '#ACCBE1',
    borderRadius: 30,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
});

export const screenOptions = {
  title: 'Home',
  tabBarLabel: 'Home',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="home" size={size} color={color} />
  ),
};
