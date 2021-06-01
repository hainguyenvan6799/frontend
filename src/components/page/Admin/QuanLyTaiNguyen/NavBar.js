import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/admin/resources">Danh sách tài nguyên</Link>
                    </li>

                    <li className="nav-item active">
                        <Link className="nav-link" to="/admin/add-resource">Thêm tài nguyên</Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default NavBar
