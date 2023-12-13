import { Notifications } from "src/features/Notifications"
import { AppRouter } from "./router"
import './styles/global.scss'

function App() {

  return (
    <div className='app'>
      <Notifications timeout={2500} />
      <AppRouter />
    </div>
  )
}
export default App
