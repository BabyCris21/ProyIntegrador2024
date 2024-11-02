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
} from "react-native";
import { Picker } from "@react-native-picker/picker";

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
  const [paymentOption, setPaymentOption] = useState(""); // Opción de pago
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
          onPress={() => {
            console.log(`Añadido a favoritos: ${item.nombre}`);
          }}
        >
          <Text>Añadir a Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(`Ver ubicación de: ${item.nombre}`);
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
                source={{ uri: selectedCancha.imagen }}
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
                      setCreditCardDetails({ ...creditCardDetails, cvv: text })
                    }
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreditCardSubmit}
                  >
                    <Text>Confirmar Pago con Tarjeta</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity style={styles.button} onPress={handleReservar}>
                <Text>Reservar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {transactionSummaryVisible && (
        <Modal
          visible={transactionSummaryVisible}
          animationType="slide"
          onRequestClose={() => setTransactionSummaryVisible(false)}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Resumen de la Transacción</Text>
              {paymentOption === "Tarjeta" && (
                <View>
                  <Text>
                    Número de Tarjeta: {transactionDetails.cardNumber}
                  </Text>
                  <Text>Nombre: {transactionDetails.name}</Text>
                  <Text>Fecha: {transactionDetails.date}</Text>
                  <Text>Hora: {selectedHorario}</Text>
                </View>
              )}
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
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  canchaContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  canchaImage: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  canchaName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoBox: {
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  selectLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
});

export default ReservaCancha;
