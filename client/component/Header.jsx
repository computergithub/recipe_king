import React, { useEffect } from "react";
import { MdDarkMode, MdLightMode, MdNightlife, MdNightlight } from "react-icons/md";
// import { useLoaderData } from "react-router-dom";
// import RecipesSec from "./RecipesSec";
import { Link, NavLink } from "react-router-dom";
// import logoImg from '../public/images.jpg'

const Header = (props) => {

    const token = localStorage.getItem("token")
    // console.log(token)
    const [logIn, setLogIn] = React.useState(token ? false : true)
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user.email)
    // console.log(user.name)
    useEffect(() => {
        setLogIn(token ? false : true)
    }, [token])
    const checLogin = () => {
        if (token) {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setLogIn(true)
        } else {
            setLogIn(true)
        }
    }
    // console.log(logoImg)

    const [profile, setProfile] = React.useState(true)
    return (
        <nav id="navbar">
            <div className="logo">
                <Link to='/'><img src='../public/images.jpg' alt="logo" /></Link>
                <div className='bugger'><button className="btn" onClick={() => setProfile(prev => !prev)}>{profile? "open":"closs"}</button> </div>
            </div>
                   
            <div className={profile?`open open-closs`:'' } >
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink onClick={() => logIn} to={!logIn ? "/recipes" : "/logIn"}> My Recipes </NavLink></li>
                        <li><NavLink onClick={() => logIn} to={!logIn ? "/myFav" : "/logIn"}> My Favourites</NavLink></li>
                        <li style={{color:"white"}} onClick={()=>props.setDark(prev=>!prev)}>{!props.dark?<MdDarkMode/>:<MdLightMode/>}</li>
                    </ul>

                    <div className="profile">

                        {token ? <button className="btn">{user.name}</button> :<NavLink  style={{textDecoration:"none",color:"white"}} to='/logIn'> <button className="btn">log in </button></NavLink>}
                        {!token ? "" : <button className="btn" style={{ border: "1px solid red", backgroundColor: "rgba(0,0,0,0.1)" }} onClick={checLogin}> Log Out </button>}
                    </div>
                

                </div> 
                   
        </nav>

    )
}
export default Header