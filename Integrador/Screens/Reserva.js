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
    direccion: "La Victoria",
    horarios: ["5 PM", "7 PM", "9 PM", "10 AM"],
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp239X4_7vPUsR78QJRhzbbmkty7u5InLIrg&s",
    aforo: "11vs11",
    detalles: {
      horarioAtencion:
        "Lunes a Jueves 5 PM a 10 PM, Viernes a Domingo 10 AM a 11 PM",
      caracteristicas: ["Campo Natural", "Camerinos", "Estacionamiento", "Bar"],
    },
  },
];

const Reserva = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    nombreTitular: "",
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
      handleCreditCardSubmit();
    }
  };

  const handleCreditCardSubmit = () => {
    const summary = {
      cardNumber: creditCardDetails.cardNumber.replace(/.(?=.{4})/g, "*"),
      date: new Date().toLocaleDateString(),
      time: selectedHorario,
      name: creditCardDetails.nombreTitular, // Cambiado a nombreTitular
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
          setTransactionSummaryVisible(false);
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
                          cardNumber: text.replace(/\D/g, "").slice(0, 16),
                        })
                      }
                      keyboardType="numeric"
                    />
                    <TextInput
                      placeholder="Fecha de expiración (MM/AAAA)"
                      style={styles.input}
                      value={creditCardDetails.expirationDate}
                      onChangeText={(text) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          expirationDate: text.replace(
                            /(\d{2})(\d{4})/,
                            "$1/$2"
                          ),
                        })
                      }
                    />
                    <TextInput
                      placeholder="Datos del titular"
                      style={styles.input}
                      value={creditCardDetails.nombreTitular}
                      onChangeText={(text) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          nombreTitular: text,
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
                          cvv: text.replace(/\D/g, "").slice(0, 3),
                        })
                      }
                      keyboardType="numeric"
                      secureTextEntry
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.reserveButton}
                  onPress={() => {
                    handleReservar();
                    confirmReservation();
                  }}
                >
                  <Text style={styles.reserveButtonText}>Reservar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      <Modal
        visible={transactionSummaryVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.transactionTitle}>
              Resumen de la Transacción
            </Text>
            <Text style={styles.transactionDetail}>
              Método de Pago: {paymentOption}
            </Text>
            <Text style={styles.transactionDetail}>
              Número de Tarjeta: {transactionDetails.cardNumber}
            </Text>
            <Text style={styles.transactionDetail}>
              Fecha: {transactionDetails.date}
            </Text>
            <Text style={styles.transactionDetail}>
              Nombre del Titular: {transactionDetails.name}
            </Text>
            <Text style={styles.transactionDetail}>
              Hora de Reserva: {selectedHorario}
            </Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmReservation}
            >
              <Text style={styles.confirmButtonText}>Confirmar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTransactionSummaryVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
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
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  canchaContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  canchaImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  canchaName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "90%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    maxHeight: 300,
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  reserveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionDetail: {
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Reserva;
