import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.vercel.app/palettes';

const Home = ({ navigation }) => {
  const [palettes, setPalettes] = useState([]);

  const handleFetchPalettes = useCallback(async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const palettes = await response.json();
      setPalettes(palettes);
    }
  }, []);

  useEffect(() => {
    handleFetchPalettes();
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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Home;
