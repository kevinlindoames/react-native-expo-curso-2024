import { useEffect, useState } from "react";
import { Link } from "expo-router";

import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getLatestComics } from "../lib/marvel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedComicCard } from "./ComicCard";
import { Logo } from "./Logo";

import { CircleInfoIcon } from "./Icons";
import { Screen } from "./Screen";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestComics().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <Screen>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedComicCard comic={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
