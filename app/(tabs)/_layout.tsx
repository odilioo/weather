import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
			tabBarActiveTintColor: "black",
        }}
    >
        <Tabs.Screen 
          name="index" 
          options={{
			tabBarIcon: ({focused, color}) => (
			<Ionicons 
				name={focused ? "home-sharp" : "home-outline"}
				color={color}
				size={20}
			/>
			),
          }}
        />
        <Tabs.Screen 
          name="search" 
          options={{
			tabBarIcon: ({focused, color}) => (
			<Ionicons 
				name={focused ? "search-sharp" : "search-outline"}
				color={color}
				size={20}
			/>
			),
          }}
        />
        <Tabs.Screen 
          name="settings" 
          options={{
			tabBarIcon: ({focused, color}) => (
			<Ionicons 
				name={focused ? "settings-sharp" : "settings-outline"}
				color={color}
				size={20}
			/>
			),
          }}
        />
    </Tabs>
  );
}
