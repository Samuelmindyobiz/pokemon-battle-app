import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,

    bgcolor: yellow[200],
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
export default function BasicModal({ pokemon, open, closeModal, setOpen }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={() => closeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {pokemon.sprites.front_default && (
                            <img className="pokeimg" src={pokemon.sprites.front_default} alt={pokemon.name} />
                        )}
                        {pokemon.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>Base Experience: {pokemon.base_experience}</p>
                        <p>
                            Abilities:{" "}
                            {pokemon.abilities
                                .map((ability) => ability.ability.name)
                                .join(", ")}
                        </p>
                        <p>
                            Types: {pokemon.types.map((type) => type.type.name).join(", ")}
                        </p>
                    </Typography>
                    <Link to='PokemonBattle'>Fight</Link>
                </Box>
            </Modal>
        </div>
    );
}





















