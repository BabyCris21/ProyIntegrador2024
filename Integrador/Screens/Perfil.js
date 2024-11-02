import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Perfil = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Visit_of_Alberto_Fujimori%2C_President_of_Peru%2C_to_the_CEC_%28cropped%29.jpg/640px-Visit_of_Alberto_Fujimori%2C_President_of_Peru%2C_to_the_CEC_%28cropped%29.jpg",
    firstName: "Juan",
    lastName: "Pérez",
    phoneNumber: "987654321",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(editedUser.phoneNumber)) {
      Alert.alert(
        "Número de celular inválido",
        "El número debe tener 9 dígitos."
      );
      return;
    }

    setUser(editedUser);
    setModalVisible(false);
  };

  const handleLogout = () => {
    alert("Cerrando sesión...");
    navigation.navigate("Login"); // Asegúrate de que 'Login' sea el nombre de tu pantalla de inicio
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      {/* Imagen de perfil */}
      <Image source={{ uri: user.photo }} style={styles.profileImage} />

      {/* Información del usuario */}
      <Text style={styles.infoText}>Nombres: {user.firstName}</Text>
      <Text style={styles.infoText}>Apellidos: {user.lastName}</Text>
      <Text style={styles.infoText}>Número de celular: {user.phoneNumber}</Text>

      {/* Botones para editar y cerrar sesión */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar perfil */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={editedUser.firstName}
              onChangeText={(text) =>
                setEditedUser({ ...editedUser, firstName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={editedUser.lastName}
              onChangeText={(text) =>
                setEditedUser({ ...editedUser, lastName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Número de celular"
              value={editedUser.phoneNumber}
              onChangeText={(text) =>
                setEditedUser({ ...editedUser, phoneNumber: text })
              }
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Guardar" onPress={handleSave} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default Perfil;
