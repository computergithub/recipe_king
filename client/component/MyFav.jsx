import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import Header from "./Header";
import { FaHeart } from "react-icons/fa";
// import Header from "./Header";

export default function MyFav({ path,localhostLink ,darkmode}) {
    const getAllRrecipe = useLoaderData()
    const navigate = useNavigate()
    const [fav, setFav] = React.useState(false)
    let favItems = JSON.parse(localStorage.getItem('fav')) ?? []
    const onDelete = async (id) => {
        await axios.delete(`${localhostLink}/recipe/${id}`)
            .then((res) => {
                navigate('/recipes')
                let filterItem = favItems.filter(recipe => recipe._id !== id)
                localStorage.setItem("fav", JSON.stringify(filterItem))

            }
            )
    }
    const user=JSON.parse(localStorage.getItem('user'))
    // console.log(user.name)
    // console.log(getAllRrecipe.createByEmail)
    const favRecipe = (items) => {
        let filterItem = favItems.filter(recipe => recipe._id !== items._id)
        favItems = favItems.filter(recipe => recipe._id === items._id).length === 0 ? [...favItems, items] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setFav(prev => !prev)
    }
    
        const [dark,setDark]=React.useState(false)
    const [cutPera, setCutPera] = React.useState(true)
    return (<>
        <Header setDark={setDark} dark={dark}/>
        {!getAllRrecipe.length ? 
        
        <div className="component-section"> <h1 className="h-primary fav center "  style={{padding:"0"}}>My Favourite  </h1> <h2  style={{color:"#a3a3a3"}}>Save Yor Favurite Recipe Here</h2></div> 
        
            :
            
            < section id="servies-cont"className={`${dark? "dark":""}`}>
                <h1 className="h-primary fav center ">My Favourite  </h1>
                <div id="services">
                    { getAllRrecipe?.map((items, index) => {
                        

                            return (
                                <div className={` box ${dark? "dark":""}`}style={{background:dark?"black":''}} key={index}>
                                <img src={`${localhostLink}/images/${items.coverImage}`} alt="first pic" />
                                <h2 className="h-secondary">{items.title}</h2>
                                <h4>Ingredients</h4>
                                <p className="center">{items.ingredients}  </p>
                                <h3>Insturctions</h3>

                                {/* <p className="center" onClick   ={handle}>
                            {cutPera ? items.insturctions.slice(0, 50) : items.insturctions} {cutPera ? <strong>...see more</strong> :<strong>...see less</strong>}
                            </p> */}
                                <p className="center" onClick={() => setCutPera((fav => !fav))}>{cutPera ? items.insturctions.slice(0, 50) : items.insturctions} {cutPera ? <strong>...see more</strong> : <strong>...see less</strong>}</p>

                                <p className="center">{items.createByEmail}</p>
                                <p>{items.time}</p>

                                <small onClick={() => favRecipe(items)} >
                                    {(favItems.some(res => res._id === items._id)) ? <FaHeart style={{ color: "red", }} /> : <FaHeart />}</small>



                            </div>
                        )
                    }
                    )}
                    </div>

            </section >

        }
    </>


    )
}