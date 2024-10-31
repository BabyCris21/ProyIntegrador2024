// LoginScreen.js
import React from "react";
import { View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text h3 style={{ textAlign: "center", marginBottom: 30 }}>
        Bienvenido a la Reserva de Canchas
      </Text>
      <Text h4 style={{ textAlign: "center", marginBottom: 20 }}>
        Iniciar Sesión
      </Text>

      <Input
        placeholder="Nombre de la Cancha"
        containerStyle={{ marginBottom: 10 }}
        inputContainerStyle={{
          borderRadius: 10,
          borderColor: "#ccc",
          borderWidth: 1,
        }}
        inputStyle={{ padding: 10 }}
      />
      <Input
        placeholder="Correo electrónico"
        containerStyle={{ marginBottom: 10 }}
        inputContainerStyle={{
          borderRadius: 10,
          borderColor: "#ccc",
          borderWidth: 1,
        }}
        inputStyle={{ padding: 10 }}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        containerStyle={{ marginBottom: 20 }}
        inputContainerStyle={{
          borderRadius: 10,
          borderColor: "#ccc",
          borderWidth: 1,
        }}
        inputStyle={{ padding: 10 }}
      />

      <Button
        title="Ingresar"
        buttonStyle={{ backgroundColor: "#007bff", borderRadius: 10 }}
      />

      <Text style={{ textAlign: "center", marginVertical: 15 }}>
        O ingresa con:
      </Text>
      <Button
        title="Facebook"
        buttonStyle={{
          backgroundColor: "#3b5998",
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <Button
        title="Google"
        buttonStyle={{ backgroundColor: "#db4437", borderRadius: 10 }}
      />
    </View>
  );
};

export default LoginScreen;
