import Searchbar from './components/Searchbar.jsx'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemons from './components/Pokemons.jsx'
import Pokemon from './components/Pokemon.jsx'


const API_POKEMON = import.meta.env.VITE_API_URL


function App() {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState(null)

  const apiCall = async () => {
    try {
      const response = await axios.get(API_POKEMON)
      setPokemons(response.data.results)


    }
    catch (err) {
      setError(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    apiCall()

  }, [])

  const singlePokemonApiCall = async (search) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      setPokemon(response.data)
    }
    catch (err) {
      setError(error)

    }

  }


  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>ERROR 404</p> }


  return (

    <>
      <Searchbar apiCall={singlePokemonApiCall} />
      
      <h1>Welcome Pokemons</h1>

      {/* {<Pokemons pokemons={pokemon} />} */}
      {pokemon ? <Pokemon {...pokemon} /> : <Pokemons pokemons={pokemons} />}

    </>
  )
}

export default App
