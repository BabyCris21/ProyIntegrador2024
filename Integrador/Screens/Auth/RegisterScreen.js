import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons"; // Asegúrate de instalar react-native-vector-icons

export default function RegisterScreen({ navigation }) {
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cellphoneError, setCellphoneError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const validDomains = [
    "outlook.com",
    "hotmail.com",
    "gmail.com",
    "utp.edu.pe",
  ];

  const isEmailValid = () => {
    const emailPattern = new RegExp(
      `^[\\w-.]+@(${validDomains.join("|")})$`,
      "i"
    );
    return emailPattern.test(email);
  };

  const isDateValid = (date) => {
    if (!date) return false;
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    return age > 18 || (age === 18 && monthDiff >= 0);
  };

  const isCellphoneValid = () => cellphone.length === 9;

  const isFormValid =
    paterno.trim() !== "" &&
    materno.trim() !== "" &&
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    cellphone.trim() !== "" &&
    isEmailValid() &&
    password === confirmPassword &&
    isDateValid(dateOfBirth);
  isCellphoneValid();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
    setDateSelected(true); // Marcar que se seleccionó la fecha
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        onChangeText={setPaterno}
        value={paterno}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        onChangeText={setMaterno}
        value={materno}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        onChangeText={setName}
        value={name}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Celular"
        onChangeText={(value) => {
          setCellphone(value);
          setCellphoneError(
            value.length !== 9 ? "El celular debe tener 9 dígitos" : ""
          );
        }}
        value={cellphone}
        keyboardType="numeric"
      />
      {cellphoneError !== "" && (
        <Text style={styles.errorText}>{cellphoneError}</Text>
      )}

      <View>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {dateOfBirth
              ? dateOfBirth.toLocaleDateString()
              : "Fecha de nacimiento"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        {dateSelected && !isDateValid(dateOfBirth) && (
          <Text style={styles.errorText}>
            Debe tener al menos 18 años para registrarse.
          </Text>
        )}
      </View>

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
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#0066cc"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          secureTextEntry={!showPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#0066cc"
          />
        </TouchableOpacity>
      </View>

      {confirmPassword && confirmPassword !== password && (
        <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
      )}

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  passwordContainer: { position: "relative" },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: "50%", // Centra verticalmente en el campo
    transform: [{ translateY: -10 }], // Ajusta hacia arriba para mejor alineación
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: { backgroundColor: "#a5d6a7" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { color: "#0066cc", marginTop: 15, textAlign: "center" },
  helperText: { color: "#888", fontSize: 12, marginBottom: 10 },
  label: { fontSize: 16, color: "#333", marginTop: 15 },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  dateText: { color: "#333", textAlign: "center" },
  errorText: { color: "red", fontSize: 12, marginTop: 5 },
});
