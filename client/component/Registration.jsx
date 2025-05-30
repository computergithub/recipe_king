import React from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './logIn.css'
import Header from "./Header"
import { MdEmail, MdMarkEmailRead, MdMarkunreadMailbox, MdPassword } from "react-icons/md"
import { FaKey, FaPassport, FaUser } from "react-icons/fa"
const Registration = ({localhostLink}) => {
    const [name, setName] = React.useState()
    const [email, setemail] = React.useState()
    const [password, setpassword] = React.useState()
    const navigate = useNavigate();
    const rool = "Hello it is regitration page ☺"
    // const handlSubmit = (e) => {
    //     e.preventDefault()
    //     axios.post('http://localhost:5000/user/singUp', ram)
    //     .then(result => {
    //         console.log(result)
    //         // navigate('/login') 
    //     })
    //     .catch(err => console.log(err)) 
    //      console.log(rool)
    // } 
        const [message,setMessage]=React.useState("")
    const handlSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setMessage("Provide the all data ")
        }

        await axios.post(`${localhostLink+'/user/singUp'}`, { name, email, password })
            .then(result => {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('user', JSON.stringify(result.data.user))
                
                navigate('/')


            } )
            .catch(err => {if(err.response.data.massage=="exist"){
                setMessage("User already exist")
            }
            })
    }
    const click = (e) => {
        // e.preventDefault();
        navigate('/login')
    }
    return (
        <>
        <Header/>

            <header>

                {/* <!-- <div className="picture"><img src="../images/arranging-files.svg" alt=""></div> --> */}
                <div className="log-container ">
                    <h1>Sing Up</h1>
                    <small>{message}</small>
                    <form onSubmit={handlSubmit}>
                        <div className="log-box">

                    <FaUser/>
                            <input type="text" name="name" id="name" onChange={(e) => { setName(e.target.value) }} placeholder="Enter your Name" />
                        </div>
                        <div className="log-box">
                            
                    <MdEmail/>
                              <input type="text" name="email" id="email" onChange={(e) => { setemail(e.target.value) }}  placeholder="Enter your Email" />
                        </div>
                        <div className="log-box">
                        <FaKey/>
                            <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e) => { setpassword(e.target.value) }} />
                        </div>

                        <button className="log-btn">Sing up</button>

                    </form>
                    </div>

            </header>

     
        </>
    )

}
export default Registration