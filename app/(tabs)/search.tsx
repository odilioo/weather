import { ScrollView, StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { getWeather } from '@/lib/api/weather';
import { Ionicons } from '@expo/vector-icons';
import TopWaves from '@/components/TopWaves';

export default function Search() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');

  const forecastHours = ['17:00', '18:00', '19:00', '20:00', '21:00'];

  const handleSearch = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const data = await getWeather(city, 'metric');
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.wrapper}>
      <TopWaves />
      <ScrollView contentContainerStyle={{ ...styles.container, paddingTop: 160, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {!weather && !loading && !error && (
          <Text style={styles.placeholder}>Enter a city name to see the weather</Text>
        )}

        {loading && (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {error && !loading && (
          <View style={styles.container}>
            <Text style={styles.error}>{error || 'Unknown error'}</Text>
          </View>
        )}

        {weather && !loading && !error && (
          <View style={styles.result}>
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
          </View>
        )}
      </ScrollView>

    </View>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    backgroundColor: '#7C98B3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  placeholder: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  result: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
});

export const screenOptions = {
  title: 'Search',
  tabBarLabel: 'Search',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="search" size={size} color={color} />
  ),
};
