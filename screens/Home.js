import React, { useState, useCallback, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.vercel.app/palettes';

const Home = ({ navigation, route }) => {
  const newPalette = route.params ? route.params.newPalette : null;
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

  useEffect(() => {
    if (newPalette) {
      setPalettes((current) => [newPalette, ...current]);
    }
  }, [newPalette]);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddNewPalette')}
      >
        <Text style={styles.buttonText}>Add a color scheme</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
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
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
  },
  list: {
    padding: 10,
  },
});

export default Home;
