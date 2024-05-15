import PokemonCard from "./PokemonCard.jsx";

const Pokemons = ({ pokemons }) => {

    return (
        <>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {pokemons.map(pokemon => {
                    return <PokemonCard {...pokemon} />
                })}
            </div>

        </>
    )

}

export default Pokemons