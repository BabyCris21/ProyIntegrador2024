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
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const canchasData = [
  {
    id: "1",
    nombre: "Estadio Nacional",
    direccion: "C. José Díaz s/n, Lima 15046",
    horarios: ["5 PM", "7 PM", "9 PM", "10 AM"],
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/9/9f/Vista_a%C3%A9rea_del_estadio_nacional_del_Per%C3%BA_%282021%29.jpg",
    aforo: "6vs6",
    detalles: {
      horarioAtencion:
        "Lunes a Jueves 5 PM a 10 PM, Viernes a Domingo 10 AM a 11 PM",
      caracteristicas: [
        "Campo Techado",
        "Camerinos",
        "Estacionamiento",
        "Grass Natural",
        "Tienda",
      ],
    },
  },
  {
    id: "2",
    nombre: "Estadio Monumental",
    direccion: "Av. Javier Prado Este 7700, Ate 15026",
    horarios: ["5 PM", "7 PM", "9 PM", "10 AM"],
    imagen: "https://www.tvperu.gob.pe/sites/default/files/m_onumental.png",
    aforo: "11vs11",
    detalles: {
      horarioAtencion:
        "Lunes a Jueves 5 PM a 10 PM, Viernes a Domingo 10 AM a 11 PM",
      caracteristicas: ["Campo Natural", "Camerinos", "Estacionamiento", "Bar"],
    },
  },
  {
    id: "3",
    nombre: "Estadio Alejandro Villanueva",
    direccion: "La Victoria 15018",
    horarios: ["5 PM", "7 PM", "9 PM", "10 AM"],
    imagen:
      "https://cde.canaln.pe/deportes-alianza-lima-dejara-alquilar-estadio-matute-fpf-n439315-696x418-983032.jpg",
    aforo: "11vs11",
    detalles: {
      horarioAtencion:
        "Lunes a Jueves 5 PM a 10 PM, Viernes a Domingo 10 AM a 11 PM",
      caracteristicas: ["Campo Natural", "Camerinos", "Estacionamiento", "Bar"],
    },
  },
  // Agrega más canchas aquí
];

const Reserva = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });
  const [transactionSummaryVisible, setTransactionSummaryVisible] =
    useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});

  const filteredCanchas = canchasData.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReservar = () => {
    if (paymentOption === "Yape" || paymentOption === "Plin") {
      Alert.alert("Escanea el QR", "Nombre del titular: Nayeli De la Cruz", [
        { text: "OK", onPress: () => setModalVisible(false) },
      ]);
    } else if (paymentOption === "Tarjeta") {
      setTransactionSummaryVisible(true);
    }
  };

  const handleCreditCardSubmit = () => {
    const summary = {
      cardNumber: creditCardDetails.cardNumber.replace(/.(?=.{4})/g, "*"), // Blurred number
      date: new Date().toLocaleDateString(),
      time: selectedHorario,
      name: creditCardDetails.cardHolder,
    };
    setTransactionDetails(summary);
    setTransactionSummaryVisible(true);
  };

  const confirmReservation = () => {
    Alert.alert("Confirmación", "¿Está seguro de que desea reservar?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: () => {
          Alert.alert("La cancha está reservada");
          setModalVisible(false);
        },
      },
    ]);
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
          onPress={() => console.log(`Añadido a favoritos: ${item.nombre}`)}
        >
          <Text>Añadir a Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(`Ver ubicación de: ${item.nombre}`)}
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
                source={{ uri: selectedCancha.imagen }}
                style={styles.image}
              />
              <Text style={styles.modalTitle}>{selectedCancha.nombre}</Text>
              <ScrollView style={styles.scrollContainer}>
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
                    <Picker.Item
                      key={horario}
                      label={horario}
                      value={horario}
                    />
                  ))}
                </Picker>
                <Text style={styles.selectLabel}>
                  Selecciona un Método de Pago:
                </Text>
                <Picker
                  selectedValue={paymentOption}
                  style={styles.picker}
                  onValueChange={(itemValue) => setPaymentOption(itemValue)}
                >
                  <Picker.Item label="Selecciona" value="" />
                  <Picker.Item label="Yape" value="Yape" />
                  <Picker.Item label="Plin" value="Plin" />
                  <Picker.Item label="Tarjeta" value="Tarjeta" />
                </Picker>
                {paymentOption === "Tarjeta" && (
                  <View>
                    <TextInput
                      placeholder="Número de tarjeta"
                      style={styles.input}
                      value={creditCardDetails.cardNumber}
                      onChangeText={(text) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          cardNumber: text,
                        })
                      }
                      keyboardType="numeric"
                    />

                    <TextInput
                      placeholder="Nombre del titular"
                      style={styles.input}
                      value={creditCardDetails.cardHolder}
                      onChangeText={(text) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          cardHolder: text,
                        })
                      }
                    />
                    <TextInput
                      placeholder="Fecha de expiración (MM/AA)"
                      style={styles.input}
                      value={creditCardDetails.expirationDate}
                      onChangeText={(text) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          expirationDate: text,
                        })
                      }
                    />
                    <TextInput
                      placeholder="CVV"
                      style={styles.input}
                      value={creditCardDetails.cvv}
                      onChangeText={(text) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          cvv: text,
                        })
                      }
                      keyboardType="numeric"
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleReservar}
                >
                  <Text>Reservar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Cerrar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Transaction Summary Modal */}
      <Modal
        visible={transactionSummaryVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTransactionSummaryVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Resumen de la Transacción</Text>
            <Text>Número de tarjeta: {transactionDetails.cardNumber}</Text>
            <Text>Fecha: {transactionDetails.date}</Text>
            <Text>Hora: {transactionDetails.time}</Text>
            <Text>Nombre del titular: {transactionDetails.name}</Text>

            <View style={styles.rowButtonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={confirmReservation}
              >
                <Text>Confirmar Reserva</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setTransactionSummaryVisible(false)}
              >
                <Text>Cerrar</Text>
              </TouchableOpacity>
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
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  canchaContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  canchaImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  canchaName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoBox: {
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  selectLabel: {
    marginTop: 10,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FF0000",
    borderRadius: 5,
  },

  scrollContainer: {
    maxHeight: 400, // Adjust as necessary to prevent overflow
  },
});

export default Reserva;
