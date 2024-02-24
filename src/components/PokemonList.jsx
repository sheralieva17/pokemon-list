import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const results = response.data.results;

        // Fetch details for each Pokemon
        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Pokemon List</h1>
      <ul  style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', display: 'flex', alignItems: 'center', background:"#00BFFF" }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ maxWidth: '100px', marginRight: '10px' }} />
            <p style={{ margin: '0', fontSize: '16px' }}>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
