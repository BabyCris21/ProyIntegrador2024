import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Soporte = () => {
  const [contactEmail, setContactEmail] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  const handleWhatsApp = () => {
    const phoneNumber = "966789669";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    Linking.openURL(url);
  };

  const handleSendEmail = () => {
    if (contactEmail) {
      setMessageVisible(true);
      setContactEmail("");

      setTimeout(() => {
        setMessageVisible(false);
      }, 2000);
    } else {
      Alert.alert("Por favor, ingresa un correo electrónico.");
    }
  };

  const faqs = [
    {
      id: "1",
      question: "¿Cómo realizo una reserva?",
      answer:
        "Ingresa al apartado de “Reserva”, donde podrás visualizar los locales dependiendo de tu ubicación ingresada.",
    },
    {
      id: "2",
      question: "¿Cómo me comunico con el dueño del local?",
      answer:
        "Puedes utilizar el apartado de contacto en la sección de soporte.",
    },
    {
      id: "3",
      question: "¿Cómo funciona el apartado de “Foro”?",
      answer:
        "El foro permite a los usuarios dejar reseñas sobre las canchas y comentar sobre las experiencias de otros usuarios.",
    },
  ];

  const renderFAQ = ({ item }) => (
    <View style={styles.faqContainer}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contáctanos</Text>

      <TouchableOpacity style={styles.contactButton} onPress={handleWhatsApp}>
        <FontAwesome name="whatsapp" size={24} color="#ffffff" />
        <Text style={styles.buttonText}> WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactButton}>
        <FontAwesome name="envelope" size={24} color="#ffffff" />
        <Text style={styles.buttonText}> Gmail</Text>
      </TouchableOpacity>

      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>contacto@tuempresa.com</Text>
      </View>

      <Text style={styles.title}>Preguntas Frecuentes</Text>
      <FlatList
        data={faqs}
        renderItem={renderFAQ}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.workText}>¿Quieres trabajar con nosotros?</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu correo y te escribiremos"
        value={contactEmail}
        onChangeText={setContactEmail}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Enviar Correo</Text>
      </TouchableOpacity>

      {messageVisible && (
        <Text style={styles.successMessage}>Correo enviado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  emailContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  emailText: {
    fontSize: 16,
  },
  faqContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  question: {
    fontWeight: "bold",
  },
  answer: {
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  workText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  sendButton: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Soporte;
