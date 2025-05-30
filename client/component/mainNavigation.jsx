import { Outlet} from "react-router-dom"
import Footer from "./footer"
import Contact from "./Contact"

const MainNavigation=()=>{
    // const pathName=window.location.pathname
    // const path = window.location.pathname === '/logIn' ? true : false
  // console.log(path)
  const token=localStorage.getItem('token')
    return(
        <>
        <Outlet/>
       {token? <Contact/>:null}
        <Footer/>
        </>
    )
}
export default MainNavigation