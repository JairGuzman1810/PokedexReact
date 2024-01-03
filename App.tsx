/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import PokemonList from './src/components/PokemonList';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <PokemonList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
});

export default App;
