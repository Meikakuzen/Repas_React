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
        onClick={()=>navigate('/')}>
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