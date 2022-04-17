import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.vercel.app/palettes';

const Home = ({ navigation }) => {
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPalettes = useCallback(async () => {
    setIsRefreshing(true);

    const response = await fetch(URL);
    if (response.ok) {
      const palettes = await response.json();
      setPalettes(palettes);
    }

    // NOTE: For user experience
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPalettes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={palettes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PalettePreview
          palette={item}
          onPress={() => navigation.push('ColorPalette', item)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchPalettes} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Home;
