import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { yellow } from "@mui/material/colors";
import BasicModal from './Modal';


const PokemonCard = ({ name, url }) => {
    const [pokemon, setPokemon] = useState()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    const pokemonApiCall = async () => {
        try {
            const response = await axios.get(url)
            setPokemon(response.data)
        }
        catch (err) {
            setError(err)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        pokemonApiCall()
    }, [])
    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error.message}</p>
    return (
      <div style={{ padding: "1%" }}>
        <Card
          sx={{
            maxWidth: 180,
            maxHeight: 330,
            minHeight: 330,
            bgcolor: yellow[200],
          }}
          onClick={() => openModal()}
        >
          <CardActionArea>
            <CardMedia
              sx={{ minHeight: 220 }}
              component="img"
              height="50"
              width="50"
              image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
              alt="pokemon"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pokemon.types &&
                  pokemon.types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                  ))}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <BasicModal
          open={open}
          setOpen={setOpen}
          closeModal={closeModal}
          pokemon={pokemon}
        />
      </div>
    );
}
export default PokemonCard







