import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar mavbar-expand-lg navbar-dark bg-primary justify-content-between">
        <div className="container">
            <h3><Link to={'/'} className="text-light text-white text-decoration-none">CRUD - React, Redux, REST API & Axios</Link></h3>
        </div>
        <Link to="/productos/nuevo" className="btn btn-warning me-4 nuevo-post d-block d-md-inline-block">Agregar Producto</Link>
    </nav>
  )
}

export default Header