import { useEffect } from "react";
import { AppRouter } from "./router"
// import { useNavigate, useLocation } from "react-router-dom"
import './styles/global.scss'

function App() {
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    /* const token = JSON.parse(localStorage.getItem("token") ?? "null")
    if (!token) {
      navigate('/login', { state: location })
    }
    console.log(token); */
  }, [])

  return (
    <div className='app'>
      <AppRouter />
    </div>
  )
}
export default App
