import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
        <Tabs.Screen 
          name="index" 
          options={{
          headerTitle: "Weather Day",
          }}
        />
        <Tabs.Screen name="search"/>
        <Tabs.Screen name="settings"/>
    </Tabs>
  );
}
