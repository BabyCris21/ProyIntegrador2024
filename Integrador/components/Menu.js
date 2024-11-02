import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Menu = ({ navigation }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Reserva")}>
        <Text style={styles.menuText}>Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Foro")}>
        <Text style={styles.menuText}>Foro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Perfil")}>
        <Text style={styles.menuText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Soporte")}>
        <Text style={styles.menuText}>Soporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: "space-evenly", // Espacio uniforme entre los botones
    paddingVertical: 20,
    backgroundColor: "#f8f8f8",
  },
  menuItem: {
    flex: 1,
    justifyContent: "center", // Centra el texto verticalmente
    alignItems: "center",
    backgroundColor: "#28a745", // Color de fondo del botón
    borderRadius: 10, // Esquinas redondeadas
    marginHorizontal: 30, // Espaciado horizontal
    marginVertical: 5, // Espaciado vertical
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Radio de la sombra
    width: "80%", // Ajustar el ancho del botón
    alignSelf: "center", // Centrar el botón en el contenedor
  },
  menuText: {
    fontSize: 18,
    color: "#fff", // Color del texto
    fontWeight: "bold",
  },
});

export default Menu;
