import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export function ComicCard({ comic }) {
  return (
    <View className="bg-cyan-100" key={comic.id}>
      <Image
        source={{ uri: comic.image }}
        style={styles.comicImage}
        resizeMode="cover"
      />
      <View style={styles.comicInfo}>
        <Text style={styles.comicTitle} numberOfLines={2}>
          {comic.title}
        </Text>
        <Text style={styles.comicIssue}>Issue #{comic.issueNumber}</Text>
      </View>
    </View>
  );
}

export function AnimatedComicCard({ comic, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <ComicCard comic={comic} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 42,
  },
  comicImage: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  comicInfo: {
    padding: 16,
    color: "red",
  },
  comicTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  comicIssue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  errorText: {
    color: "#e23636",
    textAlign: "center",
    fontSize: 16,
  },
});
