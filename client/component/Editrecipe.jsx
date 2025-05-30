import React, { useEffect } from "react";
import axios from "axios"
import { Link, NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Header from "./Header";

export default function EditRecipe({localhostLink}) {

    const navigate = useNavigate();
    const [inpRec, setInpRec] = React.useState({});
    const { id } = useParams()
    // console.log(id)
    useEffect(() => {
        const getData = async () => {
            await axios.get(`${localhostLink}/recipe/${id}`)
                .then(result => {
                    //    console.log(result)
                    //    console.log(id)
                    let res = result.data
                    setInpRec({
                        title: res.title,
                        ingredients: res.ingredients.join(","),
                        insturctions: res.insturctions,
                        time: res.time,
                    })
                })
        }
        getData()
    }, [])

    //  console.log(inpRec)


    const onHandleChange = (e) => {
        let val = (e.target.name === 'ingredients') ? e.target.value.split(',') : (e.target.name === 'file') ? e.target.files[0] : e.target.value
        setInpRec(prev => ({ ...prev, [e.target.name]: val }))

    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
       await axios.put(`${localhostLink}/recipe/${id}`, inpRec, {
            headers: {
                'Content-type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem('token')
            }
        })
        .then(() => navigate('/recipes'))
       
    }


    const onClick = async (e) => {
        e.preventDefault()
        //    await axios.get(`http://localhost:5000/recipe/${id}`).then(res=>{
        //     let data=res.data
        //     console.log("data") 
        //     console.log(data)  
        //    })
    }


    return (

        <div>
            <Header />

            <div id="createRec">
                <button onClick={onClick}>back to home page</button>
                <h1>Edit Recipes here ☻ ☻ </h1>
                <form className="" onSubmit={onHandleSubmit}>

                    <label htmlFor="">Title</label>
                    <input type="text" name="title" id="title" onChange={onHandleChange} value={inpRec.title}/><br /><br />
                    <label htmlFor="">Ingredients</label>
                    <input type="text" name="ingredients" id="ingredients" onChange={onHandleChange} value={inpRec.ingredients} /><br /><br />
                    <label htmlFor="">Insturctions</label>
                    <input type="text" name="insturctions" value={inpRec.insturctions} id="insturctions" onChange={onHandleChange} /><br /><br />
                    <label htmlFor="">Time</label>
                    <input type="text" name="time" id="time" value={inpRec.time} onChange={onHandleChange} /> <br /><br />
                    <label htmlFor="">Cover Image</label>
                    <input type="file" className="btn" name="file" id="file" onChange={onHandleChange} /> <br /><br />
                    <button className="btn" value="submit" >Edit</button>

                </form>

            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="0.4" d="M0,160L21.8,138.7C43.6,117,87,75,131,64C174.5,53,218,75,262,122.7C305.5,171,349,245,393,234.7C436.4,224,480,128,524,112C567.3,96,611,160,655,208C698.2,256,742,288,785,288C829.1,288,873,256,916,240C960,224,1004,224,1047,229.3C1090.9,235,1135,245,1178,229.3C1221.8,213,1265,171,1309,165.3C1352.7,160,1396,192,1418,208L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
        </div>


    )
}