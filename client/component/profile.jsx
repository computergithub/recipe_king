import React from "react";
import RecipesSec from "./RecipesSec";
import { useNavigate } from 'react-router-dom'
import Header from "./Header";
export default function Profile(props) {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // const [hello,setHello]=React.useState(true)
    const path = window.location.pathname === '/recipes' ? true : false
// console.log(props)
    const [dark,setDark]=React.useState(false)
    return (
        <>
            <Header setDark={setDark} dark={dark} />

            {!path ? <>
                <div id="home">
                    <h1 >Welcome to the Recipes King  </h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, aspernatur!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>


                    <button className="btn" onClick={() => token ? navigate('/createRecipe') : navigate('/logIn')}>Share your Recipe</button>
                    <i className="fa-solid fa-car"></i>

                </div>
                <RecipesSec darkmode={dark}  localhostLink={props.localhostLink} />
                <svg xmlns="http://www.w3.org/2000/svg" className={`${dark? "dark":""}`} viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="0.4" d="M0,160L21.8,138.7C43.6,117,87,75,131,64C174.5,53,218,75,262,122.7C305.5,171,349,245,393,234.7C436.4,224,480,128,524,112C567.3,96,611,160,655,208C698.2,256,742,288,785,288C829.1,288,873,256,916,240C960,224,1004,224,1047,229.3C1090.9,235,1135,245,1178,229.3C1221.8,213,1265,171,1309,165.3C1352.7,160,1396,192,1418,208L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
            </>
                :
                <>
                    {/* <h1 className="h-primary center" >My Recipes</h1> */}
                    <RecipesSec path={path} darkmode={dark} localhostLink={props.localhostLink} />
                </>
            }

        </>
    )
}