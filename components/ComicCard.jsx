import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Score } from "./Score";

const StyledPressable = styled(Pressable);

export function ComicCard({ comic }) {
  return (
    <Link href={`/${comic.slug}`} asChild>
      <StyledPressable className="active:opacity-70 border border-black active:border-white/50 mb-2 bg-gray-500/10 rounded-xl p-4">
        <View className="flex-row gap-4" key={comic.slug}>
          <Image source={{ uri: comic.image }} style={styles.comicImage} />
          <View className="flex-shrink">
            <Text style={styles.comicTitle} numberOfLines={2}>
              {comic.title}
            </Text>
            <Score score={comic.score} maxScore={100} />

            <Text className="mt-2 flex-shrink" style={styles.comicIssue}>
              Issue #{comic.issueNumber}
            </Text>
          </View>
        </View>
      </StyledPressable>
    </Link>
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
});
