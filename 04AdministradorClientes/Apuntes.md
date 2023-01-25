# Routing

> import { createBrowserRouter, RouterProvider } from 'react-router-dom'

- main.jsx
- Se podría hacer el router en una carpeta aparte e importarlo
- En él se irán definiendo las rutas

~~~js
const router = createBrowserRouter([
  {path:'/',
   element:<h1>Inicio</h1>},
   {path:'/nosotros',
   element: <h1>Nosotros</h1>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
    
  </React.StrictMode>
)
~~~

# Outlet

- src/components/layout
- El outlet va a actuar como un contenedor dinámico
- Lo que está fuera del outlet se renderiza en todos los componentes

~~~jsx
import { Outlet } from "react-router"

const Layout = () => {
  return (
    <div>
        <h1 className="text-6xl  font-bold">CRM - REACT</h1>

        <Outlet />
    </div>
  )
}

export default Layout
~~~

- El contenido lo inyecto en el children. Todo lo que vaya en el arreglo de children contendrá el Layout

~~~jsx
const router = createBrowserRouter([
  {path:'/',
   element: <Layout />,
   children:[
    { 
      path: '/nosotros',
      element: <h1>Desde Nosotros</h1>
    }
   ]}
])
~~~

- Le añado index true para definir que la página principal va a usar este layout
- también puedo definirle un elemento

~~~jsx
const router = createBrowserRouter([
  {path:'/',
   element: <Layout />,
   children:[
    {
      index: true
      element: <h1>Inicio</h1>
    },
    { 
      path: '/clientes/nuevo',
      element: <NuevoCliente />
    }
   ]}
])
~~~

-----

## Layout

- md:flex es un media-query
- w-1/4 , el div toma uno de cuatro de espacio
- h-screen toma todo el alto de la pantalla
- overflow-scroll es que todo lo que desborde en ese div tendrá scroll

~~~js
import { Outlet } from "react-router"

const Layout = () => {
  return (
    <div>
        <div className="md:flex md:min-h-screen">
          <aside className="md:w-1/4 bg-blue-600 px-5 py-10">
              <h1>CRM - Clientes</h1>

          </aside>

        <main className="md:w-3/4 py-10 md:h-screen overflow-scroll"> 
          <Outlet />

        </main>

        </div>

    </div>
  )
}

export default Layout
~~~

- Para colocar los links uso Link y to para el path
- Lo coloco en el aside

~~~js
 <Link to="/clientes/nuevo" className="text-2xl font-bold text-white font-serif block hover:text-blue-200">Nuevo Cliente</Link>
~~~

## useLocation de react-router-dom

- No toma ningún parámetro

~~~js
  const location = useLocation()

  console.log(location)
~~~

- Imprime un objeto con el pathname de la página dónde me encuentro
- Puedo usarlo para colorear el link de la página dónde me encuentro

~~~js
 <Link to="/" className={`${location.pathname === '/'? "text-blue-200" : "text-white"} text-2xl font-bold text-white font-serif hover:text-blue-200 cursor-pointer block py-4`}>Clientes</Link>

 <Link to="/clientes/nuevo" className={`${location.pathname === '/clientes/nuevo'? "text-blue-200": "text-white"} text-2xl font-bold text-white font-serif hover:text-blue-200 cursor-pointer`}>Nuevo Cliente</Link>
~~~

- NavLink detecta automaticamente la clase
- Toma un arrow function con el valor isActive

~~~js
     <NavLink
        className={({isActive})=>isActive? "text-blue-200 text-2xl font-bold font-serif hover:text-blue-200 cursor-pointer block py-4" 
          : "text-white text-2xl font-bold font-serif hover:text-blue-200 cursor-pointer block py-4"}
        to={"/clientes/nuevo"}
        >Nuevo Cliente</NavLink>
~~~

## Función loader

- Creo la función loader, es similar al useEffect
- Tiene que nombrarse loader en minúsculas y siempre tiene que retornar algo
- La exporto desde Index.jsx
- Cuando la importo en el main la renombro a clientesLoader
- La añado en el router, así Index ya conoce el loader

~~~js
const router = createBrowserRouter([
  {path:'/',
   element: <Layout />,
   children:[
    {
      index: true,
      element: <Index />,
      loader: clientesLoader
    },
    { 
      path: '/clientes/nuevo',
      element: <NuevoCliente />
    }
   ]}
])
~~~

- Uso un hook que se va a encargar de obtener lo que retorne en el loader que asocio al componente
- **useLoaderData**
- El console.log devuelve "desde loader"

~~~js
import {useLoaderData} from 'react-router-dom'


export function loader(){

  return "desde loader"
}

const Index = () => {

  const data = useLoaderData()

  console.log(data)

  return (
    <>
      <h1 className="font-black text-3xl text-blue-900 font-serif ml-4">Clientes</h1>
      <h3 className="font-bold text-xl font-serif ml-4">Administra tus clientes</h3>
    </>
  )
}

export default Index
~~~

- En el loader coloco el objeto de clientes

~~~js
export function loader(){

  const clientes = [
    {
        id: 1,
        nombre: 'Juan',
        telefono: 102013313,
        email: "juan@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 2,
        nombre: 'Karen',
        telefono: 138198313,
        email: "karen@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 3,
        nombre: 'Josue',
        telefono: 31983913,
        email: "josue@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 4,
        nombre: 'Miguel',
        telefono: 319381983,
        email: "miguel@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 5,
        nombre: 'Pedro',
        telefono: 1398198938,
        email: "pedro@juan.com",
        empresa: 'Codigo Con Juan'
    },
];

  return clientes
}
~~~

- tengo asociado el loader renombrado clientesLoader a Index.
- Ahora puedo acceder al listado de clientes desde el hook useLoaderData
- El loader se convierte en un state, no hace falta usar useState

    NOTA: el loader lo exporto, lo asocio en el árbol de rutas, recojo la info con el hook useLoaderData

- Renderizo los clientes usando un ternario, creando una tabla, e itero con un .map,
- Para crear la tabla uso table, dentro un table row, con las columnas como tablehead
- Para el cuerpo uso table body
~~~js
      {clientes.length ?(
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white font-bold text-lg">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
              <tbody>
                {clientes.map(cliente=>(
                  <tr>
                    <td className="p-6 text-center">
                      {cliente.nombre}
                    </td>

                  </tr>
                ))}
              </tbody>
        </table>
      )
      : (
        <p className="text-center font-bold text-xl mt-10">No hay clientes aún</p>
      ) }
~~~

- Creo el componente Cliente.jsx y lo renderizo en el map pasándole por props cliente y añadiéndole el key
- En Cliente uso table row, dentro un tabledata y dentro párrafos. Tengo tres tabledata porque tengo tres columnas
- Cliente.jsx

~~~js
const Cliente = ({cliente}) => {

    const {nombre, empresa, email, telefono, id} = cliente

  return (
     <tr className="border-b">
        <td className='p-6 text-center space-y-2'>
            <p className="font-bold text-xl">{nombre}</p>
            <p>{empresa}</p>
        </td>

        <td className="p-6 text-center">
            <p className="text-gray-600">Email:  <span className="text-gray-800 font-bold uppercase">{email}</span></p>
            <p>Tlf: {telefono}</p>
        </td>

        <td className="text-center">
            <button
            type="button"
            className="font-bold uppercase bg-blue-700 hover:bg-blue-800 transition-all p-3 rounded text-white">
                Editar
            </button>
            <button
            type="button"
            className="font-bold uppercase bg-red-700 hover:bg-red-800 transition-all p-3 rounded text-white ml-4">
                Eliminar
            </button>

        </td>

     </tr>
  )
}

export default Cliente
~~~

## useNavigate

- creo un botón para volver desde NuevoCliente a clientes
- usaré useNavigate

~~~js
import {useNavigate} from 'react-router-dom'

const NuevoCliente = () => {

  const navigate= useNavigate()

  return (
    <form action="">
      <div className="flex justify-end">
      <button
        type="button"
        className="bg-blue-700 text-white font-serif font-bold mr-4 rounded p-3"
        onClick={()=>navigate('/')}>
          VOLVER
        </button>
        {...}
~~~

- Puedo usar el -1 navigate(-1) para ir a la página anterior
----
## Creando un action para el formulario

- Nota que el componente Formulario lo introduzco dentro de un form para usar el input "submit"
- El componente Formulario en origen esta dentro de un Fragment, sin el form 

- en NuevoCliente

~~~js
      <div>
          <form action="">
            <Formulario />
            <input type="submit" 
             className="mt-5 rounded bg-blue-700 p-3 uppercase text-white font-bold text-center ml-20 hover:bg-blue-800" value="Registrar Cliente"/>
          </form>
      </div>
~~~
- Importo Form de react-router-dom
- Cambio la etiqueta form por el componente Form
- Le defino el método, en este caso POST
- Creo la función action, toda en minúscula y la exporto
- Siempre tiene que retornar algo

~~~js
import {useNavigate, Form} from 'react-router-dom'
import Formulario from '../components/Formulario'


export function action(){
  console.log("Submit al formulario...")

  return {ok:true}
}


const NuevoCliente = () => {

  const navigate= useNavigate()

  return (
    <>
     <div className="flex justify-between">
        <h1 className="ml-4 font-bold text-4xl font-serif text-blue-700">Nuevo Cliente</h1>
      <button
        type="button"
        className="bg-blue-700 text-white font-serif font-bold mr-8 rounded p-3 hover:bg-blue-800"
        onClick={()=>navigate(-1)}>
          VOLVER
        </button>

      </div>
      <div>
          <Form
          method='post'
          >
            <Formulario />
            <input type="submit" 
             className="mt-5 rounded bg-blue-700 p-3 uppercase text-white font-bold text-center ml-20 hover:bg-blue-800" value="Registrar Cliente"/>
          </Form>
      </div>
    
    </>
  )
}

export default NuevoCliente
~~~

- Debo indicarle en el router que tengo esta funcion
- La importo en el main, la renombro a nuevoClienteAction 
- main.js

~~~js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'

const router = createBrowserRouter([
  {path:'/',
   element: <Layout />,
   children:[
    {
      index: true,
      element: <Index />,
      loader: clientesLoader
    },
    { 
      path: '/clientes/nuevo',
      element: <NuevoCliente />,
      action: nuevoClienteAction

    }
   ]}
])
~~~

# Cuando quieres obtener datos utilizas un loader y cuando quieres procesar un formulario utilizas un action
----

## Leer la información ingresada a un formulario con formData
