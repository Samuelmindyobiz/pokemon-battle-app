import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";



const PokemonGame = () => {
  const [pokemonList, setPokemonList] = useState([]);
   const [playerPokemonHp, setPlayerPokemonHp] = useState(null);
  const [computerPokemon, setComputerPokemon] = useState(null);
  const [computerPokemonHP, setComputerPokemonHP] = useState(null);
  const [battleResult, setBattleResult] = useState("");
  const [loading, setLoading] = useState(true);
  let { state } = useLocation();
  const fetchRandomPokemon = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 150) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
      );
      setComputerPokemon(response.data);
      setComputerPokemonHP(response.data.stats[0].base_stat);
      
    } catch (error) {
      console.error("Error fetching random Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${state}`
      );
      console.log(response.data);
      setPokemonList(response.data);
      setPlayerPokemonHp(response.data.stats[0].base_stat);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }

   
  };

  useEffect(() => {
    if (state) {
      fetchPokemon();
      fetchRandomPokemon();
    }
  }, []);

  if (loading) return <p>Loading...</p>;


  const startBattle = () => {
    const computerAttack = Math.floor(Math.random() * 20) + 1;
    setComputerPokemonHP(computerPokemonHP - computerAttack);
    if (playerPokemonHp <= 0) {
      setBattleResult("You lose");
      
    }
    if (computerPokemonHP <= 0) {
      setBattleResult("You win");
      setComputerPokemonHP(0);
    }
    
  };
  const defend = () => {
    const computerDefend = Math.floor(Math.random() * 20) + 1;
    setComputerPokemonHP(computerPokemonHP + computerDefend);
    if (playerPokemonHp <= 0) {
      setBattleResult("You lose");
    }
    else if(computerPokemonHP <= 0) {
      setBattleResult("You win");
    }
    
  };

const playerAttack = () => {
    const playerAttacks = Math.floor(Math.random() * 20) + 1;
    setPlayerPokemonHp(playerPokemonHp - playerAttacks);
    if (playerPokemonHp <= 0) {
    setBattleResult("You lose");
    setPlayerPokemonHp(0);
  }
  else if (computerPokemonHP <= 0) {
    setBattleResult("You win");
    
  }
};
  const playerDefend = () => {
    const playerDefends = Math.floor(Math.random() * 20) + 1;
    setPlayerPokemonHp(playerPokemonHp + playerDefends);

  }

  
  

  // if (playerPokemonHp <= 0 && computerPokemonHP <= 0) {
  //   setBattleResult("It's a tie");
  // }

  


  return (
    <>
      <div>
        <h1>Pokemon Battle Game</h1>
        <div>
          <h2>Select Your Pokemon:</h2>
          <div className="random-card">
            <ul>
              <li>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140, width: 140, margin: 10 }}
                    image={`https://img.pokemondb.net/artwork/large/${pokemonList.name}.jpg`}
                    title="Pokemon"
                  />

                  <CardContent>
                    {playerPokemonHp}
                    <Typography gutterBottom variant="h5" component="div">
                      {pokemonList.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pokemonList.types &&
                        pokemonList.types.map((type, index) => (
                          <li key={index}>{type.type.name}</li>
                        ))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {playerPokemonHp}
                    </Typography>
                  </CardContent>
                  <CardActions className="action-btn">
                    <Button color="error" size="small" onClick={startBattle}>
                      Attack
                    </Button>
                    <Button color="success" size="small" onClick={playerDefend}>
                      Defend
                    </Button>
                  </CardActions>
                </Card>
              </li>
            </ul>
            <ul>
              <li>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140, width: 140, margin: 10 }}
                    image={`https://img.pokemondb.net/artwork/large/${computerPokemon.name}.jpg`}
                    title="Pokemon"
                  />
                  {computerPokemonHP}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {computerPokemon.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {computerPokemon.types &&
                        computerPokemon.types.map((type, index) => (
                          <li key={index}>{type.type.name}</li>
                        ))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {computerPokemonHP}
                    </Typography>
                  </CardContent>
                  <CardActions className="action-btn">
                    <Button color="error" size="small" onClick={playerAttack}>
                      Attack
                    </Button>
                    <Button color="success" size="small" onClick={defend}>
                      Defend
                    </Button>
                  </CardActions>
                </Card>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2>Battle Result:</h2>
          <p>{battleResult}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchRandomPokemon}
          >
            Play Again
          </Button>
        </div>
      </div>
    </>
  );
};

export default PokemonGame;
