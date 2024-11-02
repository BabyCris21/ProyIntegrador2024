import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Foro = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a la Página de Inicio</Text>
        {/* Puedes agregar más contenido aquí */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Cambiado para colocar el menú en la parte inferior
    padding: 20,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1, // Esto permite que el contenido ocupe el espacio restante
    justifyContent: "center", // Centra el contenido
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Foro;
