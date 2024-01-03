import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {PokemonClient} from 'pokenode-ts';
const PokemonList = () => {
  useEffect(() => {
    //Funcion para llamar los pokemon, en este caso se llama por el
    //id, osea el numero que le pertenece al pokemon.
    const fetchPokemon = async () => {
      const api = new PokemonClient();
      await api
        .getPokemonById(4)
        .then(pokemon => {
          console.log(pokemon);
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchPokemon();
  }, []);
  return (
    <View>
      <Text>Pokemon goes here!!!</Text>
    </View>
  );
};
export default PokemonList;
const styles = StyleSheet.create({});
