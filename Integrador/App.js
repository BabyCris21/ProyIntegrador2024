import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import RecoverPassword from "./Screens/Auth/RecoverPassword";
import Menu from "./components/Menu"; // Asegúrate de importar el Menu
import Home from "./Screens/Home"; // Asegúrate de importar Home

const Stack = createStackNavigator();

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
          name="Menu" // Asegúrate de que esto esté aquí
          component={Menu}
          options={{ title: "Menú" }} // Título para el menú
        />
        <Stack.Screen
          name="Home" // Pantalla de inicio
          component={Home}
          options={{ title: "Inicio" }} // Título que aparecerá en el encabezado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
