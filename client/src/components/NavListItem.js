import React from 'react'
import {Link} from "react-router-dom";
function NavListItem({ path, menuLabel }) {
    return (
        <li className="nav-item active">
              <Link to={path} 
                 className={
                    window.location.pathname === {path} ? "nav-link active" : "nav-link"
                   }>
                  {menuLabel}
              </Link>
        </li>
    )
}

export default NavListItem
