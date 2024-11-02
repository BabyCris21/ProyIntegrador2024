import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Lista de dominios válidos
  const validDomains = [
    "outlook.com",
    "hotmail.com",
    "gmail.com",
    "utp.edu.pe",
  ];

  // Función para validar el correo electrónico
  const isEmailValid = () => {
    const emailPattern = new RegExp(
      `^[\\w-.]+@(${validDomains.join("|")})$`,
      "i"
    );
    return emailPattern.test(email);
  };

  // Verificación si se completan campos válidos
  const isButtonDisabled = email === "" || password === "" || !isEmailValid();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PLAY FIELD</Text>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.helperText}>
        Dominio permitido: outlook.com, hotmail.com, gmail.com, utp.edu.pe
      </Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showPasswordText}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        disabled={isButtonDisabled}
        onPress={() => {
          // Aquí podrías añadir la lógica de autenticación
          // Si la autenticación es exitosa, navega a Home
          navigation.navigate("Menu"); // Navega a Menu al presionar el botón
        }}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
        <Text style={styles.linkText}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>¿No tiene cuenta? Regístrese</Text>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  showPasswordText: {
    color: "#0066cc",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#0066cc",
    marginTop: 15,
    textAlign: "center",
  },
  helperText: {
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
  },
});
