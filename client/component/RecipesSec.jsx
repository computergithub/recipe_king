import axios from "axios";
import { FaHeart, FaRegClock} from "react-icons/fa";
import { MdDelete} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import React from "react";
// import Header from "./Header";

export default function RecipesSec(props) {
    const getAllRrecipe = useLoaderData()
    const navigate = useNavigate()
    const [fav, setFav] = React.useState(false)
    let favItems = JSON.parse(localStorage.getItem('fav')) ?? []
    const onDelete = async (id) => {
        await axios.delete(`${props.localhostLink}/recipe/${id}`)
            .then((res) => navigate('/recipes')
            )
    }
    const favRecipe = (items) => {
        let filterItem = favItems.filter(recipe => recipe._id !== items._id)
        favItems = favItems.filter(recipe => recipe._id === items._id).length === 0 ? [...favItems, items] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setFav(prev => !prev)
    }
    //  let name;

  let userName=JSON.parse(localStorage.getItem('user'))
    const [cutPera, setCutPera] = React.useState(true)
    return (<>

        <section id="servies-cont" className={`${props.darkmode? "dark":""}`}>
            <h1 className={`h-primary ${props.path? "fav":""} center`}>{!props.path ? '☺ Our Recipes ☺' : '☺ My Recipes ☺'}</h1>
            <div id="services" >
                {getAllRrecipe?.map((items, index) => {
                    // { console.log(items.insturctions.split(` `)) }
                    return (
                        <div className={` box ${props.darkmode? "dark":""}`}style={{background:props.darkmode?"black":''}} key={index}>
                            <img src={`${props.localhostLink}/images/${items.coverImage}`} alt="first pic" />
                            <h2 className="h-secondary">{items.title}</h2>
                            <h4>Ingredients</h4>
                            <p className="">{items.ingredients}  </p>
                            <h3>Insturctions</h3>

                            {/* <p className="center" onClick   ={handle}>
                                {cutPera ? items.insturctions.slice(0, 50) : items.insturctions} {cutPera ? <strong>...see more</strong> :<strong>...see less</strong>}
                                </p> */}
                            <p className="" onClick={()=>setCutPera((fav=>!fav))}>{cutPera ? items.insturctions.slice(0, 65) : items.insturctions} {cutPera ? <strong style={{color: "#ff20e2"}} >...more</strong> :<strong style={{color:"blue"}}>...less </strong>}</p>

                            {userName?<span>{items.createByName}</span>:null}
                                <div className="time-like">

                            <h5><FaRegClock/> {items.time}</h5>
                            {!props.path ?
                                <p onClick={() => favRecipe(items)} >
                                    {(favItems.some(res => res._id === items._id)) ? <FaHeart style={{color:"red",}}/> :<FaHeart/>}</p>
                                :
                                <div className="myRecipeFun">
                                    <Link to={`/editRecipe/${items._id}`}><FaEdit /> </Link><br />
                                    <small onClick={() => onDelete(items._id)}><MdDelete/></small>
                                </div>
                            }
                            </div>

                        </div>

)
})}
            </div>

        </section>


    </>


    )
}