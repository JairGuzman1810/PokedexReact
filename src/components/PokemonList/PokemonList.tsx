import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {Colors} from '../../color';

const StatLine = (props: {
  number: number | undefined;
  color: string | undefined;
}) => {
  return (
    <View
      style={[
        styles.statline,
        {width: props.number, backgroundColor: props.color},
      ]}
    />
  );
};
const PokemonList = () => {
  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(state => state.pokemon);
  const counter = useAppSelector(state => state.counter.value);

  useEffect(() => {
    //Funcion para llamar los pokemon, en este caso se llama por el
    //id, osea el numero que le pertenece al pokemon.
    const fetchPokemon = async () => {
      const api = new PokemonClient();
      await api
        .getPokemonById(counter)
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
            color:
              pokemon?.types[0]?.type?.name?.toString() === 'grass'
                ? Colors.grass
                : pokemon?.types[0]?.type?.name?.toString() === 'fire'
                ? Colors.fire
                : pokemon?.types[0]?.type?.name?.toString() === 'water'
                ? Colors.water
                : pokemon?.types[0]?.type?.name?.toString() === 'electric'
                ? Colors.electric
                : pokemon?.types[0]?.type?.name?.toString() === 'ice'
                ? Colors.ice
                : pokemon?.types[0]?.type?.name?.toString() === 'fighting'
                ? Colors.fighting
                : pokemon?.types[0]?.type?.name?.toString() === 'poison'
                ? Colors.poison
                : pokemon?.types[0]?.type?.name?.toString() === 'ground'
                ? Colors.ground
                : pokemon?.types[0]?.type?.name?.toString() === 'flying'
                ? Colors.flying
                : pokemon?.types[0]?.type?.name?.toString() === 'psychic'
                ? Colors.psychic
                : pokemon?.types[0]?.type?.name?.toString() === 'bug'
                ? Colors.bug
                : pokemon?.types[0]?.type?.name?.toString() === 'rock'
                ? Colors.rock
                : pokemon?.types[0]?.type?.name?.toString() === 'ghost'
                ? Colors.ghost
                : pokemon?.types[0]?.type?.name?.toString() === 'dragon'
                ? Colors.dragon
                : pokemon?.types[0]?.type?.name?.toString() === 'dark'
                ? Colors.dark
                : pokemon?.types[0]?.type?.name?.toString() === 'steel'
                ? Colors.steel
                : pokemon?.types[0]?.type?.name?.toString() === 'fairy'
                ? Colors.fairy
                : pokemon?.types[0]?.type?.name?.toString() === 'normal'
                ? Colors.normal
                : Colors.black,
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
    <View style={[styles.container, {backgroundColor: currentPokemon.color}]}>
      <StatusBar barStyle={'light-content'} />
      <Image
        style={styles.pokeball}
        source={require('../../images/Pokeball.png')}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pokemonname}>{currentPokemon.name}</Text>
          <Text style={styles.pokemonid}>#{currentPokemon.id}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.leftcontainerpokemon}>
            <TouchableOpacity style={styles.button} onPress={handlePrevButton}>
              <Text>⬅️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDecrementByAmount(100)}>
              <Text>⏪</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centercontainerpokemon}>
            <Image
              style={styles.pokemonimage}
              source={{uri: currentPokemon.image}}
            />
          </View>
          <View style={styles.rightcontainerpokemon}>
            <TouchableOpacity style={styles.button} onPress={handleNextButton}>
              <Text>➡️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIncrementByAmount(100)}>
              <Text>⏩</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.whitesheet}>
          <View
            style={[
              styles.pokemontypecontainer,
              {backgroundColor: currentPokemon.color},
            ]}>
            <Text style={styles.pokemontype}>{currentPokemon.type}</Text>
          </View>
          <Text style={[styles.titleinfo, {color: currentPokemon.color}]}>
            About
          </Text>
          <View style={styles.containerabout}>
            <View style={styles.contentabout}>
              <Text style={styles.blacktext}>
                ⚖️
                {currentPokemon.weight
                  ?.toString()
                  .slice(0, currentPokemon.weight.toString().length - 1)}
                .
                {currentPokemon.weight
                  ?.toString()
                  .slice(
                    currentPokemon.weight.toString().length - 1,
                    currentPokemon.weight.toString().length,
                  )}
                kg
              </Text>
              <Text style={styles.graytext}>Weight</Text>
            </View>
            <View style={styles.contentabout}>
              <Text style={styles.blacktext}>
                📏
                {currentPokemon.height
                  ?.toString()
                  .slice(0, currentPokemon.height.toString().length - 1)}
                .
                {currentPokemon.height
                  ?.toString()
                  .slice(
                    currentPokemon.height.toString().length - 1,
                    currentPokemon.height.toString().length,
                  )}
                m
              </Text>
              <Text style={styles.graytext}>Height</Text>
            </View>
            <View style={styles.contentabout}>
              <Text style={styles.blacktext}>{currentPokemon.move}</Text>
              <Text style={styles.graytext}>Move</Text>
            </View>
          </View>
          <Text style={[styles.titleinfo, {color: currentPokemon.color}]}>
            Base Stats
          </Text>
          <View style={styles.statscontainer}>
            <View style={styles.statstitlescontainer}>
              <Text style={styles.blacktext}>HP</Text>
              <Text style={styles.blacktext}>Attack</Text>
              <Text style={styles.blacktext}>Defense</Text>
              <Text style={styles.blacktext}>Special Attack</Text>
              <Text style={styles.blacktext}>Special Defense</Text>
              <Text style={styles.blacktext}>Speed</Text>
            </View>
            <View
              style={[
                styles.viewseparator,
                {backgroundColor: Colors.lightGray},
              ]}
            />

            <View style={[styles.statstitlescontainer, {marginLeft: 10}]}>
              <Text style={styles.blacktext}>{currentPokemon.stats?.hp}</Text>
              <Text style={styles.blacktext}>
                {currentPokemon.stats?.attack}
              </Text>
              <Text style={styles.blacktext}>
                {currentPokemon.stats?.defense}
              </Text>
              <Text style={styles.blacktext}>
                {currentPokemon.stats?.specialAttack}
              </Text>
              <Text style={styles.blacktext}>
                {currentPokemon.stats?.specialDefense}
              </Text>
              <Text style={styles.blacktext}>
                {currentPokemon.stats?.speed}
              </Text>
            </View>

            <View>
              <StatLine
                number={currentPokemon.stats?.hp}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.attack}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.defense}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.specialAttack}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.specialDefense}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.speed}
                color={currentPokemon.color}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default PokemonList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokeball: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  pokemonname: {
    fontSize: 35,
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    textTransform: 'capitalize',
  },
  pokemonid: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'right',
    marginRight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pokemonimage: {
    width: 200,
    height: 200,
  },
  content: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftcontainerpokemon: {
    flex: 1,
    justifyContent: 'center',
  },
  centercontainerpokemon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightcontainerpokemon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white + '70',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  pokemontype: {
    color: Colors.white,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  pokemontypecontainer: {
    height: 30,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  whitesheet: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    marginBottom: 10,
    flex: 1,
  },
  titleinfo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  containerabout: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  contentabout: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  blacktext: {
    color: '#000',
  },
  graytext: {
    color: '#666666',
    fontSize: 12,
    marginTop: 10,
  },
  statstitlescontainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  viewseparator: {
    height: 120,
    width: 2,
    marginRight: 2,
  },
  statscontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 30,
    marginTop: 20,
  },
  statline: {
    marginVertical: 7,
    height: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
});
