import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Switch, Alert } from 'react-native';

export default function Settings() {
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      const savedUnit = await AsyncStorage.getItem('unitPreference');
      if (savedUnit !== null) {
        setIsMetric(savedUnit === 'metric');
      }
    };
    loadPreferences();
  }, []);

  const toggleMetric = async (value: boolean) => {
    setIsMetric(value);
    await AsyncStorage.setItem('unitPreference', value ? 'metric' : 'imperial');
    Alert.alert('Units Changed', `Now using ${value ? 'Metric (°C)' : 'Imperial (°F)'}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>
          Use Metric Units (°C)
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isMetric ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleMetric}
          value={isMetric}
        />
      </View>
      <Text style={styles.version}>Version 1 - 23 May 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
  version: {
    marginTop: 'auto',
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    paddingTop: 24,
  },
});