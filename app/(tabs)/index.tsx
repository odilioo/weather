import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>🔘 Dublin</Text>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.time}>May 25, 16:51</Text>
      <Text style={styles.info}>Humidity: 60%</Text>
      <Text style={styles.info}>Probability of rain: 20%</Text>
      <Text style={styles.info}>Wind speed: 15 km/h</Text>
      <Text style={styles.forecastTitle}>Forecast</Text>
      <ScrollView horizontal style={styles.forecastScroll}>
        <View style={styles.forecastItem} />
        <View style={styles.forecastItem} />
        <View style={styles.forecastItem} />
        <View style={styles.forecastItem} />
        <View style={styles.forecastItem} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  time: {
    textAlign: 'center',
    marginVertical: 8,
  },
  info: {
    fontSize: 16,
    marginVertical: 2,
  },
  forecastTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  forecastScroll: {
    flexDirection: 'row',
    marginTop: 10,
  },
  forecastItem: {
    width: 60,
    height: 80,
    backgroundColor: '#bbb',
    borderRadius: 20,
    marginRight: 10,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
