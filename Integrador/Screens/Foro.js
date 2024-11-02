import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

const Foro = () => {
  // Datos simulados de reseñas
  const [reviews, setReviews] = useState([
    {
      id: "1",
      userName: "Carlos Gómez",
      userPhoto: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2024-11-01",
      courtName: "Cancha de Futbol 5",
      content:
        "Excelente cancha, muy bien cuidada. Ideal para jugar con amigos.",
      likes: 10,
      dislikes: 2,
      comments: [],
    },
    {
      id: "2",
      userName: "Ana Martínez",
      userPhoto: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "2024-11-02",
      courtName: "Cancha La 9 de Ica",
      content: "Muy buena experiencia, las instalaciones son de primera.",
      likes: 5,
      dislikes: 0,
      comments: [],
    },
    {
      id: "3",
      userName: "María López",
      userPhoto: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "2024-11-03",
      courtName: "Cancha Ica Soccer",
      content:
        "La mejor cancha de baloncesto que he visitado, muy bien mantenida.",
      likes: 8,
      dislikes: 1,
      comments: [],
    },
    {
      id: "4",
      userName: "Javier Rodríguez",
      userPhoto: "https://randomuser.me/api/portraits/men/2.jpg",
      date: "2024-11-04",
      courtName: "Cancha de Futbol 7 El Chorri",
      content: "Gran lugar para practicar, aunque a veces está muy llena.",
      likes: 4,
      dislikes: 3,
      comments: [],
    },
    // Puedes agregar más reseñas aquí
  ]);

  const [newComments, setNewComments] = useState({});

  const handleCommentSubmit = (reviewId) => {
    const comment = newComments[reviewId];
    if (!comment || comment.trim() === "") return;

    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          comments: [...review.comments, comment],
        };
      }
      return review;
    });
    setReviews(updatedReviews);
    setNewComments((prev) => ({ ...prev, [reviewId]: "" })); // Reset the comment input for that review
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.courtName}>{item.courtName}</Text>
      <Text style={styles.reviewContent}>{item.content}</Text>
      <View style={styles.likeContainer}>
        <TouchableOpacity>
          <Text style={styles.likeButton}>👍 {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.dislikeButton}>👎 {item.dislikes}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Deja un comentario al respecto..."
        value={newComments[item.id] || ""}
        onChangeText={(text) =>
          setNewComments((prev) => ({ ...prev, [item.id]: text }))
        }
      />
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => handleCommentSubmit(item.id)}
      >
        <Text style={styles.commentButtonText}>Comentar</Text>
      </TouchableOpacity>
      {item.comments.length > 0 && (
        <View style={styles.commentsContainer}>
          {item.comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>
              {comment}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foro de Reseñas</Text>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
      />
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
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  reviewDate: {
    color: "#777",
  },
  courtName: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  reviewContent: {
    marginBottom: 10,
  },
  likeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  likeButton: {
    marginRight: 15,
  },
  dislikeButton: {},
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  commentButtonText: {
    color: "#fff",
  },
  commentsContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  commentText: {
    fontStyle: "italic",
    color: "#555",
    marginVertical: 2,
  },
});

export default Foro;
