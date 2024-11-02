import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [favoriteFields, setFavoriteFields] = useState([
    {
      id: "1",
      name: "Cancha 1",
      image: "https://via.placeholder.com/150",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Cancha 2",
      image: "https://via.placeholder.com/150",
      isFavorite: true,
    },
  ]);

  const [rentedFields, setRentedFields] = useState([
    {
      id: "1",
      name: "Cancha A",
      location: "Parque Central",
      date: "2024-11-10",
      time: "18:00",
      image: "https://via.placeholder.com/150",
      locationUrl: "https://www.google.com/maps/place/Parque+Central",
    },
    {
      id: "2",
      name: "Cancha B",
      location: "Estadio Municipal",
      date: "2024-11-12",
      time: "20:00",
      image: "https://via.placeholder.com/150",
      locationUrl: "https://www.google.com/maps/place/Estadio+Municipal",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const filteredFavorites = favoriteFields.filter((field) =>
    field.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredRented = rentedFields.filter((field) =>
    field.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar canchas..."
          onChangeText={setSearchText}
          value={searchText}
        />
        <Icon name="search" size={20} color="#888" />
      </View>

      {/* Sección de Canchas Favoritas */}
      <Text style={styles.sectionTitle}>Canchas Favoritas</Text>
      <FlatList
        data={filteredFavorites}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.favoriteFieldContainer}>
            <Image source={{ uri: item.image }} style={styles.fieldImage} />
            <Text style={styles.fieldName}>{item.name}</Text>
            <TouchableOpacity>
              <Icon
                name={item.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={item.isFavorite ? "red" : "#888"}
              />
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Sección de Canchas Alquiladas */}
      <Text style={styles.sectionTitle}>Canchas Alquiladas</Text>
      {filteredRented.map((field) => (
        <View key={field.id} style={styles.rentedFieldContainer}>
          <Image source={{ uri: field.image }} style={styles.fieldImage} />
          <View style={styles.fieldInfo}>
            <Text style={styles.fieldName}>{field.name}</Text>
            <Text style={styles.fieldDetails}>Lugar: {field.location}</Text>
            <Text style={styles.fieldDetails}>Fecha: {field.date}</Text>
            <Text style={styles.fieldDetails}>Hora: {field.time}</Text>
          </View>
          {/* Botón de ubicación en el lado derecho */}
          <TouchableOpacity
            style={styles.gpsButton}
            onPress={() => Linking.openURL(field.locationUrl)}
          >
            <Icon name="location-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  favoriteFieldContainer: {
    width: 150,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  rentedFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  fieldImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  fieldInfo: {
    flex: 1,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fieldDetails: {
    color: "#666",
    fontSize: 14,
  },
  gpsButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
