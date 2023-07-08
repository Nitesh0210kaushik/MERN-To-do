
import React from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

    const Navbar = () => {
        const auth = localStorage.getItem('user');
        const navigate = useNavigate();
        const logout = () => {
            localStorage.clear();
            navigate('/signup')
        }
    
  
    return (
        <div>           
                   
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/">Homepage</Link></li>
                        
                        <li> <Link onClick={logout} to="/signup">Logout  ({JSON.parse(auth).name}) </Link></li>
                    </ul>
                :
                    <ul className="nav-ul nav-right">
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }

        </div>
    )
}

export default Navbar