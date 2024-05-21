import {Routes, Route} from 'react-router-dom';
import PokemonGame from './components/PokemonBattle';
import App from './App';


const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/PokemonBattle" element={<PokemonGame />} />
                
            </Routes>
        </>
    );
}

export default AppRouter;