import { Outlet } from "react-router-dom"
import FormComponent from "./components/FormComponent"
import NavbarComponent from "./components/NavbarComponent"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { restoreUserAction } from "./store/UserSlice"


function App() {

  const dispatch = useDispatch()

    useEffect(()=>{
      let user = JSON.parse(localStorage.getItem('redux_user'))
      dispatch(restoreUserAction(user))
    },[])

   
  return <div className="h-screen bg-neutral-600 px-5">
    
     <NavbarComponent />

     <Outlet />
    </div>
  
}

export default App
