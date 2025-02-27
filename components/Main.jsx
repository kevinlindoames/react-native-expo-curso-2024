import { useEffect, useState } from "react";
import { Link } from "expo-router";

import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getLatestComics } from "../lib/marvel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedComicCard } from "./ComicCard";
import { Logo } from "./Logo";

import { Screen } from "./Screen";

export function Main() {
  const [comics, setComics] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestComics().then((comics) => {
      setComics(comics);
    });
  }, []);

  return (
    <Screen>
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
    </Screen>
  );
}
