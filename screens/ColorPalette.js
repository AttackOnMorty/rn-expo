import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { colors } = route.params;

  return (
    <SafeAreaView>
      <FlatList
        // TODO: Using style is not working
        contentContainerStyle={styles.container}
        data={colors}
        keyExtractor={(item) => item.hexCode}
        renderItem={({ item: { colorName, hexCode } }) => (
          <ColorBox colorName={colorName} hexCode={hexCode} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ColorPalette;
