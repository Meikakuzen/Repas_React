# REDUX EJERCICIO

> npm install @reduxjs/toolkit react-redux

- Creo la carpeta src/store
- Configuro el store

~~~js
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {}
})
~~~

- Ahora debo proveer el store a toda la aplicación
- Para ello está react-redux (es un set de componentes)
- Importo el Provider
- Le añado el store al Provider

~~~js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
~~~

- Le falta un reducer válido, por eso da error
- createSlice permite crear una serie de reducers, definir el initialState y también definirle con el cual las acciones van a salir disparadas hacia ese lugar
- Creo la carpeta store/slices/counter
- Puedo definir el initialState dentro del Slice
- Lo que retorna son las acciones del objeto reducers. Las extraigo con desestructuración
- Exporto el reducer
- counterSlice.js:

~~~js
import {createSlice} from '@reduxjs/toolkit'

//const initialState = {
//    value: 0
//}


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 10
    }
    reducers:{
        increment: (state)=>{
            state.counter +=1 // vale también ++
        },
        decrement: (state)=>{
            state.counter-= 1
        },
        reset:(state)=>{
            state.counter = 0
        }
    }
})

export const {increment, decrement, reset} = counterSlice.actions

export default counterSlice.reducer


~~~

- Ahora debo añadir el reducer al Store

~~~js
import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../store/slices/counter/counterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})
~~~

- Si ahora voy a REDUX en el navegador tengo en el state el counter

----

## Usar valores del store y despachar acciones

- Ahora necesito  useSelector y useDispatch de react-redux
- useSelector es para tomar una pieza del state
- useDispatch para tener acceso a la función dispatch la cual sirve para despachar acciones

- useSelector tiene un callback cuyo argumento es el state. De state.counter desestructuro el value

~~~js
 const {value} = useSelector((state)=>state.counter)
~~~

- useDispatch es el que despacha las acciones previamente importadas

~~~js
import { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { decrement, increment, reset } from "./store/slices/counter/counterSlice"

function App() {
 
  const {value} = useSelector((state)=>state.counter)

  const dispatch = useDispatch()

  return (
    <>
    <h1 className="text-center text-3xl font-black text-blue-600 mt-3">COUNTER</h1>

      <main>

        <div className="flex justify-center mt-10 mb-10 gap-3">

          <button className="border border-blue-500 rounded-xl p-3 font-black text-blue-600"
          onClick={()=>dispatch(increment())}          
          >+ 1</button>

          <button className="border border-blue-500 rounded-xl p-3 font-black text-blue-600"
          onClick={()=>dispatch(decrement())}
          >- 1</button>

          <button className="border border-blue-500 rounded-xl p-3 font-black text-blue-600"
          onClick={()=>dispatch(reset())}
          >RESET</button>

        </div>

        <p className="text-center text-4xl font-sans">{value}</p>

      </main>
    
    </>
  )
}

export default App
~~~

# El snippet para crear el Slice es rxslice

----
## PokeApi

- Creo el componente PokemonApp
- Creo el Slice de Pokemon 
- Uso el snippet rxslice
- Creo el initialState con page para la paginación, el arreglo vacío de pokemons y un isLoading en false
- pokemonSlice.jsx:

~~~js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 0,
    pokemons: [],
    isLoading: false
}

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {

  }
});

export const {} = pokemonSlice.actions

export default pokemonSlice.reducer
~~~

- Agrego el reducer en el store

~~~js
import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../store/slices/counter/counterSlice'
import pokemonReducer from '../store/slices/pokemon/pokemonSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        pokemon: pokemonReducer
    }
})
~~~

- Cuando yo llame a startLoadingPokemons se va a ejecutar lo que ponga en el reducer
- Estoy mutando el estado sin importar el state anterior, porque hay una librería llamada Immer que viene incorporada en toolkit que hace eso por mi.
- Simplemente declaro lo que quiero hacer con el state
- Exporto los reducers con desestructiración del .actions
- Hago un console.log del action de setPokemons 

~~~js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 0,
    pokemons: [],
    isLoading: false
}

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    startLoadingPokemons: (state)=>{
        state.isLoading = true
    },
    setPokemons: (state, action)=>{
        console.log(action)
    }
  }
});

export const {startLoadingPokemons, setPokemons} = pokemonSlice.actions

export default pokemonSlice.reducer
~~~

----

## Thunks

