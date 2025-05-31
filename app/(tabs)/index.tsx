import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Animated, Easing } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getWeather } from '@/lib/api/weather';
import { Ionicons } from '@expo/vector-icons';
import TopWaves from '@/components/TopWaves';
import { WeatherResponse } from '@/types/weather';
import { LinearGradient } from 'expo-linear-gradient';

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

  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hourlyTemps, setHourlyTemps] = useState<{ time: string; temp: number }[]>([]);

  useEffect(() => {
    getWeather('Dublin', 'metric')
      .then(data => {
        setWeather(data);
        if (data.hourly && data.hourly.time && data.hourly.temperature_2m) {
          const temps = data.hourly.time.map((time: string, i: number) => ({
            time: time.slice(11, 16),
            temp: Math.round(data.hourly.temperature_2m[i]),
          }));
          setHourlyTemps(temps);
        }
      })
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

  const getWeatherEmoji = (description: string) => {
    if (description.toLowerCase().includes('cloud')) return '☁️';
    if (description.toLowerCase().includes('rain')) return '🌧️';
    if (description.toLowerCase().includes('sun')) return '☀️';
    if (description.toLowerCase().includes('snow')) return '❄️';
    if (description.toLowerCase().includes('storm')) return '⛈️';
    return '🌤️';
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
    <LinearGradient colors={['#ACCBE1', '#F9F9FF']} style={{ flex: 1 }}>
      <Animated.View style={[styles.wrapper, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 0],
      }) }] }]}>
        <TopWaves />
        <ScrollView contentContainerStyle={{ ...styles.container, paddingTop: 160, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={24} color="black" style={{ marginBottom: 1 }} />
            <Text style={styles.city}>{weather.name}</Text>
          </View>

          <View style={styles.mainWeatherCard}>
            <Text style={styles.weatherIcon}>{getWeatherEmoji(weather.weather[0].description)}</Text>
            <Text style={styles.tempText}>{Math.round(weather.main.temp)}°</Text>
            <Text style={styles.time}>{getCurrentDateTime()}</Text>
            <View style={styles.details}>
              <Text style={styles.info}>Humidity: 77%</Text>
              <Text style={styles.info}>Wind speed: {weather.wind?.speed ?? 'N/A'} km/h</Text>
            </View>
          </View>

          <View style={styles.forecastCard}>
            <Text style={styles.forecastTitle}>Forecast</Text>
            <ScrollView horizontal style={styles.forecastScroll} showsHorizontalScrollIndicator={false}>
              {hourlyTemps.slice(1, 6).map(({ time, temp }, index) => (
                <View key={index} style={styles.forecastItem}>
                  <Text style={styles.forecastText}>{time}</Text>
                  <Text style={styles.forecastText}>{temp}°</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 32,
  },
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  weatherIcon: {
    fontSize: 64,
    marginVertical: 8,
  },
  weatherIconImage: {
    width: 120,
    height: 120,
    marginVertical: 16,
    resizeMode: 'contain',
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
    marginVertical: 16,
    alignItems: 'center',
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
    fontSize: 20,
    marginBottom: 12,
    color: '#536B78',
  },
  forecastScroll: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
  },
  forecastItem: {
    width: 64,
    height: 64,
    backgroundColor: '#7C98B3',
    borderRadius: 32,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  forecastText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  mainWeatherCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  forecastCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 24,
  },
});

export const screenOptions = {
  title: 'Home',
  tabBarLabel: 'Home',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="home" size={size} color={color} />
  ),
};
