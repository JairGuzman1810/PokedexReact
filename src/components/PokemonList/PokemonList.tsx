import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {PokemonClient} from 'pokenode-ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setPokemon} from '../../features/pokemon/pokemonSlice';
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from '../../features/counter/counterSlice';
import Pokemon, {Stats} from '../../models/Pokemon';
const PokemonList = () => {
  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(state => state.pokemon);
  const counter = useAppSelector(state => state.counter);

  useEffect(() => {
    //Funcion para llamar los pokemon, en este caso se llama por el
    //id, osea el numero que le pertenece al pokemon.
    const fetchPokemon = async () => {
      const api = new PokemonClient();
      await api
        .getPokemonById(4)
        .then(pokemon => {
          //Obtenemos las estadisticas.
          const currentPokemonStats: Stats = {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
          };
          const newPokemon: Pokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon?.sprites?.front_default?.toString(),
            height: pokemon.height,
            weight: pokemon.weight,
            type: pokemon?.types[0]?.type?.name?.toString(),
            move: pokemon?.moves[0]?.move?.name?.toString(),
            stats: currentPokemonStats,
          };
          dispatch(setPokemon(newPokemon));
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchPokemon();
  }, [counter, dispatch]);

  const handleNextButton = () => {
    dispatch(increment());
  };

  const handlePrevButton = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = (value: number) => {
    dispatch(incrementByAmount(value));
  };

  const handleDecrementByAmount = (value: number) => {
    dispatch(decrementByAmount(value));
  };

  return (
    <View>
      <Text>{currentPokemon.name}</Text>
    </View>
  );
};
export default PokemonList;
const styles = StyleSheet.create({});
