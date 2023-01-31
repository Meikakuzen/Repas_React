import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../store/slices/counter/counterSlice'
import pokemonReducer from '../store/slices/pokemon/pokemonSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonReducer
    }
})