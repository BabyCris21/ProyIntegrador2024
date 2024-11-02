// src/screens/RecoverPasswordScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RecoverPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput style={styles.input} placeholder="Correo" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Instrucciones</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Volver al Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { color: "#0066cc", marginTop: 10, textAlign: "center" },
});
