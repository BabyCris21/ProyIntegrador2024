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
  ToastAndroid, // Agregado para el mensaje flotante
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [favoriteFields, setFavoriteFields] = useState([
    {
      id: "1",
      name: "Cancha 1",
      image:
        "https://i0.wp.com/www.construcanchas.com/wp-content/uploads/2021/03/fondo-3.jpg?resize=1060%2C571&ssl=1",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Cancha 2",
      image:
        "https://a1.elespanol.com/cronicaglobal/2024/08/20/culemania/palco/879672197_13361006_1024x576.jpg",
      isFavorite: true,
    },
    {
      id: "3",
      name: "Cancha 3",
      image:
        "https://moyobamba.com/wp-content/uploads/elementor/thumbs/Cancha-qccrwjx6hqrjtt3dqbjkwr4cuv5dtzplfv6el15m28.jpg",
      isFavorite: true,
    },
    {
      id: "4",
      name: "Cancha 4",
      image:
        "https://cespedecuador.com/wp-content/uploads/2023/02/Obten-el-Mayor-Beneficio-de-tu-Cancha-de-Futbol-Instalando-Cesped-Sintetico-Deportivo.jpg",
      isFavorite: true,
    },
  ]);

  const [rentedFields, setRentedFields] = useState([
    {
      id: "1",
      name: "Wembley",
      location: "Pasaje San Jose",
      date: "2024-11-10",
      time: "18:00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJsz7k2ich-63-7kWZoWWsuI18MDPprr497A&s",
      locationUrl:
        "https://www.google.com.pe/maps/place/Balcones+de+Wembley/@-14.0737791,-75.7368687,19.75z/data=!4m6!3m5!1s0x9110e34c410de373:0x3545e111b43ca162!8m2!3d-14.0737745!4d-75.7366184!16s%2Fg%2F11gxhfwc92?hl=es-419&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3Dxº",
    },
    {
      id: "2",
      name: "La 9 de Ica",
      location: "Carretera Panamericana Sur Km 301",
      date: "2024-11-12",
      time: "20:00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XH24rRZPW9jb8DUt-Ry0elbcJta0C7BQ_A&s",
      locationUrl:
        "https://www.google.com.pe/maps/place/Complejo+Deportivo+:+%22La+9+de+Ica%22/@-14.0504438,-75.7495096,17z/data=!3m1!4b1!4m6!3m5!1s0x9110e3e597c18fbd:0x870d9a7400748dd1!8m2!3d-14.050449!4d-75.7469347!16s%2Fg%2F11swtgjmv4?hl=es-419&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [removedFavorite, setRemovedFavorite] = useState(null); // Para guardar el favorito eliminado

  const filteredFavorites = favoriteFields.filter((field) =>
    field.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredRented = rentedFields.filter((field) =>
    field.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleFavorite = (id) => {
    const updatedFavorites = favoriteFields.filter((field) => field.id !== id);

    // Verificamos si se eliminó un favorito
    if (updatedFavorites.length < favoriteFields.length) {
      const removedField = favoriteFields.find((field) => field.id === id);
      setRemovedFavorite(removedField); // Guardamos el favorito eliminado
      setFavoriteFields(updatedFavorites);

      // Mostrar el mensaje flotante
      ToastAndroid.show(
        `${removedField.name} se quitó de favoritos.`,
        ToastAndroid.SHORT
      );

      // Deshacer después de 3 segundos
      setTimeout(() => {
        setRemovedFavorite(null);
      }, 3000);
    } else {
      setFavoriteFields((prevFavorites) =>
        prevFavorites.map((field) =>
          field.id === id ? { ...field, isFavorite: !field.isFavorite } : field
        )
      );
    }
  };

  const undoRemoveFavorite = () => {
    if (removedFavorite) {
      setFavoriteFields((prevFavorites) => [...prevFavorites, removedFavorite]);
      setRemovedFavorite(null);
      ToastAndroid.show(
        `${removedFavorite.name} se agregó a favoritos nuevamente.`,
        ToastAndroid.SHORT
      );
    }
  };

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
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
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

      {/* Botón para deshacer */}
      {removedFavorite && (
        <TouchableOpacity
          onPress={undoRemoveFavorite}
          style={styles.undoButton}
        >
          <Text style={styles.undoText}>Deshacer</Text>
        </TouchableOpacity>
      )}

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
  undoButton: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginVertical: 10,
  },
  undoText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
