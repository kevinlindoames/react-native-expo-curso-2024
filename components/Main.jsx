import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList, // Import ScrollView from react-native instead
} from "react-native";
import { getLatestComics } from "../lib/marvel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedComicCard, ComicCard } from "./ComicCard"; // Import ComicCard component
import { Logo } from "./Logo"; // Import Logo component

export function Main() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Fetch comics when the component mounts
    fetchComics();
  }, []);

  const fetchComics = async () => {
    try {
      setLoading(true);
      const comicsData = await getLatestComics();
      setComics(comicsData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch comics:", err);
      setError("Failed to load comics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>

      {comics.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={comics}
          keyExtractor={(comic) => comic.id}
          renderItem={({ item, index }) => (
            <AnimatedComicCard comic={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
