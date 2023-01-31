import React from 'react'

const Productos = () => {
  return (
    <>
        <h2 className="text-center my-5 fw-bold">Listado de Productos</h2>
        <table className="table table-striped">
            <thead className="bg-primary table-dark">
                <tr className="text-center">
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </>
  )
}

export default Productos