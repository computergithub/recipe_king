// import CreateRecipe from '../component/CreateRecipe'
import axios from 'axios'
import Login from '../component/Login'
import MainNavigation from '../component/mainNavigation'
import Profile from '../component/profile'
import Registration from '../component/Registration'
import './App.css'     
     
const localhostLink='http://localhost:5000'
const getAllRrecipe = async () => {
  let getAllRrecipe = [] 
  await axios.get(`${localhostLink+'/recipe/recipes'}`).then(res => {
    getAllRrecipe = res.data 
  })
  return getAllRrecipe
} 

// console.log(`${localhostLink+'/recipe/recipes'}`)
const myRrecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"))
  let AllRrecipes = await getAllRrecipe()
  return AllRrecipes.filter(item => item.createBy === user._id)
}
const favRecipes = async () => {
  return JSON.parse(localStorage.getItem('fav'))
}
// console.log(path)


import { createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom'
import CreateRecipe from '../component/CreateRecipe'
import RecipesSec from '../component/RecipesSec'
import EditRecipe from '../component/Editrecipe'
import MyFav from '../component/MyFav'
const routers = createBrowserRouter([
  {
    path: '/', element: <MainNavigation />, children: [
      { path: "/", element: <Profile localhostLink={localhostLink} />, loader: getAllRrecipe },
      // { path: "/favorites", element: <RecipesSec />,loader:favRecipes },
      { path: "/createRecipe", element: <CreateRecipe localhostLink={localhostLink} /> },
      { path: "/recipes", element: <Profile localhostLink={localhostLink}/>, loader: myRrecipes, },
      { path: "/singIn", element: <Registration localhostLink={localhostLink}/> },
      { path: "/logIn", element: <Login localhostLink={localhostLink} /> },
      { path: "/myFav", element: <MyFav localhostLink={localhostLink}/>, loader: favRecipes },
      { path: "/editRecipe/:id", element: <EditRecipe localhostLink={localhostLink} /> },

    ]
  },

])



function App() {
  return (
    <>
      {/* <h1k>hello starting page</h1k> */}
      {/* <Profile /> */}
      {/* {routers} */}
      <RouterProvider router={routers}></RouterProvider>
    </>
    //   <>
    //   <BrowserRouter>
    //   <Routes>

    //     <Route path="/" element={<Registration/>}></Route>
    //   <Route path='/login'element={<Login/>}></Route>
    //   </Routes>
    //   </BrowserRouter>

    // {/* <Registration/> */}
    //   </>
  )
}
export default App
