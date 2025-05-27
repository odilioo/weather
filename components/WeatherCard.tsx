import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WeatherResponse } from '../types/weather';

type Props = {
  data: WeatherResponse;
};

export default function WeatherCard({ data }: Props) {
  const weather = data.weather[0];

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{data.name}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
      />
      <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
      <Text style={styles.desc}>{weather.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 12,
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
});