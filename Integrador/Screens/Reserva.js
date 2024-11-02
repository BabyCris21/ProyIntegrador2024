import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importación de Picker

const canchasData = [
  {
    id: "1",
    nombre: "Cancha A",
    direccion: "Calle 123, Ciudad",
    horarios: ["5 PM", "7 PM", "9 PM", "10 AM"],
    imagen:
      "https://elcomercio.pe/resizer/kM-bAF_r94OzvqVKqKnDfMZSX6I=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ZQ4SX5H325AMPCWYJUPYSCZJOY.jpg",
    aforo: "6vs6",
    detalles: {
      horarioAtencion:
        "Lunes a Jueves 5 PM a 10 PM, Viernes a Domingo 10 AM a 11 PM",
      caracteristicas: [
        "Campo Techado",
        "Camerinos",
        "Estacionamiento",
        "Grass Sintético",
        "Tienda",
      ],
    },
  },
  {
    id: "2",
    nombre: "Cancha B",
    direccion: "Avenida 456, Ciudad",
    horarios: ["5 PM", "7 PM", "9 PM", "10 AM"],
    imagen:
      "https://elcomercio.pe/resizer/kM-bAF_r94OzvqVKqKnDfMZSX6I=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ZQ4SX5H325AMPCWYJUPYSCZJOY.jpg",
    aforo: "9vs9",
    detalles: {
      horarioAtencion:
        "Lunes a Jueves 5 PM a 10 PM, Viernes a Domingo 10 AM a 11 PM",
      caracteristicas: ["Campo Natural", "Camerinos", "Estacionamiento", "Bar"],
    },
  },
  // Agrega más canchas aquí
];

const ReservaCancha = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState("");

  const filteredCanchas = canchasData.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReservar = () => {
    // Aquí puedes añadir la lógica para reservar el horario
    console.log(`Reservado: ${selectedCancha.nombre} a las ${selectedHorario}`);
    // Cerrar el modal después de reservar
    setModalVisible(false);
    setSelectedHorario(""); // Opcional: Reiniciar selección de horario
  };

  const renderCancha = ({ item }) => (
    <View style={styles.canchaContainer}>
      <Image source={{ uri: item.imagen }} style={styles.canchaImage} />
      <Text style={styles.canchaName}>{item.nombre}</Text>
      <Text>{item.direccion}</Text>
      <Text>Horarios: {item.horarios.join(", ")}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* lógica para añadir a favoritos */
          }}
        >
          <Text>Añadir a Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* lógica para ver ubicación */
          }}
        >
          <Text>Ver Ubicación</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedCancha(item);
            setModalVisible(true);
          }}
        >
          <Text>+ Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cancha..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredCanchas}
        renderItem={renderCancha}
        keyExtractor={(item) => item.id}
      />

      {selectedCancha && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedCancha.imagen }} // Imagen de la cancha
                style={styles.image}
              />
              <Text style={styles.modalTitle}>{selectedCancha.nombre}</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Dirección:</Text>
                  <Text>{selectedCancha.direccion}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Aforo:</Text>
                  <Text>{selectedCancha.aforo}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Horario de Atención:</Text>
                  <Text>{selectedCancha.detalles.horarioAtencion}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Características:</Text>
                  <Text>
                    {selectedCancha.detalles.caracteristicas.join(", ")}
                  </Text>
                </View>
              </View>
              <Text style={styles.selectLabel}>Selecciona un Horario:</Text>
              <Picker
                selectedValue={selectedHorario}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedHorario(itemValue)}
              >
                {selectedCancha.horarios.map((horario) => (
                  <Picker.Item key={horario} label={horario} value={horario} />
                ))}
              </Picker>
              <TouchableOpacity
                style={styles.reserveButton} // Estilo para el botón de reservar
                onPress={handleReservar} // Llama a la función para reservar
                disabled={!selectedHorario} // Deshabilitar si no hay horario seleccionado
              >
                <Text style={{ color: "white" }}>Reservar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  canchaContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  canchaImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  canchaName: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  infoBox: {
    width: "45%",
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  selectLabel: {
    marginVertical: 10,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 10,
  },
  reserveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
});

export default ReservaCancha;
