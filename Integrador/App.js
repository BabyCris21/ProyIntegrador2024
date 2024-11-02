import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import RecoverPassword from "./Screens/Auth/RecoverPassword";
import Home from "./Screens/Home";
import Foro from "./Screens/Foro";
import Perfil from "./Screens/Perfil";
import Reserva from "./Screens/Reserva";
import Soporte from "./Screens/Soporte";

// Iconos para los botones de navegación (opcional)
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar @expo/vector-icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = "home";
          } else if (route.name === "Reserva") {
            iconName = "calendar";
          } else if (route.name === "Foro") {
            iconName = "chatbubbles";
          } else if (route.name === "Perfil") {
            iconName = "person";
          } else if (route.name === "Soporte") {
            iconName = "help-circle";
          }

          // Retorna el icono correspondiente para cada pantalla
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#28a745", // Color activo
        tabBarInactiveTintColor: "gray", // Color inactivo
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Reserva" component={Reserva} />
      <Tab.Screen name="Foro" component={Foro} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Soporte" component={Soporte} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{ title: "Recuperar Contraseña" }}
        />
        <Stack.Screen
          name="Menu"
          component={MainTabs} // El tab navigator reemplaza aquí a "Menu"
          options={{ headerShown: false }} // Oculta el encabezado en el menú principal
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
