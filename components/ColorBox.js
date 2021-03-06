import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ColorBox = ({ colorName, hexCode }) => {
  const boxStyle = {
    backgroundColor: hexCode,
  };

  const textStyle = {
    // NOTE: Here we essentially get the lightest 10% of the background colors and display black text for these, and white for the rest.
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };

  return (
    <View style={[styles.box, boxStyle]}>
      <Text style={[styles.text, textStyle]}>
        {colorName} {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ColorBox;
