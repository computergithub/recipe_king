import axios from "axios";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './logIn.css'
import Header from "./Header";
import { FaKey, FaUser, FaUserClock } from "react-icons/fa";

export default function Login({localhostLink}) {
    const navigate = useNavigate();
console.log(localhostLink)
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [message, setMessage] = React.useState("")
    const handlsubmit = async (e) => {


        e.preventDefault()
        if (!email || !password) {
            return setMessage("please provied all data")
        }
        await axios.post(`${localhostLink+'/user/logIn'}`, { email, password })
            .then(result => {
               
                    localStorage.setItem('token', result.data.token)
                    localStorage.setItem('user', JSON.stringify(result.data.user))
                    navigate('/')
                

            })
            .catch(err=>{
                if(err.status===400){
                    return setMessage("something went wrong")
                }
            })
    }

    // console.log(ram)
    return (
        <>
            <Header />
            {

                <header>

                    {/* <!-- <div className="picture"><img src="../images/arranging-files.svg" alt=""></div> --> */}
                    <div className="log-container ">
                        <h1>Log In</h1>
                        <form onSubmit={handlsubmit}>
                            <small style={{color:'#fb6060'}} >{message}</small>
                            <div className="log-box">
                                <FaUser />  <input type="text" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your Email" />
                            </div>
                            <div className="log-box">

                                <FaKey /><input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password" />
                            </div>

                            <button className="log-btn">Log In</button>
                        </form>
                        <div className="sing-sec">
                            <h4> Don't have Account !</h4>
                            <NavLink to='/singIn'><button>Sing In</button></NavLink>
                        </div>

                    </div>
                </header>

            }
        </>
    )
}