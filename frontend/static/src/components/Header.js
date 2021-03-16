import { NavLink } from 'react-router-dom';


function Header(props) {
  const isAuth = props.isLoggedIn;
  // const isAdmin = JSON.parse(localStorage.getItem('user'))?.is_staff;

  return (

    <ul className="nav-bar">
      <li className="nav-bar-right"><NavLink to="/">Home</NavLink></li>


      {!isAuth
        ?
        <span>
          <li className="nav-bar-left">< NavLink to="/login/">Login</NavLink></li>
          <li className="nav-bar-left"><NavLink to="/register/">Register</NavLink> </li>
        </span>
        :
        <button  className="reg-btn" onClick={(e) => props.handleLogOut(e)} type="submit">LogOut</button>
      }

    </ul>
  )
}

export default Header
//{isAuth && !isAdmin && <li className="nav-bar-left" ><NavLink to="/profile/">Profile</NavLink></li>}
//{isAuth && isAdmin && <li className="nav-bar-left" ><NavLink to="/profile/admin">Admin Profile</NavLink></li>}