- El thunk es una función que va a ejecutar una tarea asíncrona que cuando se resuelve ejecuta un acción
- Creo src/pokemon/thunks.js dónde van a ir mis peticiones http
- Copio la url de la pokemonApi con limite de 10 pokemons
- El offset, si lo pongo en 10 me trae los siguientes 10 a partir del 10, si pongo 20, los siguientes 10 a partir de 20, etc
    - Entonces tengo la paginación que sería 1*10
- El return va a llamar al dispatch de otra acción. Como segundo arg tengo getState que me sirve para obtener el state

~~~js
import { setPokemons, startLoadingPokemons } from "./pokemonSlice"


export const getPokemons=(page= 0)=>{

   const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}` 


    return async (dispatch, getState)=>{
        dispatch(startLoadingPokemons())

        //dispatch(setPokemons())
    }
}
~~~

- Para que lo llame una sola vez en el componente PokemonApp uso un useEffect
- Para disparar la acción necesito el useDispatch
- Podría disparar las acciones (startLoadingPokemons, setPokemons) pero son síncronas, yo quiero disparar mi thunk

~~~js
import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getPokemons } from './store/slices/pokemon/thunks'

const PokemonApp = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPokemons())

    }, [])



  return (
    <>
        <div className="font-black text-6xl text-red-700 mb-10">Pokemon</div>
        <hr/>
        <ul className="mt-10">
            <li>Hola</li>
            <li>Hola</li>
            <li>Hola</li>
            <li>Hola</li>
        </ul>
    
    </>

  )
}

export default PokemonApp
~~~
- Se dispara dos veces porque React está en el modo estricto, lo puedo ver en ReduxDevTools del navegador
- usaré Axios

> npm i axios

~~~js
import axios from "axios"
import { setPokemons, startLoadingPokemons } from "./pokemonSlice"


export const getPokemons=(page= 0)=>{

    const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}` //10 pokemons


    return async (dispatch, getState)=>{
        dispatch(startLoadingPokemons())

        const {data} = await axios(url)

        console.log(data.results)

        //dispatch(setPokemons())
    }
}
~~~

- en data.results tengo el array de pokemons con el name y la url
- En El Slice empiezo a meter la lógica a setPokemons
- El isLoading en false, establezco que en el payload venga la página y los pokemons

~~~js
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    startLoadingPokemons: (state)=>{
        state.isLoading = true
    },
    setPokemons: (state, action)=>{
        state.isLoading= false
        state.page = action.payload.page
        state.pokemons= action.payload.pokemons
    }
  }
});
~~~

- Uso el dispatch para despachar la acción y creo el objeto del payload

~~~js
import axios from "axios"
import { setPokemons, startLoadingPokemons } from "./pokemonSlice"


export const getPokemons=(page= 0)=>{

    const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}` //10 pokemons


    return async (dispatch, getState)=>{
        dispatch(startLoadingPokemons())

        const {data} = await axios(url)

        dispatch(setPokemons({pokemons: data.results, page: page + 1}))

        //dispatch(setPokemons())
    }
}
~~~

- También puedo crear una baseURL y usar axios.create

~~~js

import axios from 'axios'


export const pokemonApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
})

~~~

- Para usarlo:

~~~js

const {data} = await pokemonApi.get(`/pokemon?limit=10&offset=${page * 10}`)

~~~

- Axios también es útil para enviar tokens de autenticación en el headers

----

## Mostrar los pokemons paginadamente

- Uso la desestructuración del useSelector para traer lo que me interesa del state
- El dispatch para despachar el thunk de nuevo en el botón de next, le añado el page porque me lo piede (lo he sacado del state con useSelector)

~~~js
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from './store/slices/pokemon/thunks'

const PokemonApp = () => {

    const dispatch = useDispatch()

    const {pokemons, page} = useSelector((state)=> state.pokemons)

    console.log(pokemons)

    useEffect(()=>{
        dispatch(getPokemons())

    }, [])




  return (
    <>
        <div className="font-black text-6xl text-red-700 mb-10">Pokemon</div>
        <hr/>
        <ul className="mt-10">
       {pokemons.map(pokemon=>(
        <li key={pokemon.name}
            className="font-black m-3 uppercase"
        >{pokemon.name}</li>
       ))}
        </ul>

        <button className="rounded p-3 bg-red-600 text-white text-xl uppercase mt-10"
            onClick={()=>dispatch(getPokemons(page))}
        >NEXT</button>
    
    </>

  )
}

export default PokemonApp
~~~

---
## RTK QUERY