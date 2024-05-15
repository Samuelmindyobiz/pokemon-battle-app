import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const PokemonGame = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [computerPokemon, setComputerPokemon] = useState(null);
    const [battleResult, setBattleResult] = useState('');

    const fetchPokemonList = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
            setPokemonList(response.data.results);
            
        } catch (error) {
            console.error('Error fetching Pokemon list:', error);
        }
    };
useEffect(() => {
    fetchPokemonList()},[]);


    const selectPokemon = (pokemon) => {
        setPlayerPokemon(pokemon);
        selectComputerPokemon();
    };

    const selectComputerPokemon = () => {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        setComputerPokemon(pokemonList[randomIndex]);
    };

    const startBattle = () => {
        if (playerPokemon && computerPokemon) {
            const randomResult = Math.random();
            if (randomResult < 0.33) {
                setBattleResult('Player wins');
            } else if (randomResult < 0.66) {
                setBattleResult('Computer wins');
            } else {
                setBattleResult('Tie');
            }
            setBattleResult('Player wins/loses/ties');


        } else {
            console.error('Player or computer Pokemon not selected');


        }
    };

    return (
        <div>
            <h1>Pokemon Battle Game</h1>
            <div>
                <h2>Select Your Pokemon:</h2>
                <ul>
                    {pokemonList.map((pokemon, index) => (
                        <li key={index}>
                            <button onClick={() => selectPokemon(pokemon)}>{pokemon.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {playerPokemon && computerPokemon && (
                <div>
                    <h2>Player's Pokemon: {playerPokemon.name}</h2>
                    <h2>Computer's Pokemon: {computerPokemon.name}</h2>
                    <button onClick={startBattle}>Start Battle</button>
                    {battleResult && <p>Battle Result: {battleResult}</p>}
                </div>
            )}
        </div>
    );
};

export default PokemonGame;
