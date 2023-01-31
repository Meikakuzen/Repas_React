import React from 'react'

const EditarProducto = () => {
  return (
    <div className="row justify-content-center">
    <div className="col-md-8">
        <div className="card">
            <div className="card-body shadow mt-3">
                <h2 className="text-center mb-4 fw-bold">Editar Producto</h2>
                <form>
                    <div className="form-group">
                        <label className="mb-2">Nombre Producto</label>
                        <input type="text" 
                        className="form-control"
                        placeholder="Nombre producto"
                        name="nombre"/>
                    </div>
                    <div className="form-group mt-3">
                        <label className="mb-2">Precio Producto</label>
                        <input type="text" 
                        className="form-control"
                        placeholder="Precio"
                        name=""precio/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary fw-bold text-uppercase d-block w-100 mt-3">Guardar cambios</button>
                </form>
            </div>
        </div>
    </div>

</div>

  )
}

export default EditarProducto